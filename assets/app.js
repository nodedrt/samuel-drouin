/* Samuel Drouin — portfolio.
   Contenu : assets/data.js (projets), assets/ajouts.js (projets ajoutés par l'app), videos.js.
   Photos : assets/photos.js (généré). */
(function () {
  "use strict";
  var SITE = window.SITE, PHOTOS = window.PHOTOS || {}, MAP = window.PREVIEW_MAP || null;
  var VSEC = window.VIDEO_SECTIONS || [], VIDEOS = (window.VIDEOS || []).concat(window.AJOUTS_VIDEOS || []);
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touch = window.matchMedia("(hover: none)").matches;
  var MAIL = "samueldrouinwork@gmail.com", TEL = "+230 5473 18 36", WA = "23054731836";

  /* ---------- projets ajoutés par l'app ---------- */
  (window.AJOUTS || []).forEach(function (a) {
    var f = "ajouts/" + a.slug;
    PHOTOS[f] = a.images;
    SITE.projets[a.slug] = { titre: a.titre, dossier: f, nouveau: true };
    var sec = SITE.sections.filter(function (s) { return s.id === a.section; })[0];
    if (!sec) { sec = { id: a.section, fr: a.sectionNom || a.section, en: a.sectionNom || a.section, projets: [] }; SITE.sections.splice(SITE.sections.length - 1, 0, sec); }
    if (sec.projets.indexOf(a.slug) < 0) sec.projets.unshift(a.slug);
    if (a.vitrine && SITE.une && a.images && a.images[0]) SITE.une.unshift({ projet: a.slug, img: [f + "/" + a.images[0][0]] });
  });
  VIDEOS.forEach(function (v) { if (v.vitrine && !v.vedette) v.vedette = 0.5; });

  /* ---------- langue ---------- */
  var lang = "";
  try { lang = localStorage.getItem("sd-lang") || ""; } catch (e) {}
  if (lang !== "fr" && lang !== "en") lang = /^fr/i.test(navigator.language || "") ? "fr" : "en";
  var T = {
    fr: {
      who: "Samuel Drouin", role: "Photographe & vidéaste, île Maurice", photo: "Photographie", video: "Vidéo", grade: "Étalonnage", info: "Info", contact: "Contact", menu: "Menu", close: "Fermer",
      images: "photos", projects: "projets", project: "projet", see: "Voir le projet", byProject: "Tous les projets", allVideos: "Toutes les vidéos",
      services: "Services", servicesLine: "Architecture et hôtellerie, entreprises et marques, portrait, voyage, films, drone, étalonnage.",
      clients: "Ils m’ont fait confiance", clientsLine: "Ciel Textile, Gamma Construction, Sealife, Sasha Academy, Telkom Kenya, KFC, Eclosia.",
      similar: "Un projet similaire ?", email: "E-mail", next: "Projet suivant", back: "Retour", ask: "Un projet ?", copy: "Copier", copied: "Copié", copyMail: "Copier l’adresse", seePhotos: "Voir les photos", writeMe: "Écrire à Samuel", openMail: "Ouvrir ma messagerie", close2: "Fermer",
      rights: "Photographies protégées, toute reproduction interdite.", backHome: "Retour à l’accueil", soundOn: "Activer le son", soundOff: "Couper le son", size: "Taille des images", goHome: "Accueil", ixList: "Liste", ixImages: "Images", vGrid: "Grille", vExpo: "Exposition", prev: "Préc.", nextShort: "Suiv.", prevImg: "Image préc.", nextImg: "Image suiv.", play: "Lire",
      bio: "Samuel Drouin est photographe et vidéaste, installé à l’île Maurice. Il cherche la lumière juste plutôt que la lumière parfaite : un matin sur la mangrove, un geste de la main, une équipe au travail, une maison qui s’éveille. De la vue aérienne au gros plan, il raconte les marques, les lieux et les gens avec une attention particulière aux matières, aux détails et à la couleur. Coloriste, il étalonne lui-même chacun de ses films et a créé Node DRT, un plugin d’étalonnage pour DaVinci Resolve.",
      tools: "Outils", svc: ["Photographie d’entreprise et de marque", "Portrait", "Architecture et hôtellerie", "Films publicitaires et institutionnels", "Prises de vue par drone", "Contenus pour les réseaux", "Étalonnage"],
      videos: "vidéos", prevP: "Projet précédent", wa: "Bonjour Samuel, j’ai un projet : ", notfound: "Page introuvable", home: "Retour à l’accueil", isNew: "Nouveau", reset: "Réinitialiser", seeFilms: "Voir les films", films: "films", watch: "Regarder le film", resume: "Reprendre", replay: "Revoir le film", watchAll: "Tout regarder", replayAll: "Tout revoir", full: "Plein écran", chapters: "chapitres", others: "Autres vidéos", prevCh: "Chapitre précédent", nextCh: "Chapitre suivant"
    },
    en: {
      who: "Samuel Drouin", role: "Photographer & filmmaker, Mauritius", photo: "Photography", video: "Video", grade: "Colour grading", info: "Info", contact: "Contact", menu: "Menu", close: "Close",
      images: "photos", projects: "projects", project: "project", see: "View project", byProject: "All projects", allVideos: "All videos",
      services: "Services", servicesLine: "Architecture & hospitality, corporate & brands, portrait, travel, film, drone, colour grading.",
      clients: "Clients", clientsLine: "Ciel Textile, Gamma Construction, Sealife, Sasha Academy, Telkom Kenya, KFC, Eclosia.",
      similar: "A similar project?", email: "Email", next: "Next project", back: "Back", ask: "A project in mind?", copy: "Copy", copied: "Copied", copyMail: "Copy the address", seePhotos: "See the photos", writeMe: "Write to Samuel", openMail: "Open my mail app", close2: "Close",
      rights: "Protected photographs, all reproduction prohibited.", backHome: "Back to home", soundOn: "Sound on", soundOff: "Sound off", size: "Image size", goHome: "Home", ixList: "List", ixImages: "Images", vGrid: "Grid", vExpo: "Exhibition", prev: "Prev.", nextShort: "Next", prevImg: "Previous image", nextImg: "Next image", play: "Play",
      bio: "Samuel Drouin is a photographer and filmmaker based in Mauritius. He looks for the right light rather than the perfect one: a morning over the mangrove, a hand at work, a team on set, a house waking up. From aerial views to close-ups, he tells the story of brands, places and people with a close eye for texture, detail and colour. A colourist, he grades every one of his films himself and created Node DRT, a grading plugin for DaVinci Resolve.",
      tools: "Tools", svc: ["Corporate & brand photography", "Portrait", "Architecture & hospitality", "Commercial & corporate film", "Drone photography & film", "Social media content", "Colour grading"],
      videos: "videos", prevP: "Previous project", wa: "Hi Samuel, I have a project: ", notfound: "Page not found", home: "Back to home", isNew: "New", reset: "Reset", seeFilms: "See the films", films: "films", watch: "Watch the film", resume: "Resume", replay: "Watch again", watchAll: "Watch all", replayAll: "Watch all again", full: "Full screen", chapters: "chapters", others: "Other videos", prevCh: "Previous chapter", nextCh: "Next chapter"
    }
  };
  var AUTH = "C’est dans la brume et dans la conquête de moi-même que je laisse parler mon intuition. La photographie est devenue ma quête. Cette quête n’a pas, pour moi, de destination dans le temps. Cet instant est en soi ma destination.";
  var AUTH_EN = "It is in the mist, and in the conquest of myself, that I let my intuition speak. Photography has become my quest. For me, this quest has no destination in time. This very moment is my destination.";
  function t(k) { return T[lang][k]; }
  function L(o) { return o && typeof o === "object" ? (o[lang] || o.fr) : o; }

  /* ---------- données ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  var DIM = {};
  Object.keys(PHOTOS).forEach(function (f) { DIM[f] = {}; PHOTOS[f].forEach(function (x) { DIM[f][x[0]] = x; }); });
  function P(code) {
    var i = code.lastIndexOf("/"), f = code.slice(0, i), n = code.slice(i + 1), d = (DIM[f] || {})[n] || [n, 1600, 1067];
    return { code: code, f: f, n: n, w: d[1], h: d[2] };
  }
  function src(p, small) { var s = "photos/" + p.f + (small ? "/min/" : "/") + p.n + ".jpg"; return MAP && MAP[s] ? MAP[s] : s; }
  function waLink() { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t("wa")); }
  function proj(slug) { return SITE.projets[slug]; }
  function images(slug) {
    var p = proj(slug); if (!p) return [];
    return (PHOTOS[p.dossier] || []).filter(function (x) {
      if (p.partie && x[3] !== p.partie) return false;
      if (p.sauf && p.sauf.indexOf(x[0]) >= 0) return false;
      return true;
    }).map(function (x) { return P(p.dossier + "/" + x[0]); });
  }
  function cover(slug) { var p = proj(slug); return p.couverture ? P(p.dossier + "/" + p.couverture) : images(slug)[0]; }
  function sectionOf(slug) { return SITE.sections.filter(function (s) { return s.projets.indexOf(slug) >= 0; })[0]; }
  function rank(slug) { var i = (SITE.ordre || []).indexOf(slug); return i < 0 ? 1000 : i; }
  function allProjects() { var a = []; SITE.sections.forEach(function (s) { s.projets.forEach(function (p) { if (proj(p) && images(p).length) a.push(p); }); }); return a; }

  function img(p, o) {
    o = o || {};
    return '<img draggable="false" alt="' + esc(o.alt || "") + '" width="' + p.w + '" height="' + p.h + '"' + (o.eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"') +
      ' src="' + esc(src(p, !o.full)) + '" srcset="' + esc(src(p, true)) + " 960w, " + esc(src(p)) + ' 1600w" sizes="' + (o.sizes || "50vw") + '">';
  }

  /* ---------- mode exposition ----------
     cadre : tirages encadrés (cadre noir fin, large passe-partout blanc) accrochés sur un mur clair, avec de temps en temps une image pleine largeur
     edito : mise en page de magazine, grandes images et petites images en décalé, numérotées */
  var vue = "grille";
  try { vue = sessionStorage.getItem("sd-vue") === "expo" ? "expo" : "grille"; } catch (e) {}
  /* exposition : le fondu suit exactement le défilement (aller et retour) */
  var exRaf = 0, exK = 1, zoom = 1;
  try { zoom = Math.max(0.55, Math.min(1.6, +sessionStorage.getItem("sd-zoom") || 1)); } catch (e) {}
  /* à l'ouverture (ou au passage en Exposition), les œuvres déjà visibles apparaissent elles aussi en fondu */
  function exIntro() {
    if (reduce) { exK = 1; exSync(); return; }
    var t0 = performance.now(), D = 1600;
    exK = 0; exSync();
    (function f(now) {
      var x = Math.min(1, (now - t0) / D); exK = x * x * (3 - 2 * x); exSync();
      if (x < 1) requestAnimationFrame(f);
    })(t0);
  }
  function exSync() {
    exRaf = 0;
    var vh = window.innerHeight, walls = main.querySelectorAll(".gal.ex .ex-wall");
    for (var i = 0; i < walls.length; i++) {
      var w = walls[i], hang = w.querySelector(".ex-hang"); if (!hang) continue;
      var r = hang.getBoundingClientRect();
      if (r.top > vh + 50 || r.bottom < -50) { w.style.setProperty("--a", r.top > vh ? 0 : 1); continue; }
      /* de 0 quand le haut de l'œuvre entre en bas de l'écran, à 1 quand son centre atteint 62 % de la hauteur */
      var start = vh, end = vh * 0.62 - r.height / 2, p = (start - r.top) / Math.max(1, start - end);
      p = Math.max(0, Math.min(1, p));
      if (i === 0) p = 1; /* la première œuvre : son fondu vient de l'ouverture, pas du défilement */
      p = p * p * (3 - 2 * p); /* courbe douce */
      w.style.setProperty("--a", (p * exK).toFixed(4));
    }
  }
  function exReq() { if (!exRaf) exRaf = requestAnimationFrame(exSync); }
  /* fondu au défilement désactivé (les œuvres s'affichent directement) */
  function expo(el, items, kind, title, wood) {
    /* accrochage de galerie : une œuvre (ou une paire de verticales) par mur, éclairée d'en haut,
       cadre noir satiné avec passe-partout (cadre) ou tirage contrecollé suspendu (edito) */
    var W = el.clientWidth, vw = window.innerWidth, vh = window.innerHeight, mob = vw < 768, out = [], n = items.length, i = 0;
    var fw = kind === "cadre" ? (mob ? 7 : Math.round(Math.min(16, Math.max(10, vw * 0.009)))) : 0;
    var mw = kind === "cadre" ? (mob ? 16 : Math.round(Math.min(70, Math.max(34, vw * 0.035)))) : 0;
    var extra = 2 * (fw + mw);
    function print(it, h) {
      var w = h * it.p.w / it.p.h, sd = Math.min(w, h);
      /* marie-louise et cadre proportionnels à la photo : mêmes proportions quelle que soit la taille choisie */
      var mwI = Math.round(sd * 0.14), fwI = Math.max(5, Math.round(sd * 0.032)), inner = img(it.p, { alt: it.alt, sizes: Math.ceil(100 * w / vw) + "vw", eager: it.i < 2 });
      var body = kind === "cadre"
        ? '<div class="ex-fr ' + (wood || "oak") + '" style="--fw:' + fwI + 'px"><div class="ex-mat" style="--mw:' + mwI + 'px"><div class="ex-im" style="width:' + w.toFixed(0) + "px;height:" + h.toFixed(0) + 'px">' + inner + "</div></div></div>"
        : '<div class="ex-fl" style="width:' + w.toFixed(0) + "px;height:" + h.toFixed(0) + 'px">' + inner + "</div>";
      return '<button type="button" class="ex-p fig" data-i="' + it.i + '"><div class="mask">' + body + "</div></button>";
    }
    /* accrochage sur une grille : chaque mur (une horizontale, ou deux verticales côte à côte)
       a exactement la même largeur extérieure, cadres compris, donc les bords gauche et droit s'alignent ;
       cadres plus petits par défaut et plus d'air entre eux */
    var pairOK = vw >= 600, e = kind === "cadre" ? 0.344 : 0;
    var G = mob ? 28 : Math.round(Math.min(130, Math.max(72, vw * 0.075)));
    var Wt = Math.min(W * 0.96, (mob ? W * 0.86 : W * 0.48) * zoom);
    var hPair = (Wt - G) / (2 * (2 / 3) * (1 + e));
    items = items.slice();
    while (i < n) {
      var a = items[i], ar = a.p.w / a.p.h, b = items[i + 1], br = b ? b.p.w / b.p.h : 0, grp, h;
      if (pairOK && ar < 0.95 && b && br >= 0.95) {
        for (var k = i + 2; k < Math.min(n, i + 4); k++) if (items[k].p.w / items[k].p.h < 0.95) { items.splice(i + 1, 0, items.splice(k, 1)[0]); b = items[i + 1]; br = b.p.w / b.p.h; break; }
      }
      grp = (pairOK && ar < 0.95 && b && br < 0.95) ? [a, b] : [a];
      var den = grp.reduce(function (s2, x) { var r = x.p.w / x.p.h; return s2 + r + e * Math.min(r, 1); }, 0);
      h = grp.length === 1 && ar < 0.95 && pairOK ? hPair : (Wt - G * (grp.length - 1)) / den;
      var tall = Math.max.apply(null, grp.map(function (x) { return 1 + e * Math.min(x.p.w / x.p.h, 1); }));
      h = Math.min(h, vh * (mob ? 0.74 : 0.8) / tall);
      i += grp.length;
      var num = grp.map(function (x) { return pad(x.i + 1); }).join(", ");
      out.push('<div class="ex-wall"><div class="ex-hang" style="gap:' + G + 'px">' + grp.map(function (x) { return print(x, h); }).join("") + "</div>" +
        '<p class="ex-lab"><b>' + esc(title) + "</b><span>" + num + " / " + pad(n) + "</span></p></div>");
    }
    el.innerHTML = out.join("");
    observe();
  }

  /* rangée(s) justifiée(s) : les images gardent leur format et partagent la même hauteur */
  function justify(el, items, o) {
    o = o || {};
    var cs = getComputedStyle(el), W = el.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0) - 1; if (W <= 0) return;
    var gap = parseFloat(cs.getPropertyValue("--g")) || 12, vw = window.innerWidth, vh = window.innerHeight;
    var rows = [], lastRows = [];
    if (o.balanced) {
      var mx = vw < 768 ? 2 : o.balanced, k = Math.ceil(items.length / mx), base = Math.floor(items.length / k), extra = items.length % k, q = 0;
      for (var ri = 0; ri < k; ri++) { var n = base + (ri < extra ? 1 : 0); rows.push(items.slice(q, q + n)); q += n; }
    } else if (o.single) {
      var groups = vw < 768 && items.length > 2 ? [items.slice(0, 2), items.slice(2)] : [items];
      groups.forEach(function (g) { rows.push(g); });
    } else if (o.rows) {
      o.rows.forEach(function (r) {
        var x = r.map(function (i) { return items[i]; }).filter(Boolean);
        /* sur téléphone, pas plus de deux images par rangée pour garder des photos lisibles */
        while (vw < 600 && x.length > 2) rows.push(x.splice(0, 2));
        if (x.length) rows.push(x);
      });
    } else {
      var target = o.target ? o.target(vw) : 300, segs = [[]];
      items.forEach(function (it, i) { if (o.breaks && o.breaks[i] && segs[segs.length - 1].length) segs.push([]); segs[segs.length - 1].push(it); });
      segs.forEach(function (seg) {
        var row = [], sum = 0;
        seg.forEach(function (it) { row.push(it); sum += it.p.w / it.p.h; if (sum * target + gap * (row.length - 1) >= W) { row.segId = seg; rows.push(row); row = []; sum = 0; } });
        if (row.length) {
          /* dernière rangée trop courte : on la rééquilibre avec la précédente pour que tout remplisse la largeur */
          if (sum * target < W * 0.75 && rows.length && rows[rows.length - 1].segId === seg) {
            var all = rows.pop().concat(row), half = Math.ceil(all.length / 2), r1 = all.slice(0, half), r2 = all.slice(half);
            r1.segId = seg; r2.segId = seg; rows.push(r1, r2);
          } else { row.segId = seg; rows.push(row); lastRows.push(rows.length - 1); }
        }
      });
    }
    el.innerHTML = rows.map(function (r, ri) {
      var sum = r.reduce(function (a, it) { return a + it.p.w / it.p.h; }, 0), h = (W - gap * (r.length - 1)) / sum;
      var last = lastRows.indexOf(ri) >= 0 && !o.single && !o.rows && rows.length > 1;
      /* rangées égales : aucune rangée plus haute que la rangée typique (médiane) */
      if (o.rows && o.egal) {
        var hs = rows.map(function (rr) { var s2 = rr.reduce(function (x, it) { return x + it.p.w / it.p.h; }, 0); return (W - gap * (rr.length - 1)) / s2; }).sort(function (a, b) { return a - b; });
        h = Math.min(h, hs[Math.floor((hs.length - 1) / 2)] * 1.5);
      }
      if (last && o.target) h = Math.min(h, o.target(vw) * 1.15);
      if (o.maxH) h = Math.min(h, o.maxH * vh);
      return '<div class="jr' + (o.center || o.egal ? " c" : "") + '">'  + r.map(function (it) {
        var w = h * it.p.w / it.p.h, tag = it.href ? "a" : "button";
        return "<" + tag + ' class="tile fig"' + (it.href ? ' href="' + it.href + '"' : ' type="button"') + (it.i != null ? ' data-i="' + it.i + '"' : "") + ' style="width:' + w.toFixed(1) + 'px">' +
          '<div class="mask" style="height:' + h.toFixed(1) + 'px">' + img(it.p, { alt: it.alt, sizes: Math.ceil(100 * w / vw) + "vw", eager: o.eager || ri === 0 }) + "</div>" + (it.cap || "") + "</" + tag + ">";
      }).join("") + "</div>";
    }).join("");
    observe();
  }
  var resizers = [];
  function mountJ(el, items, o) { var f = function () { justify(el, items, o); }; f(); resizers.push(f); }

  /* ---------- squelette ---------- */
  var hd = document.getElementById("hd"), main = document.getElementById("main"), ft = document.getElementById("contact"), bar = document.getElementById("bar"), menu = document.getElementById("menu");
  function chrome() {
    document.documentElement.lang = lang;
    var th = document.documentElement.getAttribute("data-th") || "v1", TH = { v1: lang === "fr" ? "Clair" : "Light", v2: lang === "fr" ? "Basalte" : "Basalt", v3: lang === "fr" ? "Sable" : "Sand" };
    hd.innerHTML = '<span class="whw intro-hd"><a class="home" href="#/photographie" aria-label="' + (lang === "fr" ? "Accueil" : "Home") + '" title="' + (lang === "fr" ? "Accueil" : "Home") + '"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 9.2 10 3l7 6.2"/><path d="M5 8v8.5h3.6v-4.8h2.8v4.8H15V8"/></svg></a><a class="who" href="#/">' + t("who") + '</a><span class="th" role="group" aria-label="' + (lang === "fr" ? "Ambiance du site" : "Site mood") + '">' +
      ["v1", "v2"].map(function (k) { return '<button type="button" data-th="' + k + '" title="' + TH[k] + '" aria-pressed="' + (k === th) + '">' + k.toUpperCase() + "</button>"; }).join("") + '</span></span><span class="loc intro-hd">' + esc(t("role")) + "</span>" +
      '<nav class="intro-hd" aria-label="Navigation"><button type="button" class="u ixb" data-ixo>Index,</button> <a class="u" data-nav="photographie" href="#/photographie">' + t("photo") + ',</a> <a class="u" data-nav="video" href="#/video">' + t("video") + ',</a> ' +
      '<a class="u" data-nav="etalonnage" href="#/etalonnage">' + t("grade") + ',</a> <a class="u" data-nav="info" href="#/info">' + t("info") + ',</a> <a class="u" href="#contact" data-contact>' + t("contact") + "</a>" +
      '<span class="lang"><button class="' + (lang === "fr" ? "" : "off") + '" data-lang="fr">FR</button> / <button class="' + (lang === "en" ? "" : "off") + '" data-lang="en">EN</button></span></nav>' +
      '<button class="menu-b intro-hd" aria-expanded="false" aria-controls="menu">' + t("menu") + "</button>";
    menu.innerHTML = '<button type="button" class="big" data-ixo>Index</button><a class="big" href="#/photographie">' + t("photo") + '</a><a class="big" href="#/video">' + t("video") + '</a><a class="big" href="#/etalonnage">' + t("grade") + '</a><a class="big" href="#/info">' + t("info") + '</a><a class="big" href="#contact" data-contact>' + t("contact") + "</a>" +
      '<div class="sm"><button data-lang="fr">FR</button><button data-lang="en">EN</button><a href="mailto:' + MAIL + '">' + t("email") + "</a></div>";
    ft.innerHTML = '<p class="q">' + t("ask") + '</p><a class="big u" href="mailto:' + MAIL + '">' + t("email") + " →</a>" +
      '<div class="bot"><span>' + MAIL + ' &nbsp; <button type="button" id="cp">' + t("copy") + "</button></span><span>" + TEL + "</span><span>© " + new Date().getFullYear() + " Samuel Drouin. " + t("rights") + "</span></div>" +
      '<p class="ft-seo">' + (lang === "fr" ? "Samuel Drouin, photographe et vidéaste à l’île Maurice : photographie immobilière, villas et hôtels, architecture, entreprises, portraits, drone, films de marque et étalonnage. Port-Louis, Grand Baie, Tamarin, Flic en Flac, Belle Mare et partout sur l’île." : "Samuel Drouin, photographer and filmmaker in Mauritius: real estate, villas and hotels, architecture, corporate, portraits, drone, brand films and colour grading. Port Louis, Grand Baie, Tamarin, Flic en Flac, Belle Mare and across the island.") + "</p>";
    bar.innerHTML = '<a href="mailto:' + MAIL + '">' + t("email") + "</a><span>" + MAIL + "</span>";
    hd.querySelector(".menu-b").addEventListener("click", function () { toggleMenu(); });
    document.getElementById("cp").addEventListener("click", function () {
      var b = this;
      try { navigator.clipboard.writeText(MAIL).then(function () { b.textContent = t("copied"); setTimeout(function () { b.textContent = t("copy"); }, 1500); }); } catch (e) {}
    });
  }
  /* fenêtre e-mail : l'adresse en grand et un bouton pour la copier (au lieu d'ouvrir directement la messagerie) */
  var mb = document.createElement("div"); mb.className = "mbox"; mb.hidden = true; mb.setAttribute("role", "dialog"); mb.setAttribute("aria-modal", "true");
  document.body.appendChild(mb);
  var mbFrom = null;
  function openMail(from) {
    mbFrom = from;
    mb.innerHTML = '<div class="mb-in"><button type="button" class="mb-x" aria-label="' + t("close2") + '">×</button>' +
      '<p class="mb-k">' + t("writeMe") + '</p><p class="mb-a">' + esc(MAIL) + "</p>" +
      '<div class="mb-b"><button type="button" class="mb-c">' + t("copyMail") + '</button><a class="mb-o" href="mailto:' + MAIL + '">' + t("openMail") + "</a></div></div>";
    mb.hidden = false; lock(true); requestAnimationFrame(function () { mb.classList.add("on"); });
    var c = mb.querySelector(".mb-c");
    c.focus();
    c.addEventListener("click", function () {
      var done = function () { c.textContent = t("copied") + " ✓"; c.classList.add("ok"); setTimeout(function () { c.textContent = t("copyMail"); c.classList.remove("ok"); }, 1800); };
      try { navigator.clipboard.writeText(MAIL).then(done, function () { selAddr(); }); } catch (e) { selAddr(); }
    });
    mb.querySelector(".mb-x").addEventListener("click", closeMail);
  }
  function selAddr() { var a = mb.querySelector(".mb-a"), r = document.createRange(); r.selectNodeContents(a); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  function closeMail() { if (mb.hidden) return; mb.classList.remove("on"); lock(false); setTimeout(function () { if (!mb.classList.contains("on")) { mb.hidden = true; mb.innerHTML = ""; } }, 350); if (mbFrom && mbFrom.isConnected) mbFrom.focus({ preventScroll: true }); }
  mb.addEventListener("click", function (e) { if (e.target === mb) closeMail(); });
  document.addEventListener("keydown", function (e) { if (!mb.hidden && e.key === "Escape") closeMail(); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a || a.closest(".mbox") || e.metaKey || e.ctrlKey) return;
    e.preventDefault(); openMail(a);
  });
  function toggleMenu(force) {
    var b = hd.querySelector(".menu-b"), open = force != null ? force : menu.hidden;
    if (open) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add("on"); }); }
    else { if (menu.hidden) return; menu.classList.remove("on"); setTimeout(function () { if (!menu.classList.contains("on")) menu.hidden = true; }, 400); }
    lock(open, true);
    b.setAttribute("aria-expanded", open); b.textContent = open ? t("close") : t("menu");
  }
  /* rend la page inactive derrière une fenêtre ouverte */
  function lock(on, keepHd) { [main, ft, bar].forEach(function (x) { if (x) x.inert = on; }); if (!keepHd) hd.inert = on; }
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) toggleMenu(false); });
  document.addEventListener("click", function (e) {
    var tb = e.target.closest("button[data-th]");
    if (tb) {
      var k = tb.dataset.th, de = document.documentElement;
      de.classList.add("thx"); if (k === "v1") de.removeAttribute("data-th"); else de.setAttribute("data-th", k);
      try { localStorage.setItem("sd-th", k); } catch (x) {}
      hd.querySelectorAll("button[data-th]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.th === k); });
      setTimeout(function () { de.classList.remove("thx"); }, 500);
      return;
    }
    var l = e.target.closest("[data-lang]");
    if (l) { lang = l.dataset.lang; try { localStorage.setItem("sd-lang", lang); } catch (x) {} chrome(); page = ""; render(true); return; }
    var hm0 = e.target.closest(".hd .home");
    if (hm0) { toggleMenu(false); if (location.hash === "#/photographie" || (page === "home" && location.hash === "#/" && mode === "photo")) { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); } return; }
    if (e.target.closest("[data-ixo]")) { e.preventDefault(); toggleMenu(false); goIndex(); return; }
    var xs = e.target.closest("[data-ixs]");
    if (xs) { e.preventDefault(); toggleMenu(false); openIxo(xs.dataset.ixs); return; }
    if (e.target.closest("#ixo .x") || e.target.closest("#ixo a")) { closeIxo(); }
    var c = e.target.closest("[data-contact]");
    if (c) { e.preventDefault(); toggleMenu(false); ft.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  });

  function pTitle(slug) { var p = proj(slug); return p ? L(p.titre) : ""; }
  function secName(slug) { var s = sectionOf(slug); return slug === "etalonnage" ? t("grade") : s ? L(s) : ""; }
  function href(slug) { return slug === "etalonnage" ? "#/etalonnage" : "#/photographie/" + slug; }

  /* ---------- accueil : photo / vidéo, vitrine, index ---------- */
  var mode = "photo", page = "", st = null, rot = {}, pools = {};
  try { mode = sessionStorage.getItem("sd-mode") === "video" ? "video" : "photo"; } catch (e) {}
  try { rot = JSON.parse(sessionStorage.getItem("sd-rot") || "{}") || {}; } catch (e) { rot = {}; }
  function saveMode() { try { sessionStorage.setItem("sd-mode", mode); } catch (e) {} }
  function saveRot() { try { sessionStorage.setItem("sd-rot", JSON.stringify(rot)); } catch (e) {} }
  function stopStage() { if (st) { st.dead = true; if (st.io) st.io.disconnect(); st = null; } }
  var RAMP = "cubic-bezier(.86,0,.07,1)", OUT = "cubic-bezier(.16,1,.3,1)", TR = 1300;

  function vsec(id) { return VSEC.filter(function (s) { return s.id === id; })[0]; }
  function counts() { return { photo: allProjects().length, video: VIDEOS.length }; }

  /* jeux d'images d'un projet : la sélection d'abord, puis chaque paysage seul et les verticales par deux */
  function pool(u) {
    if (pools[u.projet]) return pools[u.projet];
    var g = [], seen = {}, pend = null;
    if (u.img && u.img.length) { g.push(u.img.map(P)); u.img.forEach(function (c) { seen[c] = 1; }); }
    images(u.projet).forEach(function (p) {
      if (seen[p.code] || g.length >= 12) return;
      var ar = p.w / p.h;
      if (ar >= 1.25) g.push([p]);
      else if (ar <= 0.9) { if (pend) { g.push([pend, p]); pend = null; } else pend = p; }
    });
    if (!g.length) g.push([cover(u.projet)]);
    return (pools[u.projet] = g);
  }
  function peekGroup(it) { var g = pool(it.u); return g[(rot[it.key] || 0) % g.length]; }
  function takeGroup(it) { var g = peekGroup(it); rot[it.key] = (rot[it.key] || 0) + 1; saveRot(); return g; }

  function featured() {
    if (mode === "video") {
      return VIDEOS.filter(function (v) { return v.vedette; }).sort(function (a, b) { return a.vedette - b.vedette; }).map(function (v) {
        var p = parseVideo(v.lien || "") || {};
        /* un projet avec plusieurs films verticaux : tous côte à côte dans la vitrine */
        var grp = v.projet && (window.VIDEO_PAGES || []).indexOf(v.projet) >= 0 ? VIDEOS.filter(function (x) { var q = parseVideo(x.lien || ""); return x.projet === v.projet && q && q.file && x.format === "v"; }) : [];
        var multi = grp.length > 1 ? grp.map(function (x) { var q = parseVideo(x.lien); return { em: q.em, th: q.th, titre: L(x.titre) }; }) : null;
        var tt = multi ? (proj(v.projet) ? pTitle(v.projet) : L(v.titre)) : L(v.titre);
        return { video: true, vmulti: multi, titre: tt, meta: vsec(v.section) ? L(vsec(v.section)) : t("video"), em: p.em, th: p.th, th2: p.th2, ar: v.format === "v" ? 9 / 16 : 16 / 9 };
      }).filter(function (x) { return x.em; });
    }
    return (SITE.une || []).filter(function (u) { return proj(u.projet) && images(u.projet).length; }).map(function (u) {
      var s = secName(u.projet), ti = pTitle(u.projet);
      return { key: u.projet, u: u, titre: ti, meta: (s && s !== ti ? s + ", " : "") + images(u.projet).length + " " + t("images"), href: href(u.projet) };
    });
  }

  function home() {
    var c = counts();
    main.innerHTML =
      '<section class="st">' +
        '<div class="st-top"><div class="mode" role="tablist">' +
          '<a role="tab" href="#/photographie" data-mode="photo" aria-selected="' + (mode === "photo") + '">' + t("photo") + "<sup>" + c.photo + "</sup></a>" +
          '<a role="tab" href="#/video" data-mode="video" aria-selected="' + (mode === "video") + '">' + t("video") + "<sup>" + c.video + "</sup></a></div>" +
          '<p class="st-intro">' + esc(lang === "fr" ? "Photographie et film, à l’île Maurice et ailleurs." : "Photography and film, in Mauritius and beyond.") + "</p></div>" +
        '<div class="st-frame" role="region" aria-roledescription="carousel"></div>' +
        '<div class="st-cap grid"><span class="st-n"><span class="roll"></span></span><a class="st-t"><span class="roll"></span></a><span class="st-m"></span><a class="st-go u"></a></div>' +
        '<div class="st-lg"><button type="button" class="lg-a" data-d="-1" aria-label="' + t("prev") + '">←</button><div class="st-vp"><ol class="st-leg"></ol></div><button type="button" class="lg-a" data-d="1" aria-label="' + t("nextShort") + '">→</button></div><i class="st-clock" aria-hidden="true"></i>' +
      "</section>" +
      '<section class="ix grid" id="index"></section>' +
      '<section class="after grid"><p class="row"><span>' + t("services") + "</span><span>" + t("servicesLine") + '</span></p><p class="row"><span>' + t("clients") + "</span><span>" + t("clientsLine") + "</span></p></section>";
    heroSync(); startStage(false); indexList(false);
  }
  /* ---- ouverture de la page Vidéo : plein écran, les plans s'enchaînent en fondus lents ----
     l'image s'ouvre comme une paupière, chaque plan avance d'un léger travelling, sans son */
  var heroOff = null;
  function heroSync() {
    var ex = main.querySelector(".hero");
    if (mode !== "video") { if (heroOff) { heroOff(); heroOff = null; } if (ex) ex.remove(); return; }
    var st0 = main.querySelector(".st"); if (ex || !st0) return;
    var N = 5, FIRST = 5, XF = 1.4, big = window.innerWidth * (window.devicePixelRatio || 1) > 2200;
    var src = function (i) { return "videos/hero/" + pad(i + FIRST) + (big ? "-1440" : "") + ".mp4?v=2"; };
    var h = document.createElement("section"); h.className = "hero";
    h.setAttribute("aria-label", lang === "fr" ? "Extraits de films" : "Film excerpts");
    var segs = ""; for (var s = 0; s < N; s++) segs += "<i><b></b></i>";
    h.innerHTML = '<div class="hr-v"><video muted playsinline preload="auto" poster="videos/hero/poster.jpg?v=2" aria-hidden="true"></video><video muted playsinline preload="auto" aria-hidden="true"></video></div>' +
      '<a class="hr-b" href="#/photographie">← ' + (lang === "fr" ? "Accueil" : "Home") + "</a>" +
      '<div class="hr-p" aria-hidden="true">' + segs + "</div>" +
      '<button type="button" class="hr-d" aria-label="' + (lang === "fr" ? "Voir les films" : "See the films") + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg></button>';
    st0.parentNode.insertBefore(h, st0);
    var hd0 = document.getElementById("hd"); if (hd0) h.style.marginTop = Math.round(hd0.getBoundingClientRect().height) + "px";
    var vs = h.querySelectorAll("video"), segEl = h.querySelectorAll(".hr-p i"), cur = 0, k = 0, dead = false, vis = true, crossing = false;
    function load(v, i) { v.src = src(i); v.load(); }
    function play(v) { if (!vis || document.hidden) return; var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
    function seg() { segEl.forEach(function (e, j) { e.classList.toggle("on", j === k); e.classList.toggle("past", j < k); }); }
    function zoom(v) { v.classList.remove("z"); void v.offsetWidth; v.classList.add("z"); }
    load(vs[0], 0); load(vs[1], 1);
    vs[0].classList.add("on"); zoom(vs[0]); seg();
    vs[0].addEventListener("playing", function () { h.classList.add("open"); }, { once: true });
    setTimeout(function () { h.classList.add("open"); }, 2500);
    /* fondu entre les plans, sauf 3 → 4 : coupe franche */
    var CUT = { 2: 1 };
    function next() {
      if (dead || crossing) return; crossing = true;
      var cut = !!CUT[k], a = vs[cur], b = vs[1 - cur]; k = (k + 1) % N;
      try { b.currentTime = 0; } catch (e) {}
      if (cut) { a.style.transition = b.style.transition = "none"; }
      play(b); zoom(b); b.classList.add("on"); a.classList.remove("on"); seg(); cur = 1 - cur;
      if (cut) requestAnimationFrame(function () { requestAnimationFrame(function () { a.style.transition = b.style.transition = ""; }); });
      setTimeout(function () { crossing = false; if (dead) return; a.pause(); a.classList.remove("z"); load(a, (k + 1) % N); }, cut ? 300 : XF * 1000 + 150);
    }
    vs.forEach(function (v) {
      v.addEventListener("timeupdate", function () { if (v === vs[cur] && v.duration && v.currentTime > v.duration - (CUT[k] ? 0.12 : XF)) next(); });
      v.addEventListener("ended", function () { if (v === vs[cur]) next(); });
    });
    play(vs[0]);
    h.querySelector(".hr-d").addEventListener("click", function () { var y = st0.getBoundingClientRect().top + window.scrollY - 49; window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" }); });
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function (en) {
      vis = en[0].intersectionRatio > 0.15;
      if (vis) play(vs[cur]); else vs.forEach(function (v) { v.pause(); });
    }, { threshold: [0, 0.15, 0.5] }) : null;
    if (io) io.observe(h);
    var onVis = function () { if (document.hidden) vs.forEach(function (v) { v.pause(); }); else play(vs[cur]); };
    document.addEventListener("visibilitychange", onVis);
    /* flèche vers le bas : elle s'efface dès qu'on commence à descendre, revient en haut de page */
    var hd = h.querySelector(".hr-d"), onSc = function () { hd.classList.toggle("gone", window.scrollY > 30); };
    window.addEventListener("scroll", onSc, { passive: true }); onSc(); setTimeout(function () { h.classList.add("rdy"); }, 3400);
    heroOff = function () { dead = true; window.removeEventListener("scroll", onSc); if (io) io.disconnect(); document.removeEventListener("visibilitychange", onVis); vs.forEach(function (v) { v.pause(); v.removeAttribute("src"); v.load(); }); };
  }
  /* changer de mode : seuls la vitrine et l'index changent */
  function setMode(m) {
    if (m === mode) return;
    mode = m; saveMode();
    main.querySelectorAll("[data-mode]").forEach(function (x) { x.setAttribute("aria-selected", x.dataset.mode === mode); });
    heroSync(); startStage(true); indexList(true);
  }

  /* ---- vitrine ---- */
  function startStage(keep) {
    stopStage();
    var root = main.querySelector(".st"); if (!root) return;
    var items = featured(), frame = root.querySelector(".st-frame"), leg = root.querySelector(".st-leg");
    var me = st = { i: -1, tok: 0, items: items, root: root, grp: null };
    root.classList.remove("playing");
    if (!keep) frame.innerHTML = "";
    leg.innerHTML = "";
    /* légende par groupes : elle change en fondu, les flèches parcourent les groupes */
    /* légende en ruban : une fenêtre de quelques projets qui glisse d'un cran ;
       à chaque changement, un nom sort d'un côté pendant qu'un autre entre de l'autre */
    var vp = root.querySelector(".st-vp"), n0 = items.length;
    function per() { return Math.min(n0, window.innerWidth < 600 ? 2 : window.innerWidth < 1100 ? 4 : 6); }
    function mod(x) { return ((x % n0) + n0) % n0; }
    function li(k) {
      var it = items[k], e = document.createElement("li");
      e.innerHTML = '<button type="button" data-k="' + k + '"><span>' + esc(it.titre) + "</span><i><b></b></i></button>";
      e.firstChild.addEventListener("click", function () { show(k); });
      return e;
    }
    function gapPx() { return parseFloat(getComputedStyle(leg).columnGap) || 12; }
    function sizeLeg() { var P = per(), g = gapPx(); me.slot = (vp.clientWidth - g * (P - 1)) / P; leg.style.setProperty("--w", me.slot.toFixed(2) + "px"); return me.slot + g; }
    function markOn() {
      leg.querySelectorAll("button").forEach(function (b) { var on = +b.dataset.k === me.i; b.classList.toggle("on", on); b.setAttribute("aria-current", on); });
      mirror();
    }
    function drawWin(fade) {
      sizeLeg(); leg.innerHTML = "";
      for (var j = 0; j < per(); j++) leg.appendChild(li(mod(me.win + j)));
      root.querySelectorAll(".lg-a").forEach(function (a) { a.hidden = n0 <= per(); });
      markOn();
      if (fade && !reduce && leg.animate) leg.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: OUT });
    }
    me.win = 0; me.anim = null;
    /* un cran : d = 1 (vers la gauche, un nouveau nom à droite) ou -1 */
    function slideLeg(d, dur, done) {
      var S = sizeLeg(), P = per();
      if (reduce || !leg.animate) { me.win += d; drawWin(); if (done) done(); return; }
      var add = li(mod(d > 0 ? me.win + P : me.win - 1)), out;
      if (d > 0) { leg.appendChild(add); out = leg.firstElementChild; }
      else { leg.insertBefore(add, leg.firstElementChild); out = leg.lastElementChild; }
      markOn();
      var from = d > 0 ? 0 : -S, to = d > 0 ? -S : 0, ease = "cubic-bezier(.65,0,.35,1)";
      add.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dur, easing: ease });
      out.animate([{ opacity: 1 }, { opacity: 0 }], { duration: dur * 0.7, easing: "ease-out", fill: "forwards" });
      var a = me.anim = leg.animate([{ transform: "translate3d(" + from + "px,0,0)" }, { transform: "translate3d(" + to + "px,0,0)" }], { duration: dur, easing: ease });
      a.onfinish = a.oncancel = function () {
        if (out.parentNode) out.remove();
        me.win += d; if (me.anim === a) me.anim = null;
        if (done && !me.dead) done();
      };
    }
    /* amener la fenêtre pour que le projet actif soit en deuxième position */
    function follow(k) {
      var P = per(), target = P > 2 ? k - 1 : k, tok = me.chain = (me.chain || 0) + 1;
      if (me.anim) me.anim.finish();
      if (n0 <= P) { if (me.win) { me.win = 0; drawWin(); } else markOn(); return; }
      var delta = mod(target - me.win);
      if (delta > n0 / 2) delta -= n0;
      if (!delta) { markOn(); return; }
      if (Math.abs(delta) >= P) { me.win = target; drawWin(true); return; }
      var d = delta > 0 ? 1 : -1, left = Math.abs(delta), dur = left > 1 ? 320 : 620;
      (function next() { if (tok !== me.chain || !left--) return; slideLeg(d, dur, next); })();
    }
    me.follow = follow;
    root.querySelectorAll(".lg-a").forEach(function (a) { a.onclick = function () { me.chain = (me.chain || 0) + 1; if (me.anim) me.anim.finish(); slideLeg(+a.dataset.d, 520); }; });
    if ("IntersectionObserver" in window) {
      me.io = new IntersectionObserver(function (es) { root.classList.toggle("away", !es[0].isIntersecting); sync(); }, { threshold: 0.25 });
      me.io.observe(frame);
    }

    /* minuterie : elle s'arrête tant que la souris est sur la vitrine */
    var DUR = 4500, clock = root.querySelector(".st-clock");
    /* souris sur la vitrine : le temps ralentit (x2,5) sans s'arrêter ; pause seulement pendant une vidéo ou hors écran */
    function pauseNow() { return root.classList.contains("playing") || root.classList.contains("away"); }
    function sync() {
      var r = me.hold ? 0.4 : 1;
      [me.bar, me.vis].forEach(function (a) {
        if (!a) return;
        if (a.playbackRate !== r) { if (a.updatePlaybackRate) a.updatePlaybackRate(r); else a.playbackRate = r; }
        if (pauseNow()) { if (a.playState === "running") a.pause(); } else if (a.playState === "paused") a.play();
      });
    }
    function mirror() {
      if (me.vis) { me.vis.cancel(); me.vis = null; }
      var b = leg.querySelector("button.on b"); if (!b) return;
      if (reduce || !b.animate || !me.bar) { b.style.transform = "scaleX(1)"; return; }
      me.vis = b.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: DUR, easing: "linear", fill: "forwards" });
      me.vis.currentTime = me.bar.currentTime || 0;
      sync();
    }
    function bar() {
      if (me.bar) { me.bar.onfinish = null; me.bar.cancel(); me.bar = null; }
      if (!reduce && clock.animate) {
        me.bar = clock.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: DUR, easing: "linear", fill: "forwards" });
        me.bar.onfinish = function () { if (!me.dead) show(me.i + 1, 1); };
      }
      mirror(); sync();
    }
    me.sync = sync;
    root.onpointerenter = function (e) { if (e.pointerType !== "mouse") return; me.hold = true; sync(); };
    root.onpointerleave = function (e) { if (e.pointerType !== "mouse") return; me.hold = false; sync(); cursor.hide(); };
    /* au toucher, aucun ralenti ne doit rester collé */
    root.addEventListener("touchstart", function () { if (me.hold) { me.hold = false; sync(); } cursor.hide(); }, { passive: true });

    /* glisser, cliquer à gauche / à droite, étiquette qui suit la souris */
    var drag = null;
    /* zones : bords extrêmes = projet précédent / suivant ; côtés de l'image = image précédente / suivante du projet ; centre = ouvrir */
    function multi() { var it = me.items[me.i]; return it && !it.video && pool(it.u).length > 1; }
    function zone(x) {
      var r = frame.getBoundingClientRect(), f = (x - r.left) / r.width;
      var ims = frame.lastElementChild ? frame.lastElementChild.querySelectorAll(".st-i") : [];
      var a = ims.length ? ims[0].getBoundingClientRect().left : r.left, b = ims.length ? ims[ims.length - 1].getBoundingClientRect().right : r.right;
      var edge = Math.max(r.width * 0.1, 48);
      if (x < Math.max(a, r.left + edge)) return -2;
      if (x > Math.min(b, r.right - edge)) return 2;
      var g = (x - a) / (b - a), cur = me.items[me.i];
      if (cur && cur.vmulti) return 0;
      return !multi() ? (f < 0.3 ? -2 : f > 0.7 ? 2 : 0) : g < 0.33 ? -1 : g > 0.67 ? 1 : 0;
    }
    function label(dx, x) {
      var it = me.items[me.i]; if (!it) return "";
      if (drag && Math.abs(dx) > 8) return dx < 0 ? "→" : "←";
      var z = zone(x), n = me.items.length;
      if (z === -2) return "← " + me.items[(me.i - 1 + n) % n].titre;
      if (z === 2) return me.items[(me.i + 1) % n].titre + " →";
      if (z === -1) return "← " + t("prevImg");
      if (z === 1) return t("nextImg") + " →";
      return it.video ? t("play") : t("see");
    }
    function step(d) {
      var it = me.items[me.i];
      if (!multi()) { show(me.i + d, d); return; }
      var L = pool(it.u).length;
      if (d < 0) { rot[it.key] = ((rot[it.key] || 0) - 2) % L; if (rot[it.key] < 0) rot[it.key] += L; }
      show(me.i, d, true);
    }
    frame.onpointerdown = function (e) {
      if (e.button || root.classList.contains("playing")) return;
      drag = { x: e.clientX, dx: 0 };
      try { frame.setPointerCapture(e.pointerId); } catch (x) {}
      cursor.press(true);
    };
    frame.onpointermove = function (e) {
      if (root.classList.contains("playing")) { cursor.hide(); return; }
      if (drag) {
        drag.dx = e.clientX - drag.x;
        var cur = frame.lastElementChild;
        if (cur && Math.abs(drag.dx) > 4) { cur.style.transform = "translateX(" + (drag.dx * 0.4) + "px)"; root.classList.add("dragging"); }
      }
      if (e.pointerType === "mouse") cursor.show(label(drag ? drag.dx : 0, e.clientX), e.clientX, e.clientY);
    };
    function endDrag(cancel, x) {
      if (!drag) return;
      var dx = drag.dx; drag = null; root.classList.remove("dragging"); cursor.press(false);
      var cur = frame.lastElementChild;
      if (!cancel && Math.abs(dx) > 70) { show(me.i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); return; }
      if (cur && cur.style.transform) { var from = cur.style.transform; cur.style.transform = ""; if (cur.animate && !reduce) cur.animate([{ transform: from }, { transform: "none" }], { duration: 600, easing: OUT }); }
      if (!cancel && Math.abs(dx) < 6) { var z = zone(x); if (z === -2 || z === 2) show(me.i + z / 2, z / 2); else if (z) step(z); else open(false, slotAt(x)); }
    }
    frame.onpointerup = function (e) { endDrag(false, e.clientX); };
    frame.onpointercancel = function () { endDrag(true); };
    frame.onpointerleave = function (e) { if (e.pointerType === "mouse") cursor.hide(); };
    frame.onkeydown = function (e) { if (e.key === "Enter") open(); };
    root.querySelector(".st-t").onclick = function (e) { var it = me.items[me.i]; if (!it || it.video) { e.preventDefault(); open(); } };

    /* vidéo de la vitrine : elle se lance toute seule (avec le son si le navigateur l'autorise), puis la vitrine reprend */
    function slotAt(x) {
      var ims = frame.lastElementChild ? frame.lastElementChild.querySelectorAll(".st-i") : [], k = 0;
      [].forEach.call(ims, function (im, i) { var r = im.getBoundingClientRect(); if (x >= r.left - 6) k = i; });
      return k;
    }
    function open(auto, slot) {
      var it = me.items[me.i]; if (!it) return;
      if (!it.video) { if (!auto) location.hash = it.href; return; }
      if (root.classList.contains("playing")) { var vv = frame.querySelector("video"); if (vv && vv.muted && !auto) { vv.muted = false; } return; }
      var boxes = frame.lastElementChild ? frame.lastElementChild.querySelectorAll(".st-i") : [], box = boxes[slot || 0] || boxes[0];
      var src0 = it.vmulti ? it.vmulti[Math.min(slot || 0, it.vmulti.length - 1)] : it;
      if (!box || !src0.em) return;
      if (auto && /drive\.google/.test(it.em)) return; /* Google Drive ne permet pas la lecture automatique */
      var act = navigator.userActivation ? navigator.userActivation.hasBeenActive : !auto, em = src0.em, file = /\.(mp4|webm|m4v)(\?|$)/i.test(em);
      if (!file && /youtube/.test(em)) em += "&enablejsapi=1" + (act ? "" : "&mute=1");
      else if (!file && /vimeo/.test(em) && !act) em += "&muted=1";
      root.classList.add("playing"); cursor.hide(); sync();
      box.insertAdjacentHTML("beforeend", player(em, it.titre));
      var tokP = me.tok;
      function back() {
        if (tokP !== me.tok || me.dead) return;
        var f = box.querySelector("video, iframe"), fin = function () { if (f && f.isConnected) f.remove(); var cv = box.querySelector(".vcov"); if (cv) cv.remove(); root.classList.remove("playing"); sync(); };
        if (f && !reduce && f.animate) f.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, easing: "ease-out", fill: "forwards" }).onfinish = fin; else fin();
      }
      var v0 = box.querySelector("video");
      if (v0) {
        v0.muted = !act;
        /* commandes discrètes : elles disparaissent vite ; un toucher (voile transparent au-dessus de la vidéo)
           ou un mouvement de souris les fait revenir un court instant, sans mettre la vidéo en pause */
        var cov = document.createElement("i"); cov.className = "vcov"; box.appendChild(cov);
        var ctT = 0, showCt = function (ms) { v0.controls = true; cov.hidden = true; clearTimeout(ctT); ctT = setTimeout(function () { if (!v0.paused) { v0.controls = false; cov.hidden = false; } }, ms); };
        showCt(1400);
        box.addEventListener("pointermove", function (e) { if (e.pointerType === "mouse") showCt(1600); });
        cov.addEventListener("pointerdown", function (e) { e.preventDefault(); e.stopPropagation(); });
        cov.addEventListener("pointerup", function (e) { e.stopPropagation(); });
        cov.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); showCt(2600); });
        v0.addEventListener("pause", function () { clearTimeout(ctT); v0.controls = true; cov.hidden = true; });
        v0.addEventListener("play", function () { showCt(1200); });
        v0.addEventListener("ended", function () { cov.remove(); });
        var pr0 = v0.play();
        if (pr0 && pr0.catch) pr0.catch(function () { if (!v0.muted) { v0.muted = true; var p2 = v0.play(); if (p2 && p2.catch) p2.catch(function () {}); } });
        v0.addEventListener("ended", back);
      }
      var f0 = box.querySelector("iframe");
      if (f0 && /youtube/.test(em)) {
        f0.addEventListener("load", function () { try { f0.contentWindow.postMessage('{"event":"listening","id":1,"channel":"widget"}', "*"); } catch (x) {} });
        window.__ytEnd = back;
      }
    }
    if (!window.__ytL) {
      window.__ytL = 1;
      window.addEventListener("message", function (e) {
        if (!/youtube/.test(e.origin || "")) return;
        var d; try { d = typeof e.data === "string" ? JSON.parse(e.data) : e.data; } catch (x) { return; }
        if (d && d.info && d.info.playerState === 0 && window.__ytEnd) { var f = window.__ytEnd; window.__ytEnd = null; f(); }
      });
    }

    function layer(it, grp) {
      var W = frame.clientWidth, H = frame.clientHeight, gap = 12, list;
      if (it.video && it.vmulti) list = (window.innerWidth < 600 ? it.vmulti.slice(0, 2) : it.vmulti).map(function (m) { return { ar: 9 / 16, th: m.th }; });
      else if (it.video) list = [{ ar: it.ar || 16 / 9 }];
      else { list = grp.map(function (p) { return { ar: p.w / p.h, p: p }; }); if (window.innerWidth < 768) list = [{ ar: W / H, p: grp[0] }]; }
      var sum = list.reduce(function (a, x) { return a + x.ar; }, 0), h = Math.min(H, (W - gap * (list.length - 1)) / sum);
      var d = document.createElement("div"); d.className = "st-l";
      d.innerHTML = list.map(function (x) {
        var im = x.p ? '<img draggable="false" data-c="' + esc(x.p.f + "/" + x.p.n) + '" alt="' + esc(it.titre) + '" src="' + esc(src(x.p)) + '">' :
          '<img draggable="false" alt="" src="' + esc(x.th || it.th || "") + '"' + (!x.th && it.th2 ? ' data-fb="' + esc(it.th2) + '"' : "") + ">";
        return '<div class="st-i" style="width:' + (h * x.ar).toFixed(1) + "px;height:" + h.toFixed(1) + 'px"><div class="dr">' + im + "</div>" + (it.video ? '<span class="play">' + t("play") + "</span>" : "") + "</div>";
      }).join("");
      var fb = d.querySelector("img[data-fb]");
      if (fb) { fb.onload = function () { if (fb.naturalWidth <= 120 && fb.dataset.fb) { fb.src = fb.dataset.fb; delete fb.dataset.fb; } }; fb.onerror = function () { if (fb.dataset.fb) { fb.src = fb.dataset.fb; delete fb.dataset.fb; } }; }
      return d;
    }
    function ready(d, cb) {
      var done = false, fin = function () { if (!done) { done = true; cb(); } };
      var ps = [].map.call(d.querySelectorAll("img"), function (im) { return im.decode ? im.decode().catch(function () {}) : Promise.resolve(); });
      Promise.all(ps).then(fin); setTimeout(fin, 700);
    }
    function drift(d, delay) {
      if (reduce || !d.animate) return;
      d.querySelectorAll(".dr").forEach(function (x) { x.animate([{ transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 8000, delay: delay, easing: "cubic-bezier(.3,.1,.3,1)", fill: "both" }); });
    }

    function show(k, dir, same) {
      if (me.dead || !me.items.length) return;
      var n = me.items.length; k = (k + n) % n;
      if (k === me.i && !same) return;
      if (dir == null) dir = me.i < 0 ? 1 : (me.i === n - 1 && k === 0) ? 1 : (me.i === 0 && k === n - 1) ? -1 : (k > me.i ? 1 : -1);
      var firstShow = me.i < 0 && !frame.firstElementChild;
      me.i = k; root.classList.remove("playing");
      var it = me.items[k], grp = it.video ? null : takeGroup(it);
      me.grp = grp;
      var d = layer(it, grp), tok = ++me.tok;
      d.style.visibility = "hidden";
      frame.appendChild(d);
      [].forEach.call(frame.querySelectorAll("iframe, video, .vcov"), function (f) { f.remove(); });

      /* légende, titre, compteur : tout de suite */
      var cap = root.querySelector(".st-cap"), tt = cap.querySelector(".st-t"), go = cap.querySelector(".st-go");
      go.textContent = it.video ? t("play") : t("see"); go.setAttribute("href", it.href || "#/");
      go.onclick = it.video ? function (e) { e.preventDefault(); open(); } : null;
      tt.setAttribute("href", it.href || "#/");
      bar();
      if (!leg.children.length) { me.win = per() > 2 ? k - 1 : k; drawWin(); } else follow(k);

      ready(d, function () {
        if (tok !== me.tok || me.dead) { d.remove(); return; }
        d.style.visibility = "";
        if (!same) { roll(cap.querySelector(".st-n .roll"), pad(k + 1) + " / " + pad(n), dir); roll(tt.querySelector(".roll"), it.titre, dir); }
        cap.querySelector(".st-m").textContent = it.meta;
        var olds = [].filter.call(frame.children, function (o) { return o !== d; });
        if (reduce || !d.animate) { olds.forEach(function (o) { o.remove(); }); return; }
        if (firstShow) {
          d.animate([{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 1300, easing: "cubic-bezier(.76,0,.24,1)" });
        } else {
          /* rideau qui glisse sur le côté, comme avant */
          d.animate([{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 950, easing: "cubic-bezier(.76,0,.24,1)" });
          d.querySelectorAll(".dr").forEach(function (x) { x.animate([{ transform: "scale(1.12) translate3d(" + (dir * 4) + "%,0,0)" }, { transform: "none" }], { duration: 1200, easing: OUT }); });
          olds.forEach(function (o) {
            var from = o.style.transform || "translate3d(0,0,0)";
            o.getAnimations().forEach(function (a) { a.cancel(); });
            var a = o.animate([{ transform: from, opacity: 1 }, { transform: "translate3d(" + (-dir * 8) + "%,0,0)", opacity: 0 }], { duration: 950, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" });
            a.onfinish = function () { o.remove(); };
            setTimeout(function () { if (o.parentNode) o.remove(); }, 1100);
          });
        }
      });
      /* préparer la suivante */
      var nx = me.items[(k + 1) % n];
      if (nx && !nx.video) peekGroup(nx).forEach(function (p) { var im = new Image(); im.src = src(p); });
      else if (nx && nx.th) { new Image().src = nx.th; }
    }
    me.show = show;
    resizers.push(function () {
      if (!me.dead && me.i >= 0) { if (me.anim) me.anim.finish(); me.win = per() > 2 ? me.i - 1 : me.i; drawWin(); }
      var it = me.items[me.i]; if (!it || me.dead || root.classList.contains("playing")) return;
      var d = layer(it, me.grp); frame.innerHTML = ""; frame.appendChild(d);
    });
    var r0 = 0;
    if (resumeI != null && resumeI < items.length) {
      r0 = resumeI; var it0 = items[r0];
      if (it0 && !it0.video && rot[it0.key]) { rot[it0.key]--; saveRot(); }
    }
    resumeI = null;
    show(r0, 1);
    /* précharger toute la vitrine pour des changements instantanés */
    setTimeout(function () {
      if (me.dead) return;
      me.items.forEach(function (it) {
        if (it.video) { if (it.th) new Image().src = it.th; return; }
        peekGroup(it).forEach(function (p) { var im = new Image(); im.decoding = "async"; im.src = src(p); });
      });
    }, 1800);
  }

  /* curseur natif (pas d'effet) */
  /* clarté de la photo sous la légende : une petite carte 24×24 par image, calculée une fois */
  function lumMap(im) {
    if (im._lum !== undefined) return im._lum;
    /* carte précalculée (fonctionne aussi en ouvrant le site depuis le Mac) */
    var pre = window.CLARTE && im.dataset.c && window.CLARTE[im.dataset.c];
    if (pre) {
      var g = new Float32Array(576);
      for (var v = 0; v < 24; v++) for (var u = 0; u < 24; u++) g[v * 24 + u] = parseInt(pre.charAt(Math.floor(v / 3) * 8 + Math.floor(u / 3)), 16) / 15;
      return (im._lum = g);
    }
    im._lum = null;
    try {
      if (!im.complete || !im.naturalWidth) { im._lum = undefined; return null; }
      var c = document.createElement("canvas"); c.width = c.height = 24;
      var x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(im, 0, 0, 24, 24);
      var d = x.getImageData(0, 0, 24, 24).data, m = new Float32Array(576);
      for (var i = 0; i < 576; i++) m[i] = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
      im._lum = m;
    } catch (e) {}
    return im._lum;
  }
  /* vrai = fond clair sous le texte (donc texte noir) : on mesure une zone invisible au milieu de ce qui est écrit */
  function lightAt(r) {
    var sum = 0, n = 0, pad = 6;
    for (var a = 0; a < 7; a++) for (var b = 0; b < 3; b++) {
      var x = r.left - pad + (r.width + pad * 2) * (a + 0.5) / 7, y = r.top - pad + (r.height + pad * 2) * (b + 0.5) / 3, l = 0.97;
      var el = document.elementFromPoint(x, y), box = el && el.closest && el.closest(".st-i");
      if (box) {
        var im = box.querySelector("img"), m = im && lumMap(im), q = box.getBoundingClientRect();
        if (m) { var u = Math.floor((x - q.left) / q.width * 24), v = Math.floor((y - q.top) / q.height * 24); l = m[Math.max(0, Math.min(23, v)) * 24 + Math.max(0, Math.min(23, u))]; }
        else l = 0.3;
      }
      sum += l; n++;
    }
    return sum / n > 0.62;
  }
  var cursor = (function () {
    /* curseur discret : un point et une légende fine, collés à la souris ; blancs sur l'image, noirs sur le fond */
    var el = document.createElement("div"); el.className = "st-hint"; el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<i class="h-dot"></i><span class="h-t"><span></span></span>';
    document.body.appendChild(el);
    var tx = el.querySelector(".h-t span"), on = false, cur = "";
    function setText(txt) {
      if (txt === cur) return; cur = txt;
      if (reduce || !tx.animate || !tx.textContent) { tx.textContent = txt; return; }
      var o = tx.animate([{ transform: "none", opacity: 1 }, { transform: "translateY(-100%)", opacity: 0 }], { duration: 160, easing: "ease-in", fill: "forwards" });
      o.onfinish = function () { tx.textContent = cur; o.cancel(); tx.animate([{ transform: "translateY(100%)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 340, easing: OUT }); };
    }
    return {
      show: function (txt, px, py) {

        el.style.transform = "translate3d(" + (px + 18) + "px," + (py + 20) + "px,0)";
        setText(txt);
        if (!on) { on = true; el.classList.add("on"); document.documentElement.classList.add("hint-on"); }
      },
      hide: function () { if (!on) return; on = false; el.classList.remove("on"); document.documentElement.classList.remove("hint-on"); },
      press: function (p) { el.classList.toggle("down", !!p); }
    };
  })();
  document.addEventListener("visibilitychange", function () { if (st && st.sync) st.sync(); });

  /* navigation entre projets : la même en haut et en bas de chaque page */
  function pnav(pr, nx, big) {
    return '<nav class="pnav' + (big ? " big" : "") + '" aria-label="' + t("byProject") + '">' +
      '<a class="pp" href="' + href(pr) + '"><span class="xs">← ' + t("prevP") + "</span><b>" + esc(pTitle(pr)) + "</b></a>" +
      '<button type="button" class="pi" data-ixo>Index</button>' +
      '<a class="pn" href="' + href(nx) + '"><span class="xs">' + t("next") + " →</span><b>" + esc(pTitle(nx)) + "</b></a></nav>";
  }

  /* titre qui roule, lettre par lettre */
  function rollSplit(s) { return String(s).split("").map(function (ch) { return "<span>" + (ch === " " ? "&nbsp;" : esc(ch)) + "</span>"; }).join(""); }
  /* une fois l'animation finie, le titre redevient un texte normal : crénage et ligatures justes, plus de lettres qui se chevauchent */
  function rollFlat(nw, text, ms) { setTimeout(function () { if (nw.isConnected && !nw.nextElementSibling && nw.querySelector("span")) nw.textContent = String(text).replace(/ /g, "\u00a0"); }, ms); }
  function roll(el, text, dir) {
    if (!el) return;
    var nw = document.createElement("span"); nw.className = "rw";
    nw.innerHTML = rollSplit(text);
    var olds = el.querySelectorAll(".rw");
    if (olds.length && olds[olds.length - 1].textContent === nw.textContent) return;
    if (reduce || !nw.animate || !olds.length) {
      el.innerHTML = ""; el.appendChild(nw); rollFlat(nw, text, reduce || !nw.animate ? 0 : 1400 + String(text).length * 22);
      if (!reduce && nw.animate) nw.querySelectorAll("span").forEach(function (c, i) { c.animate([{ transform: "translateY(110%)" }, { transform: "none" }], { duration: 1100, delay: 200 + i * 22, easing: OUT, fill: "backwards" }); });
      return;
    }
    for (var q = 0; q < olds.length - 1; q++) olds[q].remove();
    var old = olds[olds.length - 1], up = dir < 0 ? 1 : -1;
    if (!old.querySelector("span")) old.innerHTML = rollSplit(old.textContent.replace(/\u00a0/g, " "));
    old.querySelectorAll("span").forEach(function (c, i) { c.animate([{ transform: "none" }, { transform: "translateY(" + (up * 110) + "%)" }], { duration: 520, delay: i * 10, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" }); });
    setTimeout(function () { if (old.parentNode) old.remove(); }, 720);
    el.appendChild(nw);
    nw.querySelectorAll("span").forEach(function (c, i) { c.animate([{ transform: "translateY(" + (-up * 110) + "%)" }, { transform: "none" }], { duration: 1000, delay: 220 + i * 20, easing: OUT, fill: "backwards" }); });
    rollFlat(nw, text, 1300 + String(text).length * 20);
  }

  /* ---- index : les sections et leurs projets ---- */
  var pv = document.getElementById("peek");
  function indexList(anim) {
    var el = main.querySelector(".ix"); if (!el) return;
    var cards = [], groups = [], n = 0;
    var fams = [], ixv = "tabs";
    if (mode === "photo") {
      /* familles de projets (SITE.familles) ; dans chaque famille, les plus beaux d'abord (SITE.ordre) */
      var ent = [], seenS = {}, secOf = {};
      SITE.sections.forEach(function (s) { s.projets.filter(function (slug) { return proj(slug) && images(slug).length; }).forEach(function (slug) { if (!secOf[slug]) { secOf[slug] = s; ent.push(slug); } }); });
      var FAM = (SITE.familles || []).slice(), used = {};
      FAM.forEach(function (f) { var ps = f.projets.filter(function (x) { return secOf[x]; }); ps.forEach(function (x) { used[x] = 1; }); if (ps.length) fams.push({ f: f, ps: ps }); });
      var rest = ent.filter(function (x) { return !used[x]; }).sort(function (a, b) { return rank(a) - rank(b); });
      if (rest.length) fams.push({ f: { id: "autres", fr: "Autres projets", en: "Other projects" }, ps: rest });
      ixv = "mini"; try { if (localStorage.getItem("sd-ixv") === "flat") ixv = "flat"; } catch (e) {}
      var card = function (slug, fid, extra) {
        var s = secOf[slug], j = seenS[s.id] ? 1 : 0; seenS[s.id] = 1; n++; var c = cover(slug);
        return '<a class="ix-c fig' + (extra || "") + '"' + (j === 0 ? ' id="ix-' + s.id + '"' : "") + ' data-f="' + fid + '" href="' + href(slug) + '"><div class="ix-im"><img loading="lazy" decoding="async" draggable="false" alt="' + esc(pTitle(slug)) + '" src="' + esc(src(c, true)) + '"></div>' +
          '<div class="ix-tx"><span class="ix-sec">' + esc(L(s)) + '</span><b>' + esc(pTitle(slug)) + (proj(slug).nouveau ? " <i>" + t("isNew") + "</i>" : "") + '</b><span class="ix-n">' + images(slug).length + "</span></div></a>";
      };
      if (ixv === "mini") {
        /* trois colonnes composées pour que les bas s'alignent (3 titres + 5 rangées chacune) */
        var COLS = SITE.compact || [], byId = {}, blk = {};
        fams.forEach(function (F, k) {
          byId[F.f.id] = 1;
          blk[F.f.id] = '<section class="ixm-b" style="order:' + k + '" id="ix-f-' + F.f.id + '"><header class="ixm-h"><h3>' + esc(L(F.f)) + '</h3><i>' + F.ps.length + "</i></header>" +
            '<div class="ixm-g">' + F.ps.map(function (slug) { return card(slug, F.f.id, " mini"); }).join("") + "</div></section>";
        });
        var cols = [[], [], []], rows = [0, 0, 0], done = {};
        COLS.forEach(function (c, ci) { c.forEach(function (id) { if (blk[id] && ci < 3) { cols[ci].push(id); done[id] = 1; rows[ci] += 1 + Math.ceil(fams.filter(function (F) { return F.f.id === id; })[0].ps.length / 3); } }); });
        fams.forEach(function (F) { if (done[F.f.id]) return; var m = rows.indexOf(Math.min.apply(null, rows)); cols[m].push(F.f.id); rows[m] += 1 + Math.ceil(F.ps.length / 3); });
        groups = cols.map(function (c) { return '<div class="ixm-col">' + c.map(function (id) { return blk[id]; }).join("") + "</div>"; });
      } else if (ixv === "flat") {
        /* l'ancien index : tous les projets, les plus beaux d'abord */
        ent.slice().sort(function (a, b) { return rank(a) - rank(b); }).forEach(function (slug) { var f = fams.filter(function (F) { return F.ps.indexOf(slug) >= 0; })[0]; cards.push(card(slug, f ? f.f.id : "autres")); });
      } else if (ixv === "chap") {
        fams.forEach(function (F, k) {
          var cnt = F.ps.length, more = cnt > 5;
          groups.push('<section class="ixc' + (more ? "" : " open") + (cnt === 1 ? " solo" : cnt <= 3 ? " few" : "") + '" id="ix-f-' + F.f.id + '"><header class="ixc-h"><span class="ixc-n">' + pad(k + 1) + '</span><h3>' + esc(L(F.f)) + "</h3>" +
            (F.f.note ? "<p>" + esc(L(F.f.note)) + "</p>" : "") + '<span class="ixc-k">' + cnt + " " + t("projects") + "</span></header>" +
            '<div class="ix-grid">' + F.ps.map(function (slug, q) { return card(slug, F.f.id, (q === 0 ? " lead" : "") + (q >= 5 ? " more" : "")); }).join("") + "</div>" +
            (more ? '<button type="button" class="ixc-more" aria-expanded="false"><span class="o">' + (lang === "fr" ? "Voir les " + cnt + " projets" : "See all " + cnt + " projects") + '</span><span class="c">' + (lang === "fr" ? "Réduire" : "Show less") + "</span><i aria-hidden=\"true\"></i></button>" : "") + "</section>");
        });
      } else {
        fams.forEach(function (F) { F.ps.forEach(function (slug) { cards.push(card(slug, F.f.id)); }); });
      }
    } else {
      /* vidéos rangées par catégorie : un titre, puis une grille propre par groupe */
      var groups = [];
      VSEC.forEach(function (s) {
        var vs = VIDEOS.filter(function (v) { return v.section === s.id && parseVideo(v.lien || ""); }); if (!vs.length) return;
        n += vs.length;
        groups.push('<div class="vg" id="ix-' + s.id + '"><h3 class="vg-h"><span>' + esc(L(s)) + "</span><i>" + vs.length + "</i></h3>" + (s.note ? '<p class="vg-n">' + esc(L(s.note)) + "</p>" : "") + '<div class="ix-grid">' +
          vItems(vs).map(function (it) {
            if (it.pj) {
              var q = parseVideo(it.vs[0].lien);
              return '<a class="ix-c v fig pj" href="' + vpHref(it.pj) + '" data-pmv="' + esc(it.pj) + '"><div class="ix-im"><img loading="lazy" decoding="async" draggable="false" alt="" src="' + esc(q.th2 || q.th) + '"><span class="play">' + t("seeFilms") + "</span></div>" +
                '<div class="ix-tx"><b>' + esc(vpTitle(it.pj)) + '</b><span class="ix-n">' + it.vs.length + " " + (it.vs.some(function (x) { return x.chap || /^films$/.test(x.section); }) ? t("films") : t("videos")) + "</span></div></a>";
            }
            var v = it.v, p = parseVideo(v.lien);
            return '<a class="ix-c v fig" href="#/film/' + s.id + "/" + secLoose(s.id).indexOf(v) + '"><div class="ix-im"><img loading="lazy" decoding="async" draggable="false" alt="" src="' + esc(p.th2 || p.th) + '"><span class="play">' + t("play") + "</span></div>" +
              '<div class="ix-tx"><b>' + esc(L(v.titre)) + "</b></div></a>";
          }).join("") + "</div></div>");
      });
    }
    var sw = "", tabs = "";
    if (mode === "photo") sw = '<div class="ix-sw" role="group" aria-label="' + (lang === "fr" ? "Affichage de l’index" : "Index layout") + '"><i class="ix-sw-p" aria-hidden="true"></i>' +
      '<button type="button" data-v="mini" aria-pressed="' + (ixv === "mini") + '"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="2" width="4.5" height="4.5" rx=".8"/><rect x="7.75" y="2" width="4.5" height="4.5" rx=".8"/><rect x="13.5" y="2" width="4.5" height="4.5" rx=".8"/><rect x="2" y="7.75" width="4.5" height="4.5" rx=".8"/><rect x="7.75" y="7.75" width="4.5" height="4.5" rx=".8"/><rect x="13.5" y="7.75" width="4.5" height="4.5" rx=".8"/><rect x="2" y="13.5" width="4.5" height="4.5" rx=".8"/><rect x="7.75" y="13.5" width="4.5" height="4.5" rx=".8"/><rect x="13.5" y="13.5" width="4.5" height="4.5" rx=".8"/></svg><span>' + (lang === "fr" ? "Catégories" : "Categories") + "</span></button>" +
      '<button type="button" data-v="flat" aria-pressed="' + (ixv === "flat") + '"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="2.5" width="7" height="6" rx="1"/><rect x="11" y="2.5" width="7" height="6" rx="1"/><rect x="2" y="11.5" width="7" height="6" rx="1"/><rect x="11" y="11.5" width="7" height="6" rx="1"/></svg><span>' + "All" + "</span></button></div>";
    if (false) tabs = '<nav class="ixn" aria-label="' + (lang === "fr" ? "Chapitres" : "Chapters") + '">' + fams.map(function (F, k) { return '<a href="#ix-f-' + F.f.id + '" data-ixf="' + F.f.id + '"><span>' + pad(k + 1) + "</span>" + esc(L(F.f)) + "</a>"; }).join("") + "</nav>";
    el.innerHTML = '<h2 class="ix-h"><span class="ix-ht">Index<small>' + n + " " + (mode === "photo" ? t("projects") : t("videos")) + "</small></span>" + sw + "</h2>" + tabs +
      (mode === "photo" ? (ixv === "mini" ? '<div class="ixms">' + groups.join("") + "</div>" : ixv === "chap" ? '<div class="ixcs">' + groups.join("") + "</div>" : '<div class="ix-grid">' + cards.join("") + "</div>") : groups.join(""));
    if (mode === "photo") ixWire(el, ixv);
    el.querySelectorAll(".ix-c[data-pm]").forEach(function (a) { a.addEventListener("click", function () { try { sessionStorage.setItem("sd-pm-" + a.getAttribute("href").split("/").pop(), "photos"); } catch (e) {} }); });
    el.querySelectorAll(".ix-c[data-em]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); openVideo(a.dataset.em, a.dataset.t, a); }); });
    el.querySelectorAll(".ix-c[data-pmv]").forEach(function (a) { a.addEventListener("click", pjVids); });
    if (anim && !reduce && el.animate) el.querySelectorAll(".ix-h, .ix-c").forEach(function (r, i) {
      r.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }], { duration: 800, delay: 100 + Math.min(i, 24) * 30, easing: OUT, fill: "backwards" });
    });
    observe();
  }
  /* index de l'accueil : choix Filtres / Chapitres, filtres par famille, chapitres dépliables */
  function ixWire(el, ixv) {
    el.querySelectorAll(".ixn a").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); var x = document.getElementById("ix-f-" + a.dataset.ixf); if (x) window.scrollTo({ top: x.getBoundingClientRect().top + window.scrollY - 70, behavior: reduce ? "auto" : "smooth" }); }); });
    var swp = el.querySelector(".ix-sw-p");
    function pill() { var b = el.querySelector('.ix-sw [aria-pressed="true"]'); if (b && swp) { swp.style.width = b.offsetWidth + "px"; swp.style.transform = "translateX(" + b.offsetLeft + "px)"; } }
    pill(); setTimeout(pill, 300); if (document.fonts && document.fonts.ready) document.fonts.ready.then(pill);
    el.querySelectorAll(".ix-sw button").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("aria-pressed") === "true") return;
        el.querySelectorAll(".ix-sw button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); pill();
        try { localStorage.setItem("sd-ixv", b.dataset.v); } catch (e) {}
        var y = el.getBoundingClientRect().top;
        var go = function () { indexList(true); var y2 = el.getBoundingClientRect().top; if (Math.abs(y2 - y) > 2) window.scrollBy(0, y2 - y); };
        var body = el.querySelector(".ix-grid, .ixcs, .ixms"), tb = el.querySelector(".ix-tabs");
        if (reduce || !body || !body.animate) return go();
        [body, tb].forEach(function (x) { if (x) x.animate([{ opacity: 1 }, { opacity: 0, transform: "translateY(10px)" }], { duration: 260, easing: "ease-in", fill: "forwards" }); });
        setTimeout(go, 270);
      });
    });
    var tl = el.querySelector(".ix-tl");
    if (tl) {
      var ind = tl.querySelector(".ix-ind"), grid = el.querySelector(".ix-grid"), cur = "all";
      var mark = function (b, inst) {
        tl.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-selected", x === b); });
        ind.style.transition = inst ? "none" : ""; ind.style.width = b.offsetWidth + "px"; ind.style.transform = "translateX(" + b.offsetLeft + "px)";
        if (b.offsetLeft < tl.scrollLeft + 10 || b.offsetLeft + b.offsetWidth > tl.scrollLeft + tl.clientWidth - 10) tl.scrollTo({ left: b.offsetLeft - 20, behavior: inst || reduce ? "auto" : "smooth" });
      };
      var apply = function (f, anim) {
        cur = f; try { sessionStorage.setItem("sd-ixf", f); } catch (e) {}
        var cs = [].slice.call(grid.children), show = cs.filter(function (c) { return f === "all" || c.dataset.f === f; });
        var swap = function () {
          cs.forEach(function (c) { c.hidden = show.indexOf(c) < 0; });
          if (anim && !reduce && grid.animate) {
            grid.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 10, fill: "forwards" });
            show.forEach(function (c, k) { c.animate([{ opacity: 0, transform: "translateY(16px) scale(.985)" }, { opacity: 1, transform: "none" }], { duration: 700, delay: Math.min(k, 12) * 45, easing: OUT, fill: "backwards" }); });
          }
          observe();
        };
        if (anim && !reduce && grid.animate) grid.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: "ease-in", fill: "forwards" }).onfinish = swap; else swap();
      };
      tl.querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { if (b.dataset.f === cur) return; mark(b); apply(b.dataset.f, true); }); });
      var f0 = "all"; try { f0 = sessionStorage.getItem("sd-ixf") || "all"; } catch (e) {}
      var b0 = tl.querySelector('[data-f="' + f0 + '"]') || tl.querySelector('[data-f="all"]');
      requestAnimationFrame(function () { mark(b0, true); }); setTimeout(function () { mark(tl.querySelector('[aria-selected="true"]') || b0, true); }, 350);
      if (b0.dataset.f !== "all") apply(b0.dataset.f, false);
      resizers.push(function () { var b = tl.querySelector('[aria-selected="true"]'); if (b) mark(b, true); pill(); });
      el._ixAll = function () { var b = tl.querySelector('[data-f="all"]'); mark(b, true); apply("all", false); };
    } else el._ixAll = null;
    el.querySelectorAll(".ixc-more").forEach(function (b) {
      b.addEventListener("click", function () {
        var sec = b.closest(".ixc"), op = !sec.classList.contains("open");
        sec.classList.toggle("open", op); b.setAttribute("aria-expanded", op);
        var ms = [].slice.call(sec.querySelectorAll(".ix-c.more"));
        if (op) { observe(); if (!reduce) ms.forEach(function (c, k) { c.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }], { duration: 750, delay: k * 55, easing: OUT, fill: "backwards" }); }); }
        else { var y = sec.getBoundingClientRect().top; if (y < 0) window.scrollTo({ top: y + window.scrollY - 70, behavior: reduce ? "auto" : "smooth" }); }
      });
    });
  }
  function scrollIx(id) {
    var ixe = main.querySelector(".ix"); if (ixe && ixe._ixAll) { var tx = document.getElementById("ix-" + id); if (tx && tx.hidden) ixe._ixAll(); }
    var cx = document.getElementById("ix-" + id); if (cx && cx.classList.contains("more")) { var sc = cx.closest(".ixc"); if (sc && !sc.classList.contains("open")) { var mb = sc.querySelector(".ixc-more"); if (mb) mb.click(); } }
    var x = document.getElementById("ix-" + id);
    if (x) window.scrollTo({ top: x.getBoundingClientRect().top + window.scrollY - 80, behavior: reduce ? "auto" : "smooth" });
  }
  document.addEventListener("mousemove", function (e) {
    if (!pv.classList.contains("on")) return;
    var w = pv.offsetWidth, h = pv.offsetHeight, x = e.clientX + 28, y = e.clientY - h / 2;
    if (x + w > window.innerWidth - 12) x = e.clientX - w - 28;
    y = Math.max(12, Math.min(window.innerHeight - h - 12, y));
    pv.style.transform = "translate(" + x + "px," + y + "px)";
  }, { passive: true });

  function pvAttr(slug) { var c = cover(slug); return ' data-pv="' + esc(src(c, true)) + '" data-ar="' + (c.w / c.h).toFixed(3) + '"'; }
  /* projets dont les vidéos ont une page dédiée : une seule carte qui ouvre le projet sur ses vidéos */
  var VPAGES = window.VIDEO_PAGES || [], VPROJ = window.VIDEO_PROJETS || {};
  function vpHref(pj) { return proj(pj) ? href(pj) : "#/film/" + pj; }
  function vpTitle(pj) { return proj(pj) ? pTitle(pj) : L(VPROJ[pj]); }
  function vItems(vs) {
    var seen = {}, out = [];
    vs.forEach(function (v) {
      var pj = v.projet;
      if (pj && VPAGES.indexOf(pj) >= 0 && (proj(pj) || VPROJ[pj])) { if (seen[pj]) { seen[pj].vs.push(v); return; } seen[pj] = { pj: pj, vs: [v] }; out.push(seen[pj]); }
      else out.push({ v: v });
    });
    return out;
  }
  function pjVids(e) { var a = e.currentTarget; try { sessionStorage.setItem("sd-pm1-" + a.dataset.pmv, "videos"); } catch (x) {} }
  function vThumb(secId) { var v = VIDEOS.filter(function (x) { return x.section === secId && parseVideo(x.lien || ""); })[0], q = v && parseVideo(v.lien); return q ? ' data-pv="' + esc(q.th2 || q.th) + '" data-ar="' + (q.file ? "0.5625" : "1.778") + '"' : ""; }
  /* index complet, dans le style de l'index de l'accueil : des cartes rangées par catégorie */
  function mapCards() {
    function card(o) {
      return '<a class="ix-c' + (o.v ? " v" : "") + '" href="' + o.href + '"' + (o.pmv ? ' data-pmv="' + esc(o.pmv) + '"' : "") + (o.em ? ' data-em="' + esc(o.em) + '" data-t="' + esc(o.t) + '"' : "") + '><div class="ix-im"><img loading="lazy" decoding="async" draggable="false" alt="" src="' + esc(o.img) + '">' + (o.v ? '<span class="play">' + (o.pmv ? t("seeFilms") : t("play")) + "</span>" : "") + "</div>" +
        '<div class="ix-tx"><b>' + esc(o.t) + (o.nw ? " <i>" + t("isNew") + "</i>" : "") + '</b><span class="ix-n">' + o.n + "</span></div></a>";
    }
    function cat(name, n, cards, ks) { return '<div class="xc"' + (ks ? ' data-s="' + esc(ks) + '"' : "") + '><h4 class="xc-h"><span>' + esc(name) + "</span><i>" + n + '</i></h4><div class="xc-g">' + cards.join("") + "</div></div>"; }
    var out = '<div class="xi">', tot = 0;
    /* grandes catégories : chaque section de photos est rangée dans l'une d'elles (les nouvelles sections vont dans « Marques et entreprises ») */
    var CATS = [
      { fr: "Nature et voyage", en: "Nature and travel", ids: ["voyage", "paysage", "vert-nature", "drone"] },
      { fr: "Portrait et reportage", en: "Portrait and documentary", ids: ["portrait", "konekte", "melbees", "associations"] },
      { fr: "Coulisses de tournage", en: "Behind the scenes", ids: ["coulisses"] },
      { fr: "Marques et entreprises", en: "Brands and companies", ids: [] },
      { fr: "Immobilier", en: "Real estate", ids: ["immobilier"] }
    ], other = CATS[3];
    CATS.forEach(function (c) { c.ps = []; });
    SITE.sections.forEach(function (s) {
      var c = CATS.filter(function (x) { return x.ids.indexOf(s.id) >= 0; })[0] || other;
      s.projets.forEach(function (p) { if (proj(p) && images(p).length) c.ps.push(p); });
    });
    CATS.forEach(function (c) { c.ps.sort(function (a, b) { return rank(a) - rank(b); }); });
    var ph = CATS.filter(function (c) { return c.ps.length; }).sort(function (a, b) { return rank(a.ps[0]) - rank(b.ps[0]); }).map(function (c) {
      tot += c.ps.length;
      var ks = c.ps.map(function (p) { var s = sectionOf(p); return s ? s.id : ""; }).join(" ");
      return cat(L(c), c.ps.length, c.ps.map(function (p) { return card({ href: href(p), img: src(cover(p), true), t: pTitle(p), n: images(p).length, nw: proj(p).nouveau }); }), ks);
    }).join("");
    out += '<section class="xb"><h3 class="xb-h"><a href="#/photographie">' + t("photo") + "</a><sup>" + tot + "</sup></h3>" + ph + "</section>";
    var vt = 0, vd = VSEC.map(function (s) {
      var vs = VIDEOS.filter(function (v) { return v.section === s.id && parseVideo(v.lien || ""); }); if (!vs.length) return "";
      vt += vs.length;
      return cat(L(s), vs.length, vItems(vs).map(function (it) {
        if (it.pj) { var q0 = parseVideo(it.vs[0].lien); return card({ v: 1, pmv: it.pj, href: vpHref(it.pj), img: q0.th2 || q0.th, t: vpTitle(it.pj), n: it.vs.length + " " + (it.vs.some(function (x) { return x.chap || x.section === "films"; }) ? t("films") : t("videos")) }); }
        var q = parseVideo(it.v.lien); return card({ v: 1, href: "#/film/" + s.id + "/" + secLoose(s.id).indexOf(it.v), img: q.th2 || q.th, t: L(it.v.titre), n: "" });
      }));
    }).join("");
    out += '<section class="xb"><h3 class="xb-h"><a href="#/video">' + t("video") + "</a><sup>" + vt + "</sup></h3>" + vd + "</section>";
    if (images("etalonnage").length) out += '<section class="xb"><h3 class="xb-h"><a href="#/etalonnage">' + t("grade") + "</a></h3>" + cat("DaVinci Resolve", 1, [card({ href: "#/etalonnage", img: src(cover("etalonnage"), true), t: "Node DRT", n: images("etalonnage").length })]) + "</section>";
    return out + "</div>";
  }
  function mapHTML() {
    return '<div class="map grid">' + '<div class="mcol"><h3><a href="#/photographie">' + t("photo") + "</a></h3>" + SITE.sections.map(function (s) {
      var ps = s.projets.filter(function (p) { return proj(p) && images(p).length; });
      if (!ps.length) return "";
      var single = ps.length === 1 && pTitle(ps[0]) === L(s);
      if (single) return '<div class="mg one"><a href="' + href(ps[0]) + '"' + pvAttr(ps[0]) + '>' + esc(L(s)) + "</a><span>" + images(ps[0]).length + "</span></div>";
      return '<div class="mg"><h4>' + esc(L(s)) + "</h4><ul>" + ps.map(function (p) { return '<li><a href="' + href(p) + '"' + pvAttr(p) + '>' + esc(pTitle(p)) + (proj(p).nouveau ? ' <i>' + t("isNew") + "</i>" : "") + "</a><span>" + images(p).length + "</span></li>"; }).join("") + "</ul></div>";
    }).join("") + "</div>" +
      '<div class="mcol"><h3><a href="#/video">' + t("video") + "</a></h3>" + VSEC.filter(function (v) { return VIDEOS.some(function (x) { return x.section === v.id; }); }).map(function (v) {
        return '<div class="mg one"><a href="#/video/' + v.id + '"' + vThumb(v.id) + '>' + esc(L(v)) + "</a><span>" + VIDEOS.filter(function (x) { return x.section === v.id; }).length + "</span></div>";
      }).join("") + '<h3 class="h3b">' + t("grade") + '</h3><div class="mg one"><a href="#/etalonnage"' + pvAttr("etalonnage") + '>Node DRT</a><span>' + images("etalonnage").length + "</span></div></div></div>";
  }

  /* ---------- projet ---------- */
  function projet(slug) {
    var p = proj(slug); if (!p || !images(slug).length) return notFound();
    /* vidéos liées au projet : celles de la section vidéo du même nom, ou avec projet: "<slug>" */
    var pvids = (window.VIDEOS || []).filter(function (v) { return (v.projet === slug || v.section === slug) && parseVideo(v.lien || ""); });
    var list = images(slug), s = sectionOf(slug), all = allProjects(), k = all.indexOf(slug), nx = all[(k + 1) % all.length];
    var pr = all[(k - 1 + all.length) % all.length];
    if (slug === "etalonnage") { nx = all[0]; pr = all[all.length - 1]; }
    var sn = s ? L(s) : t("grade");
    var backBtn = '<a class="back xs" href="' + esc(ret ? ret.h : "#/") + '" data-back><span aria-hidden="true">←</span> ' + t("backHome") + "</a>";
    main.innerHTML = '<section class="ph grid"><div class="meta xs"><span class="mt-l">' + backBtn + '<span class="u msec">' + esc(sn) + "</span></span><span>" + (k >= 0 ? '<span class="mt-k">' + pad(k + 1) + " / " + pad(all.length) + ", </span>" : "") + list.length + " " + t("images") + '</span></div><h1><span class="roll"></span></h1>' +
      (slug === "etalonnage" ? '<p class="lead rl">' + esc(lang === "fr" ? "Images étalonnées avec Node DRT, mon plugin d’étalonnage pour DaVinci Resolve." : "Frames graded with Node DRT, my grading plugin for DaVinci Resolve.") + "</p>" : "") +
      (pvids.length ? '<div class="pm" role="tablist"><button type="button" role="tab" data-m="photos">' + t("photo") + "<sup>" + list.length + '</sup></button><button type="button" role="tab" data-m="videos">' + t("video") + "<sup>" + pvids.length + "</sup></button></div>" : "") +
      '<div class="vue xs" role="tablist"><button type="button" role="tab" data-v="grille">' + t("vGrid") + '</button><button type="button" role="tab" data-v="expo">' + t("vExpo") + '</button><span class="zw"><label class="zm" title="' + t("size") + '"><span class="zm-m" aria-hidden="true">−</span><input type="range" min="0.55" max="1.6" step="0.01" value="' + zoom + '" aria-label="' + t("size") + '"><span class="zm-p" aria-hidden="true">+</span></label><button type="button" class="zm-r"' + (Math.abs(zoom - 1) < 0.005 ? " data-z1" : "") + '>' + t("reset") + '</button></span></div>' +
      pnav(pr, nx, false) + "</section>" +
      '<section class="gal"><div class="vue-f xs" role="tablist"><button type="button" role="tab" data-v="grille">' + t("vGrid") + '</button><button type="button" role="tab" data-v="expo">' + t("vExpo") + '</button><span class="zw"><label class="zm" title="' + t("size") + '"><span class="zm-m" aria-hidden="true">−</span><input type="range" min="0.55" max="1.6" step="0.01" value="' + zoom + '" aria-label="' + t("size") + '"><span class="zm-p" aria-hidden="true">+</span></label><button type="button" class="zm-r"' + (Math.abs(zoom - 1) < 0.005 ? " data-z1" : "") + '>' + t("reset") + '</button></span></div><div class="jw" id="jg"></div></section>' +
      '<section class="s-end grid"><p class="q"><span>' + t("similar") + '</span><a class="u" href="mailto:' + MAIL + '">' + t("email") + "</a>" +
      (slug === "etalonnage" ? '<a class="u" href="https://nodedrt.github.io/NodeDRT/" target="_blank" rel="noopener">Node DRT →</a>' : "") + "</p>" +
      pnav(pr, nx, true) + "</section>";
    roll(main.querySelector(".ph h1 .roll"), L(p.titre), 1);
    /* titre long : il se réduit juste ce qu'il faut pour ne jamais toucher Grille / Exposition */
    function fitTitle() {
      var h = main.querySelector(".ph h1"), v = main.querySelector(".ph .vue"); if (!h) return;
      h.style.fontSize = "";
      var rw = h.querySelector(".rw") || h, w = rw.getBoundingClientRect().width;
      var avail = (!v || window.innerWidth < 1000) ? (main.querySelector(".ph").clientWidth - 2 * (parseFloat(getComputedStyle(main.querySelector(".ph")).paddingLeft) || 14) - 8) : 2 * (v.getBoundingClientRect().left - window.innerWidth / 2) - 48;
      if (w > avail && avail > 0) h.style.fontSize = Math.max(window.innerWidth < 600 ? 18 : 26, parseFloat(getComputedStyle(h).fontSize) * avail / w) + "px";
    }
    fitTitle(); resizers.push(fitTitle); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitle);
    var bb = main.querySelector("[data-back]");
    if (bb) bb.addEventListener("click", function (e) {
      e.preventDefault(); var h = ret ? ret.h : "#/";
      if (location.hash === h) render(); else location.hash = h;
    });
    curPrevNext = [href(pr), href(nx)];
    var el = document.getElementById("jg");
    var opt = { target: function (vw) { return (vw < 600 ? 240 : vw < 1100 ? 280 : Math.min(500, vw * 0.3)) * zoom; } }, pos = {};
    list.forEach(function (q, i) { pos[q.n] = i; });
    if (p.lignes) {
      var vu = {};
      opt.rows = p.lignes.map(function (r) { return r.map(function (n) { vu[pos[n]] = 1; return pos[n]; }).filter(function (x) { return x != null; }); });
      list.forEach(function (q, i) { if (!vu[i]) opt.rows.push([i]); });
      opt.egal = !!p.egal;
    }
    if (p.coupure) { opt.breaks = {}; p.coupure.forEach(function (n) { if (pos[n] != null) opt.breaks[pos[n]] = 1; }); }
    var items = list.map(function (q, i) { return { p: q, i: i, alt: L(p.titre) + ", " + (lang === "fr" ? "photo " + (i + 1) + ", Samuel Drouin, photographe île Maurice" : "photo " + (i + 1) + ", Samuel Drouin, Mauritius photographer") }; });
    var kind = (slug === "etalonnage" || (s && ["voyage", "paysage", "portrait", "vert-nature", "drone"].indexOf(s.id) >= 0)) ? "cadre" : "edito";
    var gal = el.parentNode;
    var pmode = "photos";
    /* film d'ambiance : grand, plein cadre, lecture automatique en boucle, sans clic (vertical sur téléphone tenu droit) */
    var amb = pvids.filter(function (v) { return v.ambiance; })[0], ambIO = null;
    function ambSrc() { return amb.vertical && window.innerWidth < 900 && window.innerHeight > window.innerWidth ? amb.vertical : amb.lien; }
    function ambHTML() {
      var s = ambSrc(), vert = s === amb.vertical || amb.format === "v", poster = s.replace(/\.mp4$/, ".jpg");
      return '<div class="amb' + (vert ? " v" : "") + (amb.format === "v" ? " vf" : "") + '" style="--poster:url(\'' + esc(new URL(poster, location.href).href) + '\')"><video muted autoplay loop playsinline preload="auto" disablepictureinpicture poster="' + esc(poster) + '" src="' + esc(s) + '"></video>' +
        '<button type="button" class="amb-p" hidden aria-label="' + t("play") + '">' + t("play") + "</button>" +
        (amb.format === "v" ? '<button type="button" class="amb-s" aria-pressed="false">' + t("soundOn") + "</button>" : "") + "</div>";
    }
    function ambStart() {
      var box = el.querySelector(".amb"); if (!box) return;
      var v = box.querySelector("video"), b = box.querySelector(".amb-p");
      v.muted = true; v.defaultMuted = true;
      var go = function () { var pr = v.play(); if (pr && pr.catch) pr.catch(function () { b.hidden = false; }); };
      b.onclick = function () { b.hidden = true; go(); };
      var sb = box.querySelector(".amb-s");
      if (sb) sb.onclick = function () { v.muted = !v.muted; sb.textContent = v.muted ? t("soundOn") : t("soundOff"); sb.setAttribute("aria-pressed", !v.muted); if (!v.muted) go(); };
      v.addEventListener("playing", function () { b.hidden = true; });
      if (ambIO) ambIO.disconnect();
      if ("IntersectionObserver" in window) {
        ambIO = new IntersectionObserver(function (es) { if (!v.isConnected) { ambIO.disconnect(); return; } if (es[0].isIntersecting) go(); else v.pause(); }, { threshold: 0.15 });
        ambIO.observe(v);
      } else go();
    }
    /* page vidéo dédiée : le lecteur de cinéma (voir cineMount) */
    var CH = VPAGES.indexOf(slug) >= 0 ? cineList(pvids) : [];
    if (!CH.length) CH = []; else amb = null;
    function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
    function drawVids() {
      gal.classList.remove("ex", "ex-cadre", "ex-edito");
      if (CH.length) {
        var oth = pvids.filter(function (v) { return CH.indexOf(v) < 0; });
        cineMount(el, CH, L(p.titre), oth.length ? '<h3 class="pv-h">' + t("others") + '</h3><div class="pvg">' + oth.map(function (v) {
          var k = pvids.indexOf(v), q = parseVideo(v.lien);
          return '<button type="button" class="pv-t fig" data-vk="' + k + '"><div class="mask"><img loading="lazy" alt="" draggable="false" src="' + esc(q.th) + '"><span class="play">' + t("play") + "</span></div><span class=\"pv-n\">" + esc(cap(L(v.titre).replace(L(p.titre) + ", ", ""))) + "</span></button>";
        }).join("") + "</div>" : "");
        observe(); return;
      }
      var rest = pvids.filter(function (v) { return !v.ambiance; });
      el.innerHTML = (amb ? ambHTML() : "") + (rest.length ? '<div class="pvg">' + rest.map(function (v) {
        var k = pvids.indexOf(v);
        var q = parseVideo(v.lien);
        return '<button type="button" class="pv-t fig' + (q.file && v.format !== "h" ? " vert" : "") + '" data-vk="' + k + '"><div class="mask"><img loading="lazy" alt="" draggable="false" src="' + esc(q.th) + '"><span class="play">' + t("play") + "</span></div><span class=\"pv-n\">" + esc(L(v.titre).replace(L(p.titre) + ", ", "")) + "</span></button>";
      }).join("") + "</div>" : "");
      observe(); if (amb) ambStart();
    }
    function drawG() {
      main.querySelector(".vue").style.visibility = pmode === "videos" ? "hidden" : "";
      var vf = main.querySelector(".vue-f"); if (vf) vf.hidden = pmode === "videos";
      if (pmode === "videos") { drawVids(); return; }
      gal.classList.toggle("ex", vue === "expo"); gal.classList.toggle("ex-cadre", vue === "expo" && kind === "cadre"); gal.classList.toggle("ex-edito", vue === "expo" && kind === "edito");
      /* zoom différent de 1 : rangées recalculées (même ordre), sinon les rangées choisies à la main */
      var o2 = opt; if ((Math.abs(zoom - 1) > 0.02 || window.innerWidth < 600) && opt.rows) { o2 = {}; for (var kk in opt) o2[kk] = opt[kk]; delete o2.rows; delete o2.egal; }
      if (vue === "expo") expo(el, items, kind, L(p.titre), "black"); else justify(el, items, o2);
    }
    function setVue(v, anim) {
      vue = v; try { sessionStorage.setItem("sd-vue", v); } catch (e) {}
      main.querySelectorAll(".vue [data-v], .vue-f [data-v]").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.v === v); });
      if (anim && !reduce && el.animate) {
        var o = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: "ease-in", fill: "forwards" });
        o.onfinish = function () { drawG(); o.cancel(); el.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], { duration: 700, easing: OUT }); };
      } else drawG();
    }
    main.querySelectorAll(".vue [data-v], .vue-f [data-v]").forEach(function (b) { b.addEventListener("click", function () {
      if (vue === b.dataset.v) return;
      var inGal = b.closest(".vue-f"), top = gal.getBoundingClientRect().top + scrollY - 80;
      setVue(b.dataset.v, true);
      if (inGal && scrollY > top) setTimeout(function () { window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" }); }, 240);
    }); });
    /* la bascule flottante n'apparaît qu'une fois celle du titre sortie de l'écran */
    var vfEl = main.querySelector(".vue-f"), vTop = main.querySelector(".vue");
    if (vfEl && vTop && "IntersectionObserver" in window) {
      var vio = new IntersectionObserver(function (es) { vfEl.classList.toggle("on", !es[0].isIntersecting); });
      vio.observe(vTop);
    }
    setVue(vue, false); resizers.push(drawG);
    var zr = 0, zt = 0, zLast = zoom;
    /* zoom en temps réel : on recalcule la mise en page en gardant les mêmes images (pas de rechargement, pas de clignotement),
       et la photo au centre de l'écran reste au centre */
    function liveZoom() {
      zr = 0;
      gal.classList.add("live"); clearTimeout(zt); zt = setTimeout(function () { gal.classList.remove("live"); }, 400);
      var mid = window.innerHeight / 2, anchor = null, off = 0;
      el.querySelectorAll("[data-i]").forEach(function (b) { if (anchor) return; var r = b.getBoundingClientRect(); if (r.bottom > mid) { anchor = b.dataset.i; off = (mid - r.top) / Math.max(1, r.height); } });
      var keep = {};
      el.querySelectorAll("[data-i]").forEach(function (b) { var im = b.querySelector("img"); if (im) keep[b.dataset.i] = im; });
      /* pendant qu'on glisse, le curseur reste exactement sous le doigt / la souris (la page ne saute pas) */
      var zin = zDrag && zActive && zActive.isConnected ? zActive : null, zy0 = zin ? zin.getBoundingClientRect().top : 0;
      if (zin) anchor = null;
      drawG();
      el.querySelectorAll("[data-i]").forEach(function (b) {
        b.classList.add("in");
        var o = keep[b.dataset.i], n = b.querySelector("img");
        if (o && n && o !== n) { o.removeAttribute("sizes"); n.replaceWith(o); }
      });
      if (zin) { var dz = zin.getBoundingClientRect().top - zy0; if (Math.abs(dz) > 0.5) window.scrollBy(0, dz); }
      if (anchor != null) { var nb = el.querySelector('[data-i="' + anchor + '"]'); if (nb) { var r2 = nb.getBoundingClientRect(); window.scrollBy(0, r2.top + off * r2.height - mid); } }
    }
    /* changement de taille : les photos ne bougent jamais à l'écran.
       La galerie s'efface en douceur, se réorganise pendant qu'elle est invisible,
       puis réapparaît en fondu à sa nouvelle place quand on arrête de bouger le curseur. */
    var zfOut = null, zfIn = null, zfT = 0, zfR = 0, zfHidden = false;
    var zDrag = false, zActive = null;
    function zfCancel() {
      clearTimeout(zfT); if (zfR) { cancelAnimationFrame(zfR); zfR = 0; }
      if (zfOut) { zfOut.onfinish = null; zfOut.cancel(); zfOut = null; }
      if (zfIn) { zfIn.cancel(); zfIn = null; }
      zfHidden = false; el.style.opacity = "";
    }
    main.querySelectorAll(".zm input").forEach(function (inp) {
      inp.addEventListener("pointerdown", function () { zDrag = true; zActive = inp; zfCancel(); });
      inp.addEventListener("touchstart", function () { zDrag = true; zActive = inp; zfCancel(); }, { passive: true });
    });
    ["pointerup", "pointercancel", "touchend", "touchcancel"].forEach(function (n) { window.addEventListener(n, function () { if (zDrag) { zDrag = false; zLast = zoom; } }, { passive: true }); });
    function zoomFade() {
      if (reduce || !el.animate) { liveZoom(); return; }
      if (zfIn) { zfIn.cancel(); zfIn = null; }
      if (!zfHidden) {
        zfHidden = true;
        zfOut = el.animate([{ opacity: getComputedStyle(el).opacity }, { opacity: 0 }], { duration: 520, easing: "cubic-bezier(.45,0,.55,1)", fill: "forwards" });
      }
      if (!zfR) zfR = requestAnimationFrame(function () { zfR = 0; if (zfOut && zfOut.playState === "finished") liveZoom(); });
      clearTimeout(zfT);
      zfT = setTimeout(function () {
        var show = function () {
          liveZoom();
          if (zfOut) { zfOut.cancel(); zfOut = null; }
          var soft = window.matchMedia && matchMedia("(hover: hover)").matches;
          zfIn = el.animate(soft ? [{ opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0)" }] : [{ opacity: 0 }, { opacity: 1 }], { duration: 1100, easing: "cubic-bezier(.25,.1,.25,1)" });
          zfIn.onfinish = function () { zfIn = null; };
          zfHidden = false;
        };
        if (zfOut && zfOut.playState !== "finished") zfOut.onfinish = show; else show();
      }, 380);
    }
    main.querySelectorAll(".zm input").forEach(function (inp) {
      inp.addEventListener("input", function () {
        zoom = +inp.value; try { sessionStorage.setItem("sd-zoom", zoom); } catch (e) {}
        main.querySelectorAll(".zm input").forEach(function (o) { if (o !== inp) o.value = zoom; });
        /* on glisse le curseur : les photos suivent en temps réel, comme avant ;
           un saut (clic sur −, +, Réinitialiser ou sur la barre) : fondu doux */
        /* on glisse (souris ou doigt) : toujours en direct, une seule mise en page par image affichée ;
           un saut (−, +, Réinitialiser, clic sur la barre) : fondu doux */
        var jump = !zDrag && Math.abs(zoom - zLast) > 0.12; zLast = zoom;
        if (jump) zoomFade();
        else { zfCancel(); if (!zr) zr = requestAnimationFrame(liveZoom); }
      });
      inp.addEventListener("dblclick", function () { inp.value = 1; inp.dispatchEvent(new Event("input")); });
    });
    function zr1() { main.querySelectorAll(".zm-r").forEach(function (r) { r.toggleAttribute("data-z1", Math.abs(zoom - 1) < 0.005); }); }
    main.querySelectorAll(".zm input").forEach(function (inp) { inp.addEventListener("input", zr1); });
    /* − : la plus petite taille d'un coup, + : la plus grande */
    main.querySelectorAll(".zm-m, .zm-p").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        var inp = main.querySelector(".zm input"); inp.value = b.classList.contains("zm-p") ? inp.max : inp.min; inp.dispatchEvent(new Event("input"));
      });
    });
    main.querySelectorAll(".zm-r").forEach(function (r) { r.addEventListener("click", function () { var inp = main.querySelector(".zm input"); inp.value = 1; inp.dispatchEvent(new Event("input")); }); });
    el.addEventListener("click", function (e) {
      var v = e.target.closest("[data-vk]");
      if (v) { var vv = pvids[+v.dataset.vk]; openVideo(parseVideo(vv.lien).em, L(vv.titre), v); return; }
      var b = e.target.closest("[data-i]"); if (b) openLB(list, +b.dataset.i, b, L(p.titre));
    });
    function setPm(m, anim) {
      pmode = m; try { sessionStorage.setItem("sd-pm-" + slug, m); } catch (e) {}
      main.querySelectorAll(".pm [data-m]").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.m === m); });
      if (anim && !reduce && el.animate) {
        var o = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: "ease-in", fill: "forwards" });
        o.onfinish = function () { drawG(); o.cancel(); el.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], { duration: 700, easing: OUT }); };
      } else drawG();
    }
    main.querySelectorAll(".pm [data-m]").forEach(function (b) { b.addEventListener("click", function () { if (pmode !== b.dataset.m) setPm(b.dataset.m, true); }); });
    var pm0 = "photos", jumpV = false; try { jumpV = !!sessionStorage.getItem("sd-pm1-" + slug); pm0 = sessionStorage.getItem("sd-pm1-" + slug) || "photos"; /* on revient toujours sur les photos, sauf si on vient d'un lien vidéo */ sessionStorage.removeItem("sd-pm1-" + slug); } catch (e) {}
    if (pvids.length) setPm(pm0 === "videos" ? "videos" : "photos", false);
    /* arrivée depuis la page Vidéo sur téléphone : on descend jusqu'au lecteur */
    if (jumpV && window.innerWidth < 900) setTimeout(function () { var c = el.querySelector(".cine"); if (c && c.isConnected) c.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }, 450);
  }

  /* ---------- vidéo ---------- */
  /* lecteur : un fichier vidéo du site (.mp4) se lit directement, le reste dans une iframe */
  function player(em, title) {
    if (/\.(mp4|webm|m4v)(\?|$)/i.test(em)) return '<video src="' + esc(em) + '" autoplay controls playsinline preload="auto" title="' + esc(title) + '"></video>';
    return '<iframe src="' + esc(em) + '" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen title="' + esc(title) + '"></iframe>';
  }
  function parseVideo(u) {
    var m;
    if (/\.(mp4|webm|m4v)(\?|$)/i.test(u)) { var th = u.replace(/\.(mp4|webm|m4v)(\?.*)?$/i, ".jpg"); return { th: th, th2: th, em: u, file: true }; }
    if ((m = u.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/))) return { th: "https://i.ytimg.com/vi/" + m[1] + "/maxresdefault.jpg", th2: "https://i.ytimg.com/vi/" + m[1] + "/hqdefault.jpg", em: "https://www.youtube-nocookie.com/embed/" + m[1] + "?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd2160" };
    if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return { th: "https://vumbnail.com/" + m[1] + ".jpg", em: "https://player.vimeo.com/video/" + m[1] + "?autoplay=1&dnt=1&quality=auto" };
    if ((m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/))) return { th: "https://drive.google.com/thumbnail?id=" + m[1] + "&sz=w1600", em: "https://drive.google.com/file/d/" + m[1] + "/preview" };
    return null;
  }

  /* ---------- lecteur de cinéma ----------
     fichiers verticaux : un film en chapitres, son actif de base, lecture enchaînée
     liens YouTube / Drive : la vidéo s'ouvre dans le grand cadre, la liste à côté */
  function cFmt(s) { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); }
  function cCap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function cAbs(u) { return new URL(u, location.href).href; }
  function cineList(list) {
    var f = list.filter(function (v) { var q = parseVideo(v.lien); return q && q.file && v.format === "v"; });
    return f.length > 1 ? f : list.filter(function (v) { return parseVideo(v.lien || ""); });
  }
  var cineOff = null;
  function cineMount(host, CH, title, after, start) {
    if (cineOff) { cineOff(); cineOff = null; }
    var emb = !CH.every(function (v) { var q = parseVideo(v.lien); return q.file; });
    var isFilm = CH.some(function (v) { return v.chap; }), tot = CH.reduce(function (a, v) { return a + (v.duree || 0); }, 0);
    function nm(v) { if (v.chap) return L(v.chap); var s = L(v.titre), r = s.replace(title + ", ", ""); if (r === s) return s; return /^[IVX]+$/.test(r) ? (lang === "fr" ? "Partie " : "Part ") + r : cCap(r); }
    function th(v) { var q = parseVideo(v.lien); return q.file ? q.th : (q.th2 || q.th); }
    var p0 = th(CH[0]), cnt = CH.length + " " + (isFilm ? t("chapters") : CH.length > 1 ? t("videos") : t("video").toLowerCase()) + (tot && !emb ? ", " + cFmt(tot) : "");
    var hz = !emb && CH.every(function (v) { return v.format === "h"; });
    host.innerHTML = '<div class="cine' + (emb ? " emb" : "") + (hz ? " hz" : "") + '" data-st="play" tabindex="-1">' +
      '<div class="cn-stage"><div class="cn-bg" style="background-image:url(\'' + esc(cAbs(p0)) + '\')"></div>' +
      '<div class="cn-frame">' + (emb ? "" : '<video playsinline preload="auto" disablepictureinpicture poster="' + esc(p0) + '"></video>' +
        '<button type="button" class="cn-go"><span class="cn-pi"></span><span class="cn-gl"></span><small></small></button>' +
        '<div class="cn-ui"><div class="cn-bar" role="slider" aria-label="' + t("video") + '"><i></i></div><div class="cn-row"><button type="button" class="cn-pp" aria-label="Pause"></button><span class="cn-t">0:00</span><span class="cn-sp"></span>' +
        '<button type="button" class="cn-pv" aria-label="' + t("prevCh") + '">&#8592;</button><button type="button" class="cn-nx" aria-label="' + t("nextCh") + '">&#8594;</button><button type="button" class="cn-snd"></button><button type="button" class="cn-fs">' + t("full") + "</button></div></div>") +
      "</div></div>" +
      '<aside class="cn-side"><p class="cn-h">' + esc(title) + "<small>" + cnt + '</small></p><ol class="cn-list">' + CH.map(function (v, i) {
        return '<li><button type="button" data-c="' + i + '"' + (i === 0 ? ' aria-current="true"' : "") + '><span class="cn-th"><img alt="" loading="lazy" draggable="false" src="' + esc(th(v)) + '"></span><span class="cn-tx"><b>' + esc(nm(v)) + "</b>" + (v.duree ? "<small>" + cFmt(v.duree) + "</small>" : "") + '</span><i class="cn-pr"><u></u></i></button></li>';
      }).join("") + "</ol></aside></div>" + (after || "");
    var box = host.querySelector(".cine"), fr = box.querySelector(".cn-frame"), bg = box.querySelector(".cn-bg"),
      ol = box.querySelector(".cn-list"), items = box.querySelectorAll(".cn-list button"), cur = 0;
    function mark() {
      items.forEach(function (b, i) { if (i === cur) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
      var li = items[cur].parentNode;
      if (ol.scrollWidth > ol.clientWidth + 4) ol.scrollTo({ left: li.offsetLeft - 14, behavior: reduce ? "auto" : "smooth" });
    }
    function setBg(v) { bg.style.backgroundImage = "url('" + cAbs(th(v)) + "')"; }

    /* ---- vidéos intégrées (YouTube, Drive) ---- */
    if (emb) {
      var loadE = function (i, auto) {
        cur = (i + CH.length) % CH.length;
        var q = parseVideo(CH[cur].lien), src = q.em;
        /* lecture immédiate : avec le son si la personne a déjà cliqué sur le site, sinon sans le son (seule façon autorisée) */
        var act = navigator.userActivation ? navigator.userActivation.hasBeenActive : !!auto;
        if (q.file) {
          fr.innerHTML = '<video src="' + esc(src) + '" controls autoplay playsinline preload="auto" poster="' + esc(q.th) + '"></video>';
          var fv = fr.querySelector("video"); fv.muted = !act;
          var pr = fv.play(); if (pr && pr.catch) pr.catch(function () { if (!fv.muted) { fv.muted = true; fv.play().catch(function () {}); } });
          fv.addEventListener("ended", function () { if (cur < CH.length - 1) loadE(cur + 1, true); });
        } else {
          if (!act && /youtube/.test(src)) src += "&mute=1";
          if (!act && /vimeo/.test(src)) src += "&muted=1";
          fr.innerHTML = '<iframe src="' + esc(src) + '" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen title="' + esc(nm(CH[cur])) + '"></iframe>';
        }
        setBg(CH[cur]); mark();
      };
      items.forEach(function (b) { b.addEventListener("click", function () { loadE(+b.dataset.c, true); }); });
      loadE(start || 0, false);
      return;
    }

    /* ---- film en fichiers : son actif de base ---- */
    var v = box.querySelector("video"), go = box.querySelector(".cn-go"), gl = box.querySelector(".cn-gl"), gs = go.querySelector("small"),
      bar = box.querySelector(".cn-bar"), bi = bar.querySelector("i"), tt = box.querySelector(".cn-t"), snd = box.querySelector(".cn-snd");
    var idleT = 0, seeking = false, fadeT = 0, wasOn = true;
    function sndLbl() { snd.textContent = v.muted ? t("soundOn") : t("soundOff"); box.classList.toggle("mut", v.muted && box.dataset.st === "play"); }
    function st(s) {
      box.dataset.st = s;
      gl.textContent = s === "pause" ? t("resume") : s === "end" ? (isFilm ? t("replay") : t("replayAll")) : t("soundOn");
      gs.textContent = s === "end" ? cFmt(tot) : "";
      sndLbl();
    }
    function fadeIn() {
      clearInterval(fadeT); if (v.muted) return;
      var k = 0; v.volume = 0.05;
      fadeT = setInterval(function () { k++; v.volume = Math.min(1, 0.05 + k * 0.06); if (v.volume >= 1) clearInterval(fadeT); }, 60);
    }
    function tryPlay() {
      var pr = v.play();
      if (pr && pr.then) pr.then(function () { sndLbl(); }, function () {
        /* le navigateur refuse le son sans clic : on lance sans le son, et le son revient au premier geste */
        if (!v.muted) { v.muted = true; sndLbl(); var p2 = v.play(); if (p2 && p2.catch) p2.catch(function () { st("pause"); }); }
        else st("pause");
      });
    }
    function unmute() { if (!v.muted) return; v.muted = false; fadeIn(); sndLbl(); if (v.paused && box.dataset.st === "play") tryPlay(); }
    function upd() {
      var d = v.duration || CH[cur].duree || 1, f = Math.min(1, v.currentTime / d);
      bi.style.transform = "scaleX(" + f + ")";
      tt.textContent = cFmt(v.currentTime) + " / " + cFmt(d);
      items.forEach(function (b, i) { b.querySelector("u").style.transform = "scaleX(" + (i < cur ? 1 : i === cur ? f : 0) + ")"; b.classList.toggle("done", i < cur); });
    }
    function load(i) {
      cur = (i + CH.length) % CH.length;
      var c = CH[cur];
      v.poster = th(c); v.src = c.lien; v.load();
      setBg(c);
      if (!reduce && v.animate) v.animate([{ opacity: 0.1 }, { opacity: 1 }], { duration: 600, easing: OUT });
      st("play"); fadeIn(); tryPlay(); mark(); upd();
    }
    function toggle() {
      if (box.dataset.st === "end") { load(0); return; }
      if (v.muted && box.classList.contains("mut")) { unmute(); return; }
      if (v.paused) { st("play"); tryPlay(); } else v.pause();
    }
    function wake() { box.classList.remove("idle"); clearTimeout(idleT); idleT = setTimeout(function () { if (!v.paused) box.classList.add("idle"); }, 2400); }
    go.addEventListener("click", function (e) { e.stopPropagation(); if (box.dataset.st === "play") unmute(); else toggle(); });
    fr.addEventListener("click", function (e) { if (e.target.closest(".cn-ui") || e.target.closest(".cn-go")) return; toggle(); });
    box.querySelector(".cn-pp").addEventListener("click", function () { if (v.paused || box.dataset.st !== "play") { st("play"); tryPlay(); } else v.pause(); });
    box.querySelector(".cn-pv").addEventListener("click", function () { if (v.currentTime > 3) { v.currentTime = 0; tryPlay(); } else load(cur - 1); });
    box.querySelector(".cn-nx").addEventListener("click", function () { load(cur + 1); });
    snd.addEventListener("click", function () { if (v.muted) unmute(); else { v.muted = true; sndLbl(); } });
    box.querySelector(".cn-fs").addEventListener("click", function () {
      if (document.fullscreenElement) { document.exitFullscreen(); return; }
      if (fr.requestFullscreen) fr.requestFullscreen(); else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    });
    items.forEach(function (b) { b.addEventListener("click", function () { if (v.muted) { v.muted = false; } load(+b.dataset.c); }); });
    v.addEventListener("timeupdate", upd);
    v.addEventListener("loadedmetadata", upd);
    v.addEventListener("play", function () { box.classList.remove("pz"); if (box.dataset.st !== "play") st("play"); wake(); });
    v.addEventListener("pause", function () { box.classList.add("pz"); box.classList.remove("idle"); if (box.dataset.st === "play" && !v.ended && !seeking) st("pause"); });
    v.addEventListener("ended", function () { if (cur < CH.length - 1) load(cur + 1); else { st("end"); box.classList.remove("idle"); } });
    box.addEventListener("pointermove", function (e) { if (e.pointerType === "mouse") wake(); });
    box.addEventListener("touchstart", wake, { passive: true });
    box.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "k") { e.preventDefault(); toggle(); }
      else if (e.key === "ArrowRight") load(cur + 1); else if (e.key === "ArrowLeft") load(cur - 1);
      else if (e.key === "m") snd.click();
    });
    function seek(e) { var r = bar.getBoundingClientRect(), f = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)); if (v.duration) v.currentTime = f * v.duration; upd(); }
    bar.addEventListener("pointerdown", function (e) { seeking = true; try { bar.setPointerCapture(e.pointerId); } catch (x) {} seek(e); });
    bar.addEventListener("pointermove", function (e) { if (seeking) seek(e); });
    bar.addEventListener("pointerup", function () { seeking = false; });
    bar.addEventListener("pointercancel", function () { seeking = false; });
    /* son coupé par le navigateur : il revient au premier geste sur la page */
    function firstGesture(e) { if (!box.isConnected) { off(); return; } if (e.target.closest && e.target.closest(".cn-snd")) return; if (v.muted && box.classList.contains("mut")) unmute(); }
    function off() { ["pointerdown", "keydown", "touchend"].forEach(function (n) { document.removeEventListener(n, firstGesture, true); }); if (io) io.disconnect(); clearInterval(fadeT); }
    ["pointerdown", "keydown", "touchend"].forEach(function (n) { document.addEventListener(n, firstGesture, true); });
    var io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (es) {
        if (!v.isConnected) { off(); return; }
        if (es[0].isIntersecting) { if (wasOn && box.dataset.st === "play") tryPlay(); }
        else { wasOn = !v.paused; if (!v.paused) { seeking = true; v.pause(); seeking = false; } }
      }, { threshold: 0.2 });
      io.observe(fr);
    }
    cineOff = off;
    v.muted = false;
    load(start || 0);
  }

  /* ---------- page d'une série vidéo sans photos (#/film/<id>) ---------- */
  function vpOwned(v) { return v.projet && VPAGES.indexOf(v.projet) >= 0 && (proj(v.projet) || VPROJ[v.projet]); }
  function secLoose(id) { return (window.VIDEOS || []).filter(function (v) { return v.section === id && !vpOwned(v) && parseVideo(v.lien || ""); }); }
  function filmPage(slug, n) {
    var vp = (window.VIDEO_PROJETS || {})[slug], vs, title, sec;
    if (vp) { vs = (window.VIDEOS || []).filter(function (v) { return v.projet === slug && parseVideo(v.lien || ""); }); title = L(vp); }
    else if (vsec(slug)) { vs = secLoose(slug); title = L(vsec(slug)); }
    if (!vs || !vs.length) return notFound();
    sec = vsec(vs[0].section);
    var backBtn = '<a class="back xs" href="' + esc(ret ? ret.h : "#/video") + '" data-back><span aria-hidden="true">←</span> ' + t("backHome") + "</a>";
    main.innerHTML = '<section class="ph grid"><div class="meta xs"><span class="mt-l">' + backBtn + '<span class="u msec">' + esc(sec ? L(sec) : t("video")) + "</span></span><span>" + vs.length + " " + (vs.length > 1 ? t("videos") : t("video").toLowerCase()) + '</span></div><h1><span class="roll"></span></h1></section>' +
      '<section class="gal"><div class="jw" id="jg"></div></section>' +
      '<section class="s-end grid"><p class="q"><span>' + t("similar") + '</span><a class="u" href="mailto:' + MAIL + '">' + t("email") + "</a></p></section>";
    roll(main.querySelector(".ph h1 .roll"), title, 1);
    var bb = main.querySelector("[data-back]");
    if (bb) bb.addEventListener("click", function (e) { e.preventDefault(); var h = ret ? ret.h : "#/video"; if (location.hash === h) render(); else location.hash = h; });
    var CHf = cineList(vs), sv = vs[n || 0];
    cineMount(document.getElementById("jg"), CHf, title, "", Math.max(0, CHf.indexOf(sv)));
  }

  /* ---------- info ---------- */
  function info() {
    main.innerHTML = '<section class="ph grid"><h1>' + t("info") + "</h1></section>" +
      '<section class="auth grid"><p class="rl" lang="fr">' + esc(AUTH) + "</p>" + (lang === "en" ? '<p class="tr">' + esc(AUTH_EN) + "</p>" : "") + "</section>" +
      '<section class="bio grid"><p class="rl">' + esc(t("bio")) + "</p></section>" +
      '<section class="cols grid"><div><h3>' + t("services") + "</h3><ul>" + t("svc").map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
      "<div><h3>" + t("tools") + '</h3><ul><li><a class="u" href="https://nodedrt.github.io/NodeDRT/" target="_blank" rel="noopener">Node DRT, DaVinci Resolve plugin</a></li><li><a class="u" href="#/etalonnage">' + t("grade") + '</a></li></ul></div>' +
      "<div><h3>" + t("contact") + '</h3><ul><li><a class="u" href="mailto:' + MAIL + '">' + MAIL + "</a></li><li>" + TEL + "</li></ul></div></section>" +
      '<section class="after grid"><p class="row"><span>' + t("clients") + "</span><span>" + t("clientsLine") + "</span></p></section>";
  }
  function notFound() { main.innerHTML = '<section class="ph grid"><h1>' + t("notfound") + '</h1></section><section class="after grid"><a class="all u" href="#/">' + t("home") + " →</a></section>"; }

  /* ---------- révélations ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  function splitWords(el) {
    if (el.dataset.split) return; el.dataset.split = 1;
    el.innerHTML = el.textContent.split(/\s+/).filter(Boolean).map(function (w) { return '<span class="w">' + esc(w) + "</span>"; }).join(" ");
    var top = null, line = -1;
    el.querySelectorAll(".w").forEach(function (w) { if (w.offsetTop !== top) { top = w.offsetTop; line++; } w.style.transitionDelay = (line * 80) + "ms"; });
  }
  function observe() {
    main.querySelectorAll(".rl").forEach(splitWords);
    main.querySelectorAll(".fig:not(.in), .rl:not(.in)").forEach(function (el) { if (io && !reduce) io.observe(el); else el.classList.add("in"); });
  }

  /* ---------- visionneuse ---------- */
  var lb = document.getElementById("lb"), lbs = { list: [], i: 0, from: null, title: "" };
  lb.innerHTML = '<div class="top xs"><span class="lt"></span><span class="lc"></span><button type="button" class="lx"></button></div><div class="stage"><img alt=""></div><span class="hint"></span>';
  var lbImg = lb.querySelector(".stage img"), hint = lb.querySelector(".hint");
  function lbShow(i, from) {
    var Ls = lbs.list; lbs.i = (i + Ls.length) % Ls.length; var p = Ls[lbs.i];
    lbImg.src = src(p, true);
    var full = new Image(); full.onload = function () { if (Ls[lbs.i] === p) lbImg.src = full.src; }; full.src = src(p);
    lbImg.alt = (lbs.title ? lbs.title + ", " : "") + (lbs.i + 1);
    lb.querySelector(".lt").textContent = lbs.title;
    lb.querySelector(".lc").textContent = pad(lbs.i + 1) + " / " + pad(Ls.length);
    [1, -1].forEach(function (d) { new Image().src = src(Ls[(lbs.i + d + Ls.length) % Ls.length]); });
    if (from && !reduce && lbImg.animate) {
      var r0 = from.getBoundingClientRect();
      requestAnimationFrame(function () {
        var r1 = lbImg.getBoundingClientRect(); if (!r1.width) return;
        lbImg.animate([{ transform: "translate(" + (r0.left - r1.left) + "px," + (r0.top - r1.top) + "px) scale(" + (r0.width / r1.width) + "," + (r0.height / r1.height) + ")", transformOrigin: "0 0" },
          { transform: "none", transformOrigin: "0 0" }], { duration: 600, easing: "cubic-bezier(.76,0,.24,1)" });
      });
    }
  }
  function openLB(list, i, from, title) {
    if (!list.length || i < 0) return;
    lbs.list = list; lbs.from = from; lbs.title = title;
    lb.querySelector(".lx").textContent = t("close");
    lb.hidden = false; document.body.style.overflow = "hidden"; lock(true);
    requestAnimationFrame(function () { lb.classList.add("on"); });
    lbShow(i, from.querySelector(".mask"));
    lb.querySelector(".lx").focus();
  }
  function closeLB() { if (lb.hidden) return; cursor.hide(); lb.classList.remove("on"); document.body.style.overflow = ""; lock(false); setTimeout(function () { if (!lb.classList.contains("on")) lb.hidden = true; }, 450); if (lbs.from && lbs.from.isConnected) lbs.from.focus({ preventScroll: true }); }
  lb.addEventListener("click", function (e) {
    if (e.target.closest(".lx")) return closeLB();
    if (e.target.closest(".top")) return;
    lbShow(lbs.i + (e.clientX < window.innerWidth / 2 ? -1 : 1));
  });
  /* même légende qu'à l'accueil : elle suit la souris */
  lb.addEventListener("mousemove", function (e) {
    if (e.target.closest(".top")) { cursor.hide(); return; }
    cursor.show(e.clientX < window.innerWidth / 2 ? "← " + t("prevImg") : t("nextImg") + " →", e.clientX, e.clientY);
  });
  lb.addEventListener("mouseleave", function () { cursor.hide(); });
  var sx = null;
  lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 45) lbShow(lbs.i + (dx < 0 ? 1 : -1)); });

  /* ---------- lecteur vidéo ---------- */
  var vm = document.getElementById("vm"), vmFrom = null;
  function openVideo(em, title, from) {
    vmFrom = from;
    vm.innerHTML = '<div class="top xs"><span>' + esc(title) + '</span><button type="button" class="vx">' + t("close") + '</button></div><div class="fr' + (/\.(mp4|webm|m4v)(\?|$)/i.test(em) ? " file" : "") + '">' + player(em, title) + "</div>";
    vm.hidden = false; document.body.style.overflow = "hidden"; lock(true);
    var v1 = vm.querySelector("video"); if (v1) { var pr1 = v1.play(); if (pr1 && pr1.catch) pr1.catch(function () {}); }
    requestAnimationFrame(function () { vm.classList.add("on"); });
    vm.querySelector(".vx").addEventListener("click", closeVideo); vm.querySelector(".vx").focus();
  }
  function closeVideo() { if (vm.hidden) return; vm.classList.remove("on"); document.body.style.overflow = ""; lock(false); var f = vm.querySelector("iframe, video"); if (f) { if (f.pause) f.pause(); f.remove(); } setTimeout(function () { if (!vm.classList.contains("on")) { vm.hidden = true; vm.innerHTML = ""; } }, 450); if (vmFrom && vmFrom.isConnected) vmFrom.focus({ preventScroll: true }); }
  vm.addEventListener("click", function (e) { if (e.target === vm) closeVideo(); });
  document.addEventListener("keydown", function (e) {
    if (!vm.hidden) { if (e.key === "Escape") closeVideo(); return; }
    if (!lb.hidden) { if (e.key === "Escape") closeLB(); else if (e.key === "ArrowRight") lbShow(lbs.i + 1); else if (e.key === "ArrowLeft") lbShow(lbs.i - 1); return; }
    if (!ixo.hidden) { if (e.key === "Escape") closeIxo(); return; }
    if (!menu.hidden) { if (e.key === "Escape") toggleMenu(false); return; }
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.defaultPrevented || /input|textarea|select/i.test(e.target.tagName || "")) return;
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var d = e.key === "ArrowRight" ? 1 : -1;
    if (st && st.show) { e.preventDefault(); st.show(st.i + d, d); }
    else if (curPrevNext) location.hash = curPrevNext[d > 0 ? 1 : 0];
  });

  /* ---------- index plein écran ---------- */
  var ixo = document.createElement("div"), curPrevNext = null;
  ixo.id = "ixo"; ixo.className = "ixo"; ixo.hidden = true; ixo.setAttribute("role", "dialog"); ixo.setAttribute("aria-label", "Index");
  document.body.appendChild(ixo);
  /* « Index » : va à l'index de la page d'accueil (Photographie, ou Vidéo depuis une page vidéo) */
  var ixPending = false;
  function ixScroll(smooth) {
    var x = document.getElementById("index"); if (!x) return;
    window.scrollTo({ top: x.getBoundingClientRect().top + window.scrollY - 64, behavior: smooth && !reduce ? "smooth" : "auto" });
  }
  function goIndex() {
    if (page === "home" && document.getElementById("index")) { ixScroll(true); return; }
    var r = parse().r, vid = r === "video" || r === "film" || (page === "home" && mode === "video");
    ixPending = true; location.hash = vid ? "#/video" : "#/photographie";
  }
  function openIxo(focus) {
    ixo.innerHTML = '<div class="top"><span>Index</span><button type="button" class="x">' + t("close") + "</button></div>" + mapCards();
    ixo.querySelectorAll(".ix-c").forEach(function (g, i) { g.style.setProperty("--i", Math.min(i, 20)); if (g.getAttribute("href") === location.hash) g.classList.add("cur"); });
    ixo.querySelectorAll(".ix-c[data-em]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); closeIxo(); openVideo(a.dataset.em, a.dataset.t, a); }); });
    ixo.querySelectorAll(".ix-c[data-pmv]").forEach(function (a) { a.addEventListener("click", pjVids); });
    ixo.hidden = false; document.body.style.overflow = "hidden"; lock(true);
    requestAnimationFrame(function () { ixo.classList.add("on"); });
    ixo.querySelector(".x").focus({ preventScroll: true });
    ixo.scrollTop = 0;
    /* ouvert depuis le nom d'une section : on arrive directement sur sa catégorie */
    if (focus) {
      var tg = [].filter.call(ixo.querySelectorAll(".xc[data-s]"), function (x) { return (" " + x.dataset.s + " ").indexOf(" " + focus + " ") >= 0; })[0];
      if (tg) { var y = tg.getBoundingClientRect().top - ixo.getBoundingClientRect().top + ixo.scrollTop - 80; ixo.scrollTop = Math.max(0, y); tg.classList.add("hl"); setTimeout(function () { tg.classList.remove("hl"); }, 1600); }
    }
  }
  function closeIxo() { if (ixo.hidden) return; pv.classList.remove("on", "ixp"); ixo.classList.remove("on"); document.body.style.overflow = ""; lock(false); setTimeout(function () { if (!ixo.classList.contains("on")) ixo.hidden = true; }, 500); }

  /* ---------- protection ---------- */
  document.addEventListener("contextmenu", function (e) { if (e.target.tagName === "IMG" || e.target.closest(".lb, .st-frame")) e.preventDefault(); });
  document.addEventListener("dragstart", function (e) { if (e.target.tagName === "IMG") e.preventDefault(); });

  /* ---------- routeur ---------- */
  var first = true;
  function parse() {
    var hs = /^#\//.test(location.hash) ? location.hash : "#/";
    var h = hs.replace(/^#\/?/, "").split("/"), r = h[0] || "";
    if (r === "travaux") r = "photographie";
    return { r: r, sub: h[1] ? decodeURIComponent(h[1]) : "", n: h[2] ? +h[2] || 0 : 0 };
  }
  function navOn() {
    hd.querySelectorAll("[data-nav]").forEach(function (a) {
      var n = a.dataset.nav;
      a.classList.toggle("on", page === "home" ? (n === "photographie" && mode === "photo") || (n === "video" && mode === "video") : page === "projet" ? n === "photographie" : page === "film" ? n === "video" : n === page);
    });
  }
  function setTitle(R) {
    var ttl = page === "projet" && proj(R.sub) ? pTitle(R.sub) : page === "film" && (window.VIDEO_PROJETS || {})[R.sub] ? L(window.VIDEO_PROJETS[R.sub]) : page === "film" && vsec(R.sub) ? L(vsec(R.sub)) : page === "home" ? (mode === "video" ? t("video") : t("photo")) : page === "etalonnage" ? t("grade") : page === "info" ? t("info") : t("role");
    document.title = page === "home" ? (lang === "fr" ? "Samuel Drouin | Photographe et vidéaste à l’île Maurice" : "Samuel Drouin | Photographer and filmmaker in Mauritius") : ttl + " | Samuel Drouin, " + (lang === "fr" ? "photographe île Maurice" : "Mauritius photographer");
  }
  /* retour à l'accueil : on garde la page, l'image de la vitrine et la position */
  var ret = null, resumeI = null;
  try { ret = JSON.parse(sessionStorage.getItem("sd-ret") || "null"); } catch (e) {}
  function saveRet() { try { sessionStorage.setItem("sd-ret", JSON.stringify(ret)); } catch (e) {} }
  function render(keepScroll) {
    var R = parse(), r = R.r, stI = st && st.i >= 0 ? st.i : null;
    var hm = r === "" ? mode : (r === "photographie" && !R.sub) ? "photo" : r === "video" ? "video" : null;
    toggleMenu(false); closeIxo(); pv.classList.remove("on"); cursor.hide();
    /* même page : on ne change que le contenu */
    if (hm && page === "home" && main.querySelector(".st")) {
      setMode(hm);
      if (R.sub) scrollIx(R.sub); else if (window.scrollY > 0 && r !== "") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      navOn(); setTitle(R); return;
    }
    stopStage(); resizers = []; curPrevNext = null; if (cineOff) { cineOff(); cineOff = null; } if (heroOff) { heroOff(); heroOff = null; }
    var from = page;
    if (from === "home" && (r === "photographie" || r === "etalonnage" || r === "film")) { ret = { h: lastHome || "#/", i: stI, y: homeY, m: mode }; saveRet(); }
    if (hm && from !== "home" && ret && ret.i != null && ret.m === hm) resumeI = ret.i;
    if (hm) { ret = null; saveRet(); }
    var draw = function () {
      if (hm) { if (hm !== mode) { mode = hm; saveMode(); } page = "home"; home(); }
      else if (r === "photographie") { page = "projet"; projet(R.sub); }
      else if (r === "etalonnage") { page = "etalonnage"; projet("etalonnage"); }
      else if (r === "info") { page = "info"; info(); }
      else if (r === "film") { page = "film"; filmPage(R.sub, R.n); }
      else { page = "404"; notFound(); }
      navOn(); setTitle(R); setTimeout(fnSync, 50);
      if (ixPending && hm) { ixPending = false; setTimeout(function () { ixScroll(false); }, 60); setTimeout(function () { ixScroll(false); }, 450); }
      var back = hm && from === "projet" && scrollMem[location.hash || "#/"];
      if (hm && back == null && from === "projet") back = homeY;
      if (back) window.scrollTo(0, back); else if (!keepScroll) window.scrollTo(0, 0);
      observe();
      if (!first && !keepScroll) main.focus({ preventScroll: true });
      if (hm && R.sub) setTimeout(function () { scrollIx(R.sub); }, 120);
    };
    if (!first && !reduce && document.startViewTransition) {
      /* navigation rapide (double tap) : une transition peut en remplacer une autre, sans erreur */
      var vt = document.startViewTransition(draw), nop = function () {};
      ["ready", "finished", "updateCallbackDone"].forEach(function (k) { if (vt && vt[k] && vt[k].catch) vt[k].catch(nop); });
    }
    else { draw(); if (!first && !reduce) { main.classList.remove("fade"); void main.offsetWidth; main.classList.add("fade"); } }
    first = false;
  }
  var scrollMem = {}, lastHash = location.hash, lastHome = "#/", homeY = 0;
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("hashchange", function () {
    if (location.hash && !/^#\//.test(location.hash)) return;
    scrollMem[lastHash || "#/"] = window.scrollY;
    if (page === "home") { lastHome = lastHash || "#/"; homeY = window.scrollY; }
    lastHash = location.hash; navDepth++;
    render();
  });
  /* navigation flottante : Retour et Accueil, toujours à portée dès qu'on descend dans une page */
  var navDepth = 0;
  var fn = document.createElement("nav"); fn.className = "fnav"; fn.setAttribute("aria-label", "Navigation");
  fn.innerHTML = '<button type="button" class="fn-b"><span aria-hidden="true">←</span> ' + t("back") + '</button><i aria-hidden="true"></i><a class="fn-h" href="#/">' + t("goHome") + "</a>";
  document.body.appendChild(fn);
  fn.querySelector(".fn-b").addEventListener("click", function () { if (navDepth > 0) { navDepth -= 2; history.back(); } else location.hash = "#/"; });
  fn.querySelector(".fn-h").addEventListener("click", function (e) {
    e.preventDefault();
    var h = ret && ret.h ? ret.h : "#/";
    if (location.hash === h) window.scrollTo({ top: 0, behavior: "smooth" }); else location.hash = h;
  });
  function fnSync() {
    var show = page !== "home" && window.scrollY > 260 && ixo.hidden && lb.hidden && vm.hidden;
    fn.classList.toggle("on", show);
  }
  var rt, lastW = window.innerWidth, lastH = window.innerHeight;
  window.addEventListener("resize", function () { if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 90) return; lastW = window.innerWidth; lastH = window.innerHeight; clearTimeout(rt); rt = setTimeout(function () { resizers.forEach(function (f) { f(); }); }, 150); });
  window.addEventListener("scroll", function () {
    var past = window.scrollY > window.innerHeight * 0.8, ftv = ft.getBoundingClientRect().top < window.innerHeight;
    bar.classList.toggle("on", past && !ftv && !curPrevNext);
    var pb = main.querySelector(".pbar"); if (pb) pb.classList.toggle("on", window.scrollY > 200 && !ftv);
    fnSync();
  }, { passive: true });

  chrome(); render();
  var go = function () { document.body.classList.add("ready"); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { requestAnimationFrame(go); }); else requestAnimationFrame(go);
  setTimeout(go, 1200);
})();
