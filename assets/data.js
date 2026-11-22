/* ============================================================
   CONTENU DU SITE
   - une : la vitrine animée de l'accueil (projet + 1 ou 2 images).
   - sections : les sections de la page Photographie, dans l'ordre,
     avec leurs projets.
   - projets : chaque projet = un dossier de photos/ (et, si besoin,
     une partie de ce dossier, des photos à exclure, la photo de
     couverture, ou les photos d'aperçu).
   Les nouveaux projets ajoutés avec l'app « Ajouter au site » sont
   dans assets/ajouts.js.
   ============================================================ */

window.SITE = {
  // Vitrine de l'accueil, dans l'ordre : le projet et ses 1 ou 2 images.
  une: [
    { projet: "drone", img: ["drone/01"] },
    { projet: "les-paletuviers", img: ["paletuviers/01", "paletuviers/04"] },
    { projet: "konekte", img: ["konekte/01", "konekte/03"] },
    { projet: "villa-horizon", img: ["immobilier/villa-horizon/15"] },
    { projet: "voyage", img: ["voyage/40"] },
    { projet: "ocean-villa", img: ["immobilier/ocean-villa/23"] },
    { projet: "mr-bao", img: ["mr-bao/01"] },
    { projet: "samaya", img: ["samaya/01", "samaya/16"] },
    { projet: "the-hive", img: ["the-hive/04"] },
    { projet: "poste-lafayette", img: ["immobilier/poste-lafayette/02"] },
    { projet: "sealife", img: ["corporate/sealife/10"] },
    { projet: "portrait", img: ["portrait/20", "portrait/18"] },
    { projet: "cafe-st-felix", img: ["cafe-st-felix/19"] },
    { projet: "abc", img: ["abc/04", "abc/14"] },
    { projet: "ferney", img: ["ferney/26"] },
    { projet: "villa-anahita", img: ["immobilier/villa-anahita/02"] },
    { projet: "melbees", img: ["melbees/03"] },
    { projet: "paysage", img: ["paysage/03"] },
    { projet: "kenya-telkom", img: ["corporate/kenya-telkom/02", "corporate/kenya-telkom/03"] },
    { projet: "peizan", img: ["peizan/02"] },
    { projet: "le-dalblair", img: ["immobilier/le-dalblair/10"] },
    { projet: "kfc", img: ["coulisses/35", "coulisses/36"] },
    { projet: "vert-nature", img: ["vert-nature/08"] },
    { projet: "bluemoon-villa", img: ["immobilier/bluemoon-villa/05"] },
    { projet: "sasha-academy", img: ["corporate/sasha-academy/18", "corporate/sasha-academy/03"] },
    { projet: "eclosia", img: ["evenements/09"] },
    { projet: "yesterday-rodrigues", img: ["immobilier/yesterday-rodrigues/05"] },
    { projet: "kenya-film", img: ["coulisses/26"] },
    { projet: "gamma-construction", img: ["corporate/gamma-construction/09", "corporate/gamma-construction/01"] },
    { projet: "ciel-group", img: ["evenements/24"] },
    { projet: "villa-la-plage", img: ["immobilier/villa-la-plage/01"] },
    { projet: "ciel-textile", img: ["corporate/ciel-textile/16"] },
    { projet: "exposition-port-louis", img: ["corporate/exposition-port-louis/01"] },
    { projet: "details", img: ["immobilier/details/24", "immobilier/details/08"] },
    { projet: "ome-fam-uni", img: [] }
  ],

  // Les sections, comme sur le Google Site (l'immobilier en dernier).
  // Ordre de l'index (accueil et index général) : les plus beaux projets d'abord.
  // Un projet absent de cette liste se place après, dans l'ordre des sections.
  ordre: ["les-paletuviers", "paysage", "drone", "portrait", "cafe-st-felix", "voyage", "konekte", "abc", "samaya", "the-hive", "poste-lafayette", "villa-horizon",
    "mr-bao", "melbees", "ocean-villa", "peizan", "bluemoon-villa", "vert-nature", "sealife", "kfc", "ferney", "kenya-telkom",
    "villa-anahita", "le-dalblair", "kenya-film", "villa-la-plage", "sasha-academy", "ciel-textile"],
  sections: [
    { id: "voyage", fr: "Voyage", en: "Travel", projets: ["voyage"] },
    { id: "paysage", fr: "Paysage", en: "Landscape", projets: ["paysage"] },
    { id: "vert-nature", fr: "Vert nature", en: "Green nature", projets: ["vert-nature"] },
    { id: "drone", fr: "Drone", en: "Drone", projets: ["drone"] },
    { id: "portrait", fr: "Portrait", en: "Portrait", projets: ["portrait"] },
    { id: "coulisses", fr: "Coulisses de tournage", en: "Behind the scenes", projets: ["abc", "ferney", "kenya-film", "kfc"] },
    { id: "kenya-telkom", fr: "Kenya Telkom", en: "Kenya Telkom", projets: ["kenya-telkom"] },
    { id: "ciel-textile", fr: "Ciel Textile", en: "Ciel Textile", projets: ["ciel-textile"] },
    { id: "sealife", fr: "Sealife", en: "Sealife", projets: ["sealife"] },
    { id: "gamma", fr: "Gamma Construction", en: "Gamma Construction", projets: ["gamma-construction", "exposition-port-louis"] },
    { id: "sasha-academy", fr: "Sasha Academy", en: "Sasha Academy", projets: ["sasha-academy"] },
    { id: "the-hive", fr: "The Hive", en: "The Hive", projets: ["the-hive"] },
    { id: "samaya", fr: "Samaya", en: "Samaya", projets: ["samaya"] },
    { id: "mr-bao", fr: "Mr Bao", en: "Mr Bao", projets: ["mr-bao"] },
    { id: "cafe-st-felix", fr: "Café St Félix", en: "Café St Félix", projets: ["cafe-st-felix"] },
    { id: "les-paletuviers", fr: "Les Palétuviers", en: "Les Palétuviers", projets: ["les-paletuviers"] },
    { id: "peizan", fr: "Peizan", en: "Peizan", projets: ["peizan"] },
    { id: "melbees", fr: "Melbees", en: "Melbees", projets: ["melbees"] },
    { id: "konekte", fr: "Konekte", en: "Konekte", projets: ["konekte"] },
    { id: "associations", fr: "Associations", en: "Associations", projets: ["eclosia", "ciel-group", "ome-fam-uni"] },
    { id: "immobilier", fr: "Immobilier", en: "Real estate",
      projets: ["poste-lafayette", "villa-la-plage", "ocean-villa", "villa-anahita", "le-dalblair", "yesterday-rodrigues", "villa-horizon", "bluemoon-villa", "details"] }
  ],

  projets: {
    "paysage": { titre: { fr: "Paysage", en: "Landscape" }, dossier: "paysage", couverture: "03", lignes: [["03", "02"], ["05", "10"], ["04", "08", "06"], ["07", "11"]] },
    "vert-nature": { titre: { fr: "Vert nature", en: "Green nature" }, dossier: "vert-nature", couverture: "08" },
    "the-hive": { titre: "The Hive", dossier: "the-hive", couverture: "04", nouveau: true, egal: true, lignes: [["01", "03"], ["04", "05", "06"], ["07", "08"], ["09", "11", "14"], ["15", "16"], ["20", "21", "22"]] },
    "samaya": { titre: "Samaya", dossier: "samaya", couverture: "01", nouveau: true, egal: true, lignes: [["01", "02"], ["03", "04", "05"], ["06", "07", "08", "09"], ["10", "11", "12"], ["13", "14", "15"], ["16", "17"], ["18", "19", "20", "21"], ["22", "23", "24"], ["25", "26"], ["27", "28", "29", "30"]] },
    "abc": { titre: "ABC, coulisses", dossier: "abc", couverture: "04", nouveau: true, lignes: [["01", "02", "03"], ["04", "05"], ["06", "07"], ["08", "09"], ["10", "11", "12"], ["13", "14", "15", "16"], ["17", "18", "19"], ["20", "21", "22", "23"], ["24", "25", "28"], ["26", "27", "29"]] },
    "poste-lafayette": { titre: "Poste Lafayette", dossier: "immobilier/poste-lafayette", couverture: "02", nouveau: true, egal: true, lignes: [["01", "02"], ["03", "04", "05"], ["06", "07"], ["08", "09"], ["10", "11", "12", "13"], ["14", "15"], ["16", "17"], ["18", "19", "20", "21"], ["22", "23", "24"]] },
    "mr-bao": { titre: "Mr Bao", dossier: "mr-bao", couverture: "01", nouveau: true, egal: true, lignes: [["01", "02"], ["03", "04", "05", "06"], ["23", "09", "11", "12"], ["13", "14", "16", "17"], ["19", "20", "21", "24"]] },
    "cafe-st-felix": { titre: "Café St Félix", dossier: "cafe-st-felix", couverture: "19", nouveau: true, egal: true, lignes: [["01", "02"], ["03", "04", "05"], ["06", "07", "08", "09"], ["10", "11", "12"], ["13", "14", "15"], ["16", "17", "18"], ["19", "20"], ["21", "22", "23"]] },
    "les-paletuviers": { titre: "Les Palétuviers", dossier: "paletuviers", couverture: "01", nouveau: true, egal: true, lignes: [["01", "02", "03"], ["04", "05", "06"], ["07", "08", "09", "10"], ["11", "12", "15"], ["13", "14"], ["16", "17", "18", "19", "20"], ["21", "22", "24", "25", "26"], ["23", "27", "28"], ["29", "30", "31", "32"], ["33"]] },
    "peizan": { titre: "Peizan", dossier: "peizan", couverture: "01", nouveau: true, egal: true, lignes: [["01", "02", "04"], ["05", "06", "08", "09"], ["10", "11", "12", "13"], ["14", "15", "16", "17"], ["18", "19", "20", "21", "22"], ["23", "24", "25"]] },
    "melbees": { titre: "Melbees", dossier: "melbees", couverture: "03", nouveau: true, egal: true, lignes: [["01", "02", "03", "04"], ["05", "06", "07", "08"], ["09", "10", "11", "12"], ["13", "14", "15", "16"], ["17", "18", "19", "20"], ["21", "22", "23", "24"], ["25", "26", "27"]] },
    "konekte": { titre: "Konekte", dossier: "konekte", couverture: "01", nouveau: true },
    "drone": { titre: { fr: "Drone", en: "Drone" }, dossier: "drone", couverture: "01", lignes: [["04", "01"], ["13", "09"], ["08", "03"], ["02", "12"], ["10", "05"], ["06", "07"], ["16", "11", "19"], ["15", "17", "18"], ["22", "23"], ["24", "25"], ["20", "21"], ["26", "27"], ["28", "29"]] },
    "ciel-textile": { titre: "Ciel Textile", dossier: "corporate/ciel-textile", couverture: "16" },
    "gamma-construction": { titre: { fr: "Gamma Construction, chantier", en: "Gamma Construction, site" }, dossier: "corporate/gamma-construction", couverture: "09" },
    "sealife": { titre: "Sealife", dossier: "corporate/sealife", couverture: "05" },
    "sasha-academy": { titre: "Sasha Academy", dossier: "corporate/sasha-academy", couverture: "18" },
    "kenya-telkom": { titre: { fr: "Kenya Telkom", en: "Kenya Telkom" }, dossier: "corporate/kenya-telkom", couverture: "02" },
    "exposition-port-louis": { titre: { fr: "Exposition à Port-Louis", en: "Port Louis exhibition" }, dossier: "corporate/exposition-port-louis" },
    "portrait": { titre: "Portrait", dossier: "portrait", coupure: ["02"], apercu: ["20", "18", "23", "19"] },
    "voyage": { titre: { fr: "Voyage", en: "Travel" }, dossier: "voyage", apercu: ["32", "24", "25", "08"] },
    "kenya-film": { titre: { fr: "Kenya Telkom, film", en: "Kenya Telkom, film" }, dossier: "coulisses", partie: "Kenya Film Telkom", couverture: "26" },
    "ferney": { titre: { fr: "Ferney, film", en: "Ferney, film" }, dossier: "ferney", couverture: "09", egal: true, lignes: [["01", "02", "03"], ["04", "05", "06"], ["07", "08", "09", "10"], ["11", "12", "13", "14"], ["15", "16", "17", "18"], ["19", "20", "21"], ["22", "23"], ["24", "25", "26"], ["27", "28"], ["29", "30"], ["31"]] },
    "kfc": { titre: { fr: "KFC, film", en: "KFC, film" }, dossier: "coulisses", partie: "KFC Film" },
    "eclosia": { titre: "Groupe Eclosia", dossier: "evenements", partie: "Eclosia Groupe associations", couverture: "13", sauf: ["06", "01", "31", "32", "35", "36"], egal: true, lignes: [["13", "10", "14"], ["15", "09"], ["11", "08", "16"], ["12", "07"], ["04", "05", "03"], ["02", "33", "34", "37"]] },
    "ciel-group": { titre: "Ciel Groupe", dossier: "evenements", partie: "Ciel Groupe association" },
    "ome-fam-uni": { titre: "Ome Fam Uni", dossier: "evenements", partie: "Ome fam uni assiociation" },
    "ocean-villa": { titre: "Ocean Villa", dossier: "immobilier/ocean-villa", couverture: "23" },
    "villa-anahita": { titre: "Villa Anahita", dossier: "immobilier/villa-anahita", couverture: "14" },
    "le-dalblair": { titre: "Le Dalblair", dossier: "immobilier/le-dalblair" },
    "yesterday-rodrigues": { titre: "Yesterday Rodrigues", dossier: "immobilier/yesterday-rodrigues" },
    "villa-horizon": { titre: "Villa Horizon", dossier: "immobilier/villa-horizon", couverture: "03" },
    "villa-la-plage": { titre: "Villa La Plage", dossier: "immobilier/villa-la-plage", couverture: "01" },
    "bluemoon-villa": { titre: "Bluemoon Villa", dossier: "immobilier/bluemoon-villa", couverture: "05" },
    "details": { titre: { fr: "Détails", en: "Details" }, dossier: "immobilier/details", couverture: "24" },
    "etalonnage": { titre: { fr: "Étalonnage, Node DRT", en: "Colour grading, Node DRT" }, dossier: "etalonnage", couverture: "09" }
  },

  // Photos de l'accueil d'origine (sans les affiches ni les collages), pour la visionneuse de l'accueil.
  selection: "accueil",
  selectionSauf: ["01", "02", "03", "05", "07", "09", "13", "26", "36", "43", "44", "45"]
};
