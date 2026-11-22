// Site Samuel — l'app pour gérer le portfolio.
// Construite par outils/creer-app.sh (aucun Xcode nécessaire, seulement les outils en ligne de commande).

import SwiftUI
import AppKit
import ImageIO

// MARK: - Chemins

enum Chemins {
    static let home = FileManager.default.homeDirectoryForCurrentUser
    static let site = home.appendingPathComponent("Documents/samuel-drouin-site", isDirectory: true)
    static let boite = home.appendingPathComponent("Documents/samuel-drouin-nouveaux-projets", isDirectory: true)
    static let enLigne = URL(string: "https://nodedrt.github.io/samuel-drouin/")!
    static let depot = "https://github.com/nodedrt/samuel-drouin.git"
    static let github = URL(string: "https://github.com/nodedrt/samuel-drouin")!
    static var ajoutsJSON: URL { site.appendingPathComponent("assets/ajouts.json") }
    static var ajoutsJS: URL { site.appendingPathComponent("assets/ajouts.js") }
    static var photosAjouts: URL { site.appendingPathComponent("photos/ajouts", isDirectory: true) }
}

// MARK: - Données

struct Titre: Codable, Hashable { var fr: String; var en: String }

struct Img: Codable, Hashable {
    var n: String; var w: Int; var h: Int
    init(n: String, w: Int, h: Int) { self.n = n; self.w = w; self.h = h }
    init(from decoder: Decoder) throws {
        var c = try decoder.unkeyedContainer()
        n = try c.decode(String.self); w = try c.decode(Int.self); h = try c.decode(Int.self)
    }
    func encode(to encoder: Encoder) throws {
        var c = encoder.unkeyedContainer()
        try c.encode(n); try c.encode(w); try c.encode(h)
    }
}

struct ProjetAjoute: Codable, Identifiable, Hashable {
    var slug: String
    var titre: Titre
    var section: String
    var sectionNom: String?
    var vitrine: Bool?
    var images: [Img]
    var id: String { slug }
}

struct VideoAjoutee: Codable, Identifiable, Hashable {
    var section: String
    var titre: Titre
    var lien: String
    var vitrine: Bool?
    var id: String { lien }
}

struct Ajouts: Codable { var projets: [ProjetAjoute] = []; var videos: [VideoAjoutee] = [] }

struct Rubrique: Identifiable, Hashable { let id: String; let nom: String }

// MARK: - Outils

@discardableResult
func lancer(_ outil: String, _ args: [String], dans dossier: URL? = nil, entree: String? = nil) -> (code: Int32, sortie: String) {
    let p = Process()
    p.executableURL = URL(fileURLWithPath: outil)
    p.arguments = args
    if let d = dossier { p.currentDirectoryURL = d }
    var env = ProcessInfo.processInfo.environment
    env["GIT_TERMINAL_PROMPT"] = "0"
    env["GIT_OPTIONAL_LOCKS"] = "0"
    // Messages de git en anglais : l'app y cherche « rejected », « could not read username »…
    env["LANG"] = "en_US.UTF-8"
    env["LC_ALL"] = "en_US.UTF-8"
    p.environment = env
    let tuyau = Pipe()
    p.standardOutput = tuyau
    p.standardError = tuyau
    var entreeTuyau: Pipe? = nil
    if entree != nil { entreeTuyau = Pipe(); p.standardInput = entreeTuyau }
    signal(SIGPIPE, SIG_IGN) // un outil qui se ferme tôt ne doit pas tuer l'app
    do { try p.run() } catch { return (-1, error.localizedDescription) }
    if let e = entree, let t = entreeTuyau {
        try? t.fileHandleForWriting.write(contentsOf: e.data(using: .utf8) ?? Data())
        try? t.fileHandleForWriting.close()
    }
    let data = tuyau.fileHandleForReading.readDataToEndOfFile()
    p.waitUntilExit()
    return (p.terminationStatus, String(data: data, encoding: .utf8) ?? "")
}

func git(_ args: [String], entree: String? = nil) -> (code: Int32, sortie: String) {
    lancer("/usr/bin/git", args, dans: Chemins.site, entree: entree)
}

func slugifier(_ s: String) -> String {
    let base = s.folding(options: [.diacriticInsensitive, .caseInsensitive], locale: Locale(identifier: "fr_FR")).lowercased()
    var r = ""
    var tiret = false
    for ch in base {
        if ch.isLetter || ch.isNumber, ch.isASCII { r.append(ch); tiret = false }
        else if !tiret && !r.isEmpty { r.append("-"); tiret = true }
    }
    while r.hasSuffix("-") { r.removeLast() }
    return r.isEmpty ? "projet" : r
}

let extensionsImages: Set<String> = ["jpg", "jpeg", "png", "heic", "heif", "tif", "tiff", "webp"]

func imagesDans(_ urls: [URL]) -> [URL] {
    var res: [URL] = []
    let fm = FileManager.default
    for u in urls {
        var dossier: ObjCBool = false
        if fm.fileExists(atPath: u.path, isDirectory: &dossier), dossier.boolValue {
            let contenu = (try? fm.contentsOfDirectory(at: u, includingPropertiesForKeys: nil, options: [.skipsHiddenFiles])) ?? []
            res += contenu.filter { extensionsImages.contains($0.pathExtension.lowercased()) }
        } else if extensionsImages.contains(u.pathExtension.lowercased()) {
            res.append(u)
        }
    }
    return res.sorted { $0.lastPathComponent.localizedStandardCompare($1.lastPathComponent) == .orderedAscending }
}

func vignette(_ url: URL, taille: Int) -> NSImage? {
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil) else { return nil }
    let opts: [CFString: Any] = [
        kCGImageSourceCreateThumbnailFromImageAlways: true,
        kCGImageSourceCreateThumbnailWithTransform: true,
        kCGImageSourceThumbnailMaxPixelSize: taille
    ]
    guard let cg = CGImageSourceCreateThumbnailAtIndex(src, 0, opts as CFDictionary) else { return nil }
    return NSImage(cgImage: cg, size: NSSize(width: cg.width, height: cg.height))
}

/// Écrit un JPEG redimensionné (côté max), avec l'auteur et le copyright. Renvoie largeur et hauteur.
func exporterJPEG(_ source: URL, vers dest: URL, cote: Int) -> (Int, Int)? {
    guard let src = CGImageSourceCreateWithURL(source as CFURL, nil) else { return nil }
    let opts: [CFString: Any] = [
        kCGImageSourceCreateThumbnailFromImageAlways: true,
        kCGImageSourceCreateThumbnailWithTransform: true,
        kCGImageSourceThumbnailMaxPixelSize: cote,
        kCGImageSourceShouldCacheImmediately: true
    ]
    guard let cg = CGImageSourceCreateThumbnailAtIndex(src, 0, opts as CFDictionary) else { return nil }
    guard let d = CGImageDestinationCreateWithURL(dest as CFURL, "public.jpeg" as CFString, 1, nil) else { return nil }
    let tiff: [CFString: Any] = [
        kCGImagePropertyTIFFArtist: "Samuel Drouin",
        kCGImagePropertyTIFFCopyright: "© Samuel Drouin. Tous droits réservés."
    ]
    let props: [CFString: Any] = [
        kCGImageDestinationLossyCompressionQuality: 0.82,
        kCGImagePropertyTIFFDictionary: tiff
    ]
    CGImageDestinationAddImage(d, cg, props as CFDictionary)
    guard CGImageDestinationFinalize(d) else { return nil }
    return (cg.width, cg.height)
}

// MARK: - Modèle

final class Studio: ObservableObject {
    @Published var ajouts = Ajouts()
    @Published var sections: [Rubrique] = []
    @Published var sectionsVideo: [Rubrique] = []
    @Published var siteTrouve = false
    @Published var depotPret = false
    @Published var changements: [String] = []
    @Published var dernierePublication = ""
    @Published var journal = ""
    @Published var occupe = false
    @Published var message = ""
    @Published var refusPush = false

    init() { recharger() }

    func recharger() {
        let fm = FileManager.default
        siteTrouve = fm.fileExists(atPath: Chemins.site.appendingPathComponent("index.html").path)
        depotPret = fm.fileExists(atPath: Chemins.site.appendingPathComponent(".git").path)
        sections = lireSections(Chemins.site.appendingPathComponent("assets/data.js"))
        sectionsVideo = lireSections(Chemins.site.appendingPathComponent("videos.js"))
        if let data = try? Data(contentsOf: Chemins.ajoutsJSON), let a = try? JSONDecoder().decode(Ajouts.self, from: data) { ajouts = a }
        for p in ajouts.projets where !sections.contains(where: { $0.id == p.section }) {
            sections.append(Rubrique(id: p.section, nom: p.sectionNom ?? p.section))
        }
        etat()
    }

    func lireSections(_ url: URL) -> [Rubrique] {
        guard let txt = try? String(contentsOf: url, encoding: .utf8) else { return [] }
        let motif = try! NSRegularExpression(pattern: "\\{ id: \"([^\"]+)\", fr: \"([^\"]+)\"")
        let r = NSRange(txt.startIndex..., in: txt)
        return motif.matches(in: txt, range: r).compactMap { m in
            guard let a = Range(m.range(at: 1), in: txt), let b = Range(m.range(at: 2), in: txt) else { return nil }
            return Rubrique(id: String(txt[a]), nom: String(txt[b]))
        }
    }

    func etat() {
        guard depotPret else { changements = []; dernierePublication = ""; return }
        DispatchQueue.global(qos: .userInitiated).async {
            let s = git(["-c", "core.quotepath=false", "status", "--porcelain"]).sortie
            let lignes = s.split(separator: "\n").map { String($0.dropFirst(3)) }
            let d = git(["log", "-1", "--date=format:%d/%m/%Y à %H:%M", "--format=%cd"])
            DispatchQueue.main.async {
                self.changements = lignes
                self.dernierePublication = d.code == 0 ? d.sortie.trimmingCharacters(in: .whitespacesAndNewlines) : ""
            }
        }
    }

    func enregistrerAjouts() throws {
        let enc = JSONEncoder()
        enc.outputFormatting = [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes]
        try FileManager.default.createDirectory(at: Chemins.ajoutsJSON.deletingLastPathComponent(), withIntermediateDirectories: true)
        try enc.encode(ajouts).write(to: Chemins.ajoutsJSON)
        let p = String(data: try enc.encode(ajouts.projets), encoding: .utf8) ?? "[]"
        let v = String(data: try enc.encode(ajouts.videos), encoding: .utf8) ?? "[]"
        let js = "/* Généré par l'app « Site Samuel ». Ne pas modifier à la main : utilise l'app. */\nwindow.AJOUTS = \(p);\nwindow.AJOUTS_VIDEOS = \(v);\n"
        try js.write(to: Chemins.ajoutsJS, atomically: true, encoding: .utf8)
        etat()
    }

    func slugLibre(_ base: String) -> String {
        var s = base, i = 2
        let fm = FileManager.default
        let data = (try? String(contentsOf: Chemins.site.appendingPathComponent("assets/data.js"), encoding: .utf8)) ?? ""
        while data.contains("\"\(s)\": {") || ajouts.projets.contains(where: { $0.slug == s }) || fm.fileExists(atPath: Chemins.photosAjouts.appendingPathComponent(s).path) {
            s = "\(base)-\(i)"; i += 1
        }
        return s
    }

    /// Prépare les photos (1600 px et 960 px, avec copyright) et ajoute le projet au site.
    func ajouterProjet(titre: Titre, section: Rubrique, vitrine: Bool, fichiers: [URL], fin: @escaping (String?) -> Void) {
        occupe = true; message = "Préparation des photos…"
        let slug = slugLibre(slugifier(titre.fr))
        DispatchQueue.global(qos: .userInitiated).async {
            let fm = FileManager.default
            let dossier = Chemins.photosAjouts.appendingPathComponent(slug, isDirectory: true)
            let mini = dossier.appendingPathComponent("min", isDirectory: true)
            var imgs: [Img] = []
            do {
                try fm.createDirectory(at: mini, withIntermediateDirectories: true)
                for (i, f) in fichiers.enumerated() {
                    let nom = String(format: "%02d", i + 1)
                    DispatchQueue.main.async { self.message = "Photo \(i + 1) sur \(fichiers.count)…" }
                    guard let dim = exporterJPEG(f, vers: dossier.appendingPathComponent(nom + ".jpg"), cote: 1600),
                          exporterJPEG(f, vers: mini.appendingPathComponent(nom + ".jpg"), cote: 960) != nil else { continue }
                    imgs.append(Img(n: nom, w: dim.0, h: dim.1))
                }
            } catch {
                DispatchQueue.main.async { self.occupe = false; fin("Impossible de créer le dossier : \(error.localizedDescription)") }
                return
            }
            DispatchQueue.main.async {
                guard !imgs.isEmpty else { self.occupe = false; fin("Aucune photo n'a pu être lue."); return }
                let p = ProjetAjoute(slug: slug, titre: titre, section: section.id, sectionNom: section.nom, vitrine: vitrine, images: imgs)
                self.ajouts.projets.insert(p, at: 0)
                do { try self.enregistrerAjouts() } catch { self.occupe = false; fin(error.localizedDescription); return }
                if !self.sections.contains(section) { self.sections.append(section) }
                self.occupe = false; self.message = ""
                fin(nil)
            }
        }
    }

    func supprimerProjet(_ p: ProjetAjoute) {
        let d = Chemins.photosAjouts.appendingPathComponent(p.slug)
        try? FileManager.default.trashItem(at: d, resultingItemURL: nil)
        ajouts.projets.removeAll { $0.slug == p.slug }
        try? enregistrerAjouts()
    }

    func basculerVitrine(_ p: ProjetAjoute) {
        guard let i = ajouts.projets.firstIndex(of: p) else { return }
        ajouts.projets[i].vitrine = !(p.vitrine ?? false)
        try? enregistrerAjouts()
    }

    func deplacer(_ p: ProjetAjoute, _ d: Int) {
        guard let i = ajouts.projets.firstIndex(of: p) else { return }
        let j = i + d
        guard j >= 0, j < ajouts.projets.count else { return }
        ajouts.projets.swapAt(i, j)
        try? enregistrerAjouts()
    }

    /// Copie les photos dans la boîte « nouveaux projets », pour que Claude les trie et les intègre.
    func envoyerAClaude(titre: String, section: String, note: String, fichiers: [URL]) -> String? {
        let fm = FileManager.default
        let d = Chemins.boite.appendingPathComponent(slugifier(titre), isDirectory: true)
        do {
            try fm.createDirectory(at: d, withIntermediateDirectories: true)
            for f in fichiers {
                let cible = d.appendingPathComponent(f.lastPathComponent)
                if !fm.fileExists(atPath: cible.path) { try fm.copyItem(at: f, to: cible) }
            }
            let info = "Titre : \(titre)\nSection : \(section)\nNote : \(note)\nPhotos : \(fichiers.count)\n"
            try info.write(to: d.appendingPathComponent("infos.txt"), atomically: true, encoding: .utf8)
        } catch { return error.localizedDescription }
        NSWorkspace.shared.activateFileViewerSelecting([d])
        return nil
    }

    func ajouterVideo(_ v: VideoAjoutee) {
        ajouts.videos.insert(v, at: 0)
        try? enregistrerAjouts()
    }

    func supprimerVideo(_ v: VideoAjoutee) {
        ajouts.videos.removeAll { $0.lien == v.lien }
        try? enregistrerAjouts()
    }

    // MARK: GitHub

    func preparerDepot() {
        occupe = true; journal = ""
        DispatchQueue.global(qos: .userInitiated).async {
            var log = ""
            if !FileManager.default.fileExists(atPath: Chemins.site.appendingPathComponent(".git").path) {
                log += git(["init", "-b", "main"]).sortie
            }
            _ = git(["remote", "remove", "origin"])
            log += git(["remote", "add", "origin", Chemins.depot]).sortie
            _ = git(["config", "user.name", "Samuel Drouin"])
            _ = git(["config", "user.email", "samueldrouin10@gmail.com"])
            _ = git(["config", "http.postBuffer", "524288000"])
            _ = git(["config", "credential.helper", "osxkeychain"])
            DispatchQueue.main.async {
                self.journal = log + "\nDossier prêt pour GitHub."
                self.occupe = false
                self.recharger()
            }
        }
    }

    func enregistrerJeton(_ jeton: String, fin: @escaping (Bool) -> Void) {
        let j = jeton.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !j.isEmpty else { fin(false); return }
        DispatchQueue.global(qos: .userInitiated).async {
            _ = git(["config", "credential.helper", "osxkeychain"])
            _ = git(["credential", "reject"], entree: "protocol=https\nhost=github.com\n\n")
            let r = git(["credential", "approve"], entree: "protocol=https\nhost=github.com\nusername=nodedrt\npassword=\(j)\n\n")
            DispatchQueue.main.async { fin(r.code == 0) }
        }
    }

    func publier(message: String, forcer: Bool = false) {
        occupe = true; refusPush = false
        journal = "Publication…\n"
        let msg = message.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "Mise à jour du site" : message
        DispatchQueue.global(qos: .userInitiated).async {
            var log = ""
            log += git(["add", "-A"]).sortie
            if git(["diff", "--cached", "--quiet"]).code != 0 {
                log += git(["commit", "-q", "-m", msg]).sortie
            }
            var args = ["push", "-u", "origin", "HEAD:main"]
            if forcer { args.insert("--force", at: 1) }
            let r = git(args)
            log += r.sortie
            DispatchQueue.main.async {
                self.occupe = false
                if r.code == 0 {
                    self.journal = log + "\nC'est en ligne. Le site se met à jour dans une ou deux minutes."
                } else {
                    let s = r.sortie.lowercased()
                    self.refusPush = s.contains("rejected") || s.contains("fetch first")
                    var aide = "\nLa publication n'a pas abouti."
                    if s.contains("could not read username") || s.contains("authentication") || s.contains("403") {
                        aide += " GitHub demande ta connexion : va dans l'onglet Réglages et colle ton jeton."
                    } else if self.refusPush {
                        aide += " Le dépôt GitHub contient déjà autre chose. Utilise « Remplacer le contenu en ligne » (une seule fois)."
                    } else if s.contains("could not resolve host") {
                        aide += " Pas de connexion internet."
                    }
                    self.journal = log + aide
                }
                self.etat()
            }
        }
    }
}

// MARK: - Interface

enum Onglet: Hashable { case accueil, projet, projets, videos, publier, reglages }

@main
struct SiteSamuelApp: App {
    @StateObject private var studio = Studio()
    var body: some Scene {
        WindowGroup("Site Samuel") {
            Racine()
                .environmentObject(studio)
                .frame(minWidth: 1060, minHeight: 720)
        }
    }
}

struct Racine: View {
    @EnvironmentObject var studio: Studio
    @State private var onglet: Onglet = .accueil
    var body: some View {
        TabView(selection: $onglet) {
            Accueil(onglet: $onglet).tabItem { Label("Accueil", systemImage: "house") }.tag(Onglet.accueil)
            NouveauProjet(onglet: $onglet).tabItem { Label("Nouveau projet", systemImage: "photo.on.rectangle.angled") }.tag(Onglet.projet)
            ProjetsAjoutes().tabItem { Label("Projets ajoutés", systemImage: "square.grid.2x2") }.tag(Onglet.projets)
            Videos().tabItem { Label("Vidéos", systemImage: "play.rectangle") }.tag(Onglet.videos)
            Publier().tabItem { Label("Publier", systemImage: "paperplane") }.tag(Onglet.publier)
            Reglages().tabItem { Label("Réglages", systemImage: "gearshape") }.tag(Onglet.reglages)
        }
        .padding(.top, 6)
        .background(Color(nsColor: .windowBackgroundColor))
        .onAppear { studio.recharger() }
    }
}

struct Titre1: View {
    let texte: String
    var sous: String? = nil
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(texte).font(.system(size: 34, weight: .regular)).tracking(-0.8)
            if let s = sous { Text(s).foregroundColor(.secondary) }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

struct Carte<C: View>: View {
    let titre: String
    @ViewBuilder var contenu: () -> C
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(titre).font(.headline).foregroundColor(.secondary)
            contenu()
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: 12).fill(Color(nsColor: .controlBackgroundColor)))
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.primary.opacity(0.08)))
    }
}

// MARK: Accueil

struct Accueil: View {
    @EnvironmentObject var studio: Studio
    @Binding var onglet: Onglet
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                Titre1(texte: "Bonjour Samuel", sous: "Tout ton site, au même endroit.")
                if !studio.siteTrouve {
                    Carte(titre: "Site introuvable") {
                        Text("Le dossier « samuel-drouin-site » doit être dans Documents.")
                        Button("Ouvrir Documents") { NSWorkspace.shared.open(Chemins.home.appendingPathComponent("Documents")) }
                    }
                }
                HStack(alignment: .top, spacing: 16) {
                    Carte(titre: "En ligne") {
                        Text(Chemins.enLigne.absoluteString).font(.system(.body, design: .monospaced)).textSelection(.enabled)
                        Text(studio.dernierePublication.isEmpty ? "Pas encore publié" : "Dernière publication : \(studio.dernierePublication)").foregroundColor(.secondary)
                        Button("Voir le site en ligne") { NSWorkspace.shared.open(Chemins.enLigne) }
                    }
                    Carte(titre: "À publier") {
                        Text(studio.changements.isEmpty ? "Rien à publier" : "\(studio.changements.count) changement\(studio.changements.count > 1 ? "s" : "")")
                            .font(.system(size: 26))
                        Button(studio.changements.isEmpty ? "Ouvrir Publier" : "Publier maintenant") { onglet = .publier }
                            .keyboardShortcut(.defaultAction)
                    }
                    Carte(titre: "Ajouts") {
                        Text("\(studio.ajouts.projets.count) projet\(studio.ajouts.projets.count > 1 ? "s" : ""), \(studio.ajouts.videos.count) vidéo\(studio.ajouts.videos.count > 1 ? "s" : "")").font(.system(size: 26))
                        Button("Voir les projets ajoutés") { onglet = .projets }
                    }
                }
                Carte(titre: "Actions rapides") {
                    HStack(spacing: 10) {
                        Button { onglet = .projet } label: { Label("Nouveau projet photo", systemImage: "plus") }
                        Button { onglet = .videos } label: { Label("Ajouter une vidéo", systemImage: "play") }
                        Button { NSWorkspace.shared.open(Chemins.site.appendingPathComponent("index.html")) } label: { Label("Voir sur mon Mac", systemImage: "desktopcomputer") }
                        Button { NSWorkspace.shared.open(Chemins.site) } label: { Label("Dossier du site", systemImage: "folder") }
                        Button {
                            try? FileManager.default.createDirectory(at: Chemins.boite, withIntermediateDirectories: true)
                            NSWorkspace.shared.open(Chemins.boite)
                        } label: { Label("Dossier pour Claude", systemImage: "tray.and.arrow.down") }
                    }
                }
                if !studio.depotPret {
                    Carte(titre: "Première fois") {
                        Text("Le site n'est pas encore relié à GitHub. Va dans Réglages : deux boutons et c'est fait.")
                        Button("Aller dans Réglages") { onglet = .reglages }
                    }
                }
                Carte(titre: "Comment ça marche") {
                    VStack(alignment: .leading, spacing: 6) {
                        Text("1. Nouveau projet : glisse un dossier de photos, donne un titre, choisis la section.")
                        Text("2. Vidéos : colle un lien YouTube ou Vimeo (pour la 4K).")
                        Text("3. Publier : un clic, et le site est à jour en ligne.")
                        Text("Pour un tri soigné, choisis « Envoyer à Claude » et dis-le-lui dans l'app Claude.").foregroundColor(.secondary)
                    }
                }
            }
            .padding(28)
        }
    }
}

// MARK: Nouveau projet

struct Photo: Identifiable, Hashable { let url: URL; var id: URL { url } }

/// Collecte thread-safe des fichiers déposés.
final class Recus: @unchecked Sendable {
    private var urls: [URL] = []
    private let verrou = NSLock()
    func ajouter(_ u: URL) { verrou.lock(); urls.append(u); verrou.unlock() }
    func tout() -> [URL] { verrou.lock(); defer { verrou.unlock() }; return urls }
}

struct NouveauProjet: View {
    @EnvironmentObject var studio: Studio
    @Binding var onglet: Onglet
    @State private var photos: [Photo] = []
    @State private var exclues: Set<URL> = []
    @State private var vignettes: [URL: NSImage] = [:]
    @State private var titreFR = ""
    @State private var titreEN = ""
    @State private var sectionId = ""
    @State private var nouvelleSection = ""
    @State private var vitrine = false
    @State private var note = ""
    @State private var survol = false
    @State private var retour = ""

    var choisies: [URL] { photos.map { $0.url }.filter { !exclues.contains($0) } }
    var sectionChoisie: Rubrique? {
        if sectionId == "__nouvelle" {
            let n = nouvelleSection.trimmingCharacters(in: .whitespaces)
            return n.isEmpty ? nil : Rubrique(id: slugifier(n), nom: n)
        }
        return studio.sections.first { $0.id == sectionId }
    }
    var pret: Bool { !choisies.isEmpty && !titreFR.trimmingCharacters(in: .whitespaces).isEmpty && sectionChoisie != nil && !studio.occupe }

    var body: some View {
        HStack(alignment: .top, spacing: 0) {
            VStack(alignment: .leading, spacing: 14) {
                Titre1(texte: "Nouveau projet", sous: "Glisse un dossier ou des photos. Clique une photo pour l'enlever.")
                zone
            }
            .padding(28)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            Divider()
            formulaire
                .padding(28)
                .frame(width: 360)
        }
    }

    var zone: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 14)
                .strokeBorder(survol ? Color.accentColor : Color.primary.opacity(0.15), style: StrokeStyle(lineWidth: 1.5, dash: photos.isEmpty ? [6] : []))
                .background(RoundedRectangle(cornerRadius: 14).fill(Color(nsColor: .controlBackgroundColor)))
            if photos.isEmpty {
                VStack(spacing: 12) {
                    Image(systemName: "photo.stack").font(.system(size: 42)).foregroundColor(.secondary)
                    Text("Dépose ici le dossier du projet").font(.title3)
                    Button("Choisir un dossier…") { choisir() }
                }
            } else {
                ScrollView {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 130), spacing: 10)], spacing: 10) {
                        ForEach(photos) { p in
                            let out = exclues.contains(p.url)
                            ZStack(alignment: .topTrailing) {
                                Group {
                                    if let im = vignettes[p.url] { Image(nsImage: im).resizable().scaledToFill() }
                                    else { Rectangle().fill(Color.primary.opacity(0.06)) }
                                }
                                .frame(height: 110).clipped().cornerRadius(6)
                                .opacity(out ? 0.25 : 1)
                                Image(systemName: out ? "xmark.circle.fill" : "checkmark.circle.fill")
                                    .foregroundColor(out ? .secondary : .accentColor).padding(6)
                            }
                            .onTapGesture {
                                if out { _ = exclues.remove(p.url) } else { _ = exclues.insert(p.url) }
                            }
                        }
                    }
                    .padding(14)
                }
            }
        }
        .onDrop(of: ["public.file-url"], isTargeted: $survol) { fournisseurs in
            recevoir(fournisseurs); return true
        }
    }

    var formulaire: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 14) {
                Group {
                Text("\(choisies.count) photo\(choisies.count > 1 ? "s" : "") choisie\(choisies.count > 1 ? "s" : "")").font(.headline)
                TextField("Titre du projet (français)", text: $titreFR)
                TextField("Titre en anglais (facultatif)", text: $titreEN)
                Picker("Rubrique", selection: $sectionId) {
                    Text("Choisir…").tag("")
                    ForEach(studio.sections) { s in Text(s.nom).tag(s.id) }
                    Text("Nouvelle section…").tag("__nouvelle")
                }
                if sectionId == "__nouvelle" { TextField("Nom de la nouvelle section", text: $nouvelleSection) }
                Toggle("Mettre en avant sur l'accueil", isOn: $vitrine)
                }
                Group {
                Divider().padding(.vertical, 4)
                Button {
                    guard let s = sectionChoisie else { return }
                    let en = titreEN.trimmingCharacters(in: .whitespaces)
                    studio.ajouterProjet(titre: Titre(fr: titreFR, en: en.isEmpty ? titreFR : en), section: s, vitrine: vitrine, fichiers: choisies) { err in
                        if let e = err { retour = e } else { retour = "Projet ajouté. Vérifie-le sur ton Mac, puis publie."; vider() }
                    }
                } label: { Label("Ajouter au site", systemImage: "plus.circle.fill").frame(maxWidth: .infinity) }
                .controlSize(.large).keyboardShortcut(.defaultAction).disabled(!pret)
                Text("Les photos sont redimensionnées et signées « © Samuel Drouin » automatiquement.").font(.caption).foregroundColor(.secondary)
                Divider().padding(.vertical, 4)
                TextField("Note pour Claude (facultatif)", text: $note)
                Button {
                    let s = sectionChoisie?.nom ?? "à choisir"
                    if let e = studio.envoyerAClaude(titre: titreFR.isEmpty ? "nouveau projet" : titreFR, section: s, note: note, fichiers: choisies) { retour = e }
                    else { retour = "Copié dans « samuel-drouin-nouveaux-projets ». Dis à Claude : « nouveau projet \(titreFR) »." }
                } label: { Label("Envoyer à Claude pour un tri soigné", systemImage: "sparkles").frame(maxWidth: .infinity) }
                .disabled(choisies.isEmpty || studio.occupe)
                if studio.occupe { ProgressView(studio.message).padding(.top, 6) }
                if !retour.isEmpty { Text(retour).foregroundColor(.secondary).fixedSize(horizontal: false, vertical: true) }
                if !photos.isEmpty { Button("Vider") { vider() }.padding(.top, 8) }
                }
            }
        }
    }

    func vider() { photos = []; exclues = []; vignettes = [:]; titreFR = ""; titreEN = ""; note = ""; vitrine = false }

    func choisir() {
        let p = NSOpenPanel()
        p.canChooseDirectories = true; p.canChooseFiles = true; p.allowsMultipleSelection = true
        p.prompt = "Choisir"
        if p.runModal() == .OK { charger(p.urls) }
    }

    func recevoir(_ fournisseurs: [NSItemProvider]) {
        let recus = Recus()
        let groupe = DispatchGroup()
        for f in fournisseurs {
            groupe.enter()
            f.loadItem(forTypeIdentifier: "public.file-url", options: nil) { item, _ in
                var u: URL? = nil
                if let d = item as? Data { u = URL(dataRepresentation: d, relativeTo: nil) }
                else if let x = item as? URL { u = x }
                if let u = u { recus.ajouter(u) }
                groupe.leave()
            }
        }
        groupe.notify(queue: .global()) {
            let urls = recus.tout()
            DispatchQueue.main.async { charger(urls) }
        }
    }

    func charger(_ urls: [URL]) {
        let nouvelles = imagesDans(urls)
        guard !nouvelles.isEmpty else { retour = "Aucune photo trouvée (JPEG, PNG, HEIC ou TIFF)."; return }
        if titreFR.isEmpty, let premier = urls.first {
            var dossier: ObjCBool = false
            if FileManager.default.fileExists(atPath: premier.path, isDirectory: &dossier), dossier.boolValue { titreFR = premier.lastPathComponent }
        }
        let deja = Set(photos.map { $0.url })
        photos += nouvelles.filter { !deja.contains($0) }.map { Photo(url: $0) }
        retour = ""
        for u in nouvelles where vignettes[u] == nil {
            DispatchQueue.global(qos: .userInitiated).async {
                let im = vignette(u, taille: 320)
                DispatchQueue.main.async { if let im = im { vignettes[u] = im } }
            }
        }
    }
}

// MARK: Projets ajoutés

struct ProjetsAjoutes: View {
    @EnvironmentObject var studio: Studio
    @State private var aSupprimer: ProjetAjoute? = nil
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Titre1(texte: "Projets ajoutés", sous: "Les projets ajoutés avec l'app. Les projets d'origine se gèrent avec Claude.")
            if studio.ajouts.projets.isEmpty {
                Spacer()
                Text("Aucun projet ajouté pour l'instant.").foregroundColor(.secondary).frame(maxWidth: .infinity)
                Spacer()
            } else {
                List {
                    ForEach(studio.ajouts.projets) { p in
                        HStack(spacing: 14) {
                            Vignette(url: Chemins.photosAjouts.appendingPathComponent("\(p.slug)/min/\(p.images.first?.n ?? "01").jpg"))
                            VStack(alignment: .leading, spacing: 3) {
                                Text(p.titre.fr).font(.title3)
                                Text("\(p.sectionNom ?? p.section), \(p.images.count) photos").foregroundColor(.secondary)
                            }
                            Spacer()
                            Toggle("Accueil", isOn: Binding(get: { p.vitrine ?? false }, set: { _ in studio.basculerVitrine(p) }))
                            Button { studio.deplacer(p, -1) } label: { Image(systemName: "arrow.up") }
                            Button { studio.deplacer(p, 1) } label: { Image(systemName: "arrow.down") }
                            Button(role: .destructive) { aSupprimer = p } label: { Image(systemName: "trash") }
                        }
                        .padding(.vertical, 6)
                    }
                }
            }
        }
        .padding(28)
        .alert(item: $aSupprimer) { p in
            Alert(title: Text("Retirer « \(p.titre.fr) » ?"),
                  message: Text("Le projet quitte le site et ses photos vont à la Corbeille."),
                  primaryButton: .destructive(Text("Retirer")) { studio.supprimerProjet(p) },
                  secondaryButton: .cancel(Text("Annuler")))
        }
    }
}

struct Vignette: View {
    let url: URL
    @State private var image: NSImage? = nil
    var body: some View {
        Group {
            if let im = image { Image(nsImage: im).resizable().scaledToFill() }
            else { Rectangle().fill(Color.primary.opacity(0.06)) }
        }
        .frame(width: 96, height: 64).clipped().cornerRadius(5)
        .onAppear {
            let u = url
            DispatchQueue.global().async {
                let im = vignette(u, taille: 200)
                DispatchQueue.main.async { image = im }
            }
        }
    }
}

// MARK: Vidéos

struct Videos: View {
    @EnvironmentObject var studio: Studio
    @State private var titreFR = ""
    @State private var titreEN = ""
    @State private var lien = ""
    @State private var sectionId = ""
    @State private var vitrine = false
    var lienValide: Bool {
        let l = lien.lowercased()
        return l.contains("youtu") || l.contains("vimeo.com") || l.contains("drive.google.com")
    }
    var body: some View {
        HStack(alignment: .top, spacing: 0) {
            VStack(alignment: .leading, spacing: 16) {
                Titre1(texte: "Vidéos", sous: "Pour la 4K, mets la vidéo sur YouTube (même « non répertoriée ») ou Vimeo, puis colle le lien.")
                if studio.ajouts.videos.isEmpty {
                    Text("Aucune vidéo ajoutée avec l'app.").foregroundColor(.secondary)
                } else {
                    List {
                        ForEach(studio.ajouts.videos) { v in
                            HStack {
                                VStack(alignment: .leading, spacing: 3) {
                                    Text(v.titre.fr).font(.title3)
                                    Text(v.lien).font(.caption).foregroundColor(.secondary).lineLimit(1)
                                }
                                Spacer()
                                if v.vitrine ?? false { Text("Accueil").foregroundColor(.secondary) }
                                Button(role: .destructive) { studio.supprimerVideo(v) } label: { Image(systemName: "trash") }
                            }.padding(.vertical, 4)
                        }
                    }
                }
                Spacer()
            }
            .padding(28)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            Divider()
            VStack(alignment: .leading, spacing: 14) {
                Text("Ajouter une vidéo").font(.headline)
                TextField("Lien YouTube, Vimeo ou Drive", text: $lien)
                if !lien.isEmpty && !lienValide { Text("Ce lien n'est pas reconnu.").font(.caption).foregroundColor(.red) }
                TextField("Titre (français)", text: $titreFR)
                TextField("Titre en anglais (facultatif)", text: $titreEN)
                Picker("Rubrique", selection: $sectionId) {
                    Text("Choisir…").tag("")
                    ForEach(studio.sectionsVideo) { s in Text(s.nom).tag(s.id) }
                }
                Toggle("Mettre en avant sur l'accueil", isOn: $vitrine)
                Button {
                    let en = titreEN.trimmingCharacters(in: .whitespaces)
                    studio.ajouterVideo(VideoAjoutee(section: sectionId, titre: Titre(fr: titreFR, en: en.isEmpty ? titreFR : en), lien: lien.trimmingCharacters(in: .whitespaces), vitrine: vitrine))
                    titreFR = ""; titreEN = ""; lien = ""; vitrine = false
                } label: { Label("Ajouter", systemImage: "plus.circle.fill").frame(maxWidth: .infinity) }
                .controlSize(.large).keyboardShortcut(.defaultAction)
                .disabled(!lienValide || titreFR.isEmpty || sectionId.isEmpty)
                Text("Google Drive marche, mais la lecture démarre moins vite et la qualité est limitée.").font(.caption).foregroundColor(.secondary)
                Spacer()
            }
            .padding(28)
            .frame(width: 360)
        }
    }
}

// MARK: Publier

struct Publier: View {
    @EnvironmentObject var studio: Studio
    @State private var message = ""
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Titre1(texte: "Publier", sous: "Envoie tes changements en ligne. Le site se met à jour en une ou deux minutes.")
            if !studio.depotPret {
                Carte(titre: "À faire une fois") { Text("Relie d'abord le site à GitHub dans l'onglet Réglages.") }
            }
            HStack(alignment: .top, spacing: 16) {
                Carte(titre: "Changements") {
                    if studio.changements.isEmpty { Text("Tout est déjà en ligne.").foregroundColor(.secondary) }
                    else {
                        ScrollView {
                            VStack(alignment: .leading, spacing: 2) {
                                ForEach(studio.changements.prefix(200), id: \.self) { Text($0).font(.system(.caption, design: .monospaced)) }
                            }.frame(maxWidth: .infinity, alignment: .leading)
                        }.frame(maxHeight: 220)
                    }
                }
                Carte(titre: "Envoyer") {
                    TextField("Ce qui a changé (facultatif)", text: $message)
                    HStack {
                        Button { studio.publier(message: message); message = "" } label: { Label("Publier maintenant", systemImage: "paperplane.fill") }
                            .controlSize(.large).keyboardShortcut(.defaultAction).disabled(studio.occupe || !studio.depotPret)
                        Button("Actualiser") { studio.etat() }
                        Button("Voir en ligne") { NSWorkspace.shared.open(Chemins.enLigne) }
                    }
                    if studio.refusPush {
                        Button("Remplacer le contenu en ligne (première fois seulement)") { studio.publier(message: message, forcer: true) }
                            .foregroundColor(.red)
                    }
                    if studio.occupe { ProgressView().controlSize(.small) }
                }
            }
            Carte(titre: "Journal") {
                ScrollView {
                    Text(studio.journal.isEmpty ? "—" : studio.journal)
                        .font(.system(.caption, design: .monospaced)).textSelection(.enabled)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }.frame(minHeight: 140)
            }
            Spacer()
        }
        .padding(28)
        .onAppear { studio.etat() }
    }
}

// MARK: Réglages

struct Reglages: View {
    @EnvironmentObject var studio: Studio
    @State private var jeton = ""
    @State private var retour = ""
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Titre1(texte: "Réglages", sous: "À faire une seule fois.")
                Carte(titre: "1. Relier le dossier à GitHub") {
                    Text(studio.depotPret ? "C'est fait : le dossier est relié à github.com/nodedrt/samuel-drouin." : "Prépare le dossier du site pour l'envoyer sur GitHub.")
                    Button(studio.depotPret ? "Refaire la liaison" : "Relier à GitHub") { studio.preparerDepot() }.disabled(studio.occupe || !studio.siteTrouve)
                }
                Carte(titre: "2. Te connecter à GitHub") {
                    Text("Sur github.com : ta photo › Settings › Developer settings › Personal access tokens › Tokens (classic) › Generate new token. Coche « repo », puis copie le jeton et colle-le ici. Il est gardé dans le trousseau de ton Mac.")
                        .fixedSize(horizontal: false, vertical: true)
                    HStack {
                        SecureField("Jeton GitHub", text: $jeton)
                        Button("Enregistrer") {
                            studio.enregistrerJeton(jeton) { ok in
                                retour = ok ? "Connexion enregistrée." : "Le jeton n'a pas pu être enregistré."
                                jeton = ""
                            }
                        }.disabled(jeton.isEmpty || !studio.depotPret)
                        Button("Ouvrir GitHub") { NSWorkspace.shared.open(URL(string: "https://github.com/settings/tokens")!) }
                    }
                    if !retour.isEmpty { Text(retour).foregroundColor(.secondary) }
                }
                Carte(titre: "3. Activer le site") {
                    Text("Après ta première publication : sur GitHub, dépôt samuel-drouin › Settings › Pages › Deploy from a branch › main et / (root) › Save.")
                        .fixedSize(horizontal: false, vertical: true)
                    Button("Ouvrir les réglages Pages") { NSWorkspace.shared.open(URL(string: "https://github.com/nodedrt/samuel-drouin/settings/pages")!) }
                }
                Carte(titre: "Dossiers") {
                    Text("Site : \(Chemins.site.path)").font(.system(.caption, design: .monospaced))
                    Text("Pour Claude : \(Chemins.boite.path)").font(.system(.caption, design: .monospaced))
                    Button("Tout recharger") { studio.recharger() }
                }
                if !studio.journal.isEmpty {
                    Carte(titre: "Journal") { Text(studio.journal).font(.system(.caption, design: .monospaced)).textSelection(.enabled) }
                }
            }
            .padding(28)
        }
    }
}
