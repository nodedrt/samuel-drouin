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
    { projet: "voyage", img: ["voyage/40"] },
    { projet: "ferney", img: ["coulisses/14"] },
    { projet: "villa-la-plage", img: ["immobilier/villa-la-plage/01"] },
    { projet: "portrait", img: ["portrait/20", "portrait/18"] },
    { projet: "konekte", img: ["konekte/01", "konekte/03"] },
    { projet: "paysage", img: ["paysage/03"] },
    { projet: "sealife", img: ["corporate/sealife/10"] },
    { projet: "kenya-telkom", img: ["corporate/kenya-telkom/02", "corporate/kenya-telkom/03"] },
    { projet: "vert-nature", img: ["vert-nature/08"] },
    { projet: "gamma-construction", img: ["corporate/gamma-construction/09", "corporate/gamma-construction/01"] },
    { projet: "drone", img: ["drone/01"] },
    { projet: "ciel-textile", img: ["corporate/ciel-textile/16"] },
    { projet: "kenya-film", img: ["coulisses/26"] },
    { projet: "ocean-villa", img: ["immobilier/ocean-villa/23"] },
    { projet: "sasha-academy", img: ["corporate/sasha-academy/18", "corporate/sasha-academy/03"] },
    { projet: "eclosia", img: ["evenements/09"] },
    { projet: "le-dalblair", img: ["immobilier/le-dalblair/10"] },
    { projet: "kfc", img: ["coulisses/35", "coulisses/36"] },
    { projet: "exposition-port-louis", img: ["corporate/exposition-port-louis/01"] },
    { projet: "villa-anahita", img: ["immobilier/villa-anahita/02"] },
    { projet: "ciel-group", img: ["evenements/24"] },
    { projet: "yesterday-rodrigues", img: ["immobilier/yesterday-rodrigues/05"] },
    { projet: "ome-fam-uni", img: [] },
    { projet: "villa-horizon", img: ["immobilier/villa-horizon/15"] },
    { projet: "bluemoon-villa", img: ["immobilier/bluemoon-villa/05"] },
    { projet: "details", img: ["immobilier/details/24", "immobilier/details/08"] }
  ],

  // Les sections, comme sur le Google Site (l'immobilier en dernier).
  sections: [
    { id: "voyage", fr: "Voyage", en: "Travel", projets: ["voyage"] },
    { id: "paysage", fr: "Paysage", en: "Landscape", projets: ["paysage"] },
    { id: "vert-nature", fr: "Vert nature", en: "Green nature", projets: ["vert-nature"] },
    { id: "drone", fr: "Drone", en: "Drone", projets: ["drone"] },
    { id: "portrait", fr: "Portrait", en: "Portrait", projets: ["portrait"] },
    { id: "coulisses", fr: "Coulisses de tournage", en: "Behind the scenes", projets: ["ferney", "kenya-film", "kfc"] },
    { id: "kenya-telkom", fr: "Kenya Telkom", en: "Kenya Telkom", projets: ["kenya-telkom"] },
    { id: "ciel-textile", fr: "Ciel Textile", en: "Ciel Textile", projets: ["ciel-textile"] },
    { id: "sealife", fr: "Sealife", en: "Sealife", projets: ["sealife"] },
    { id: "gamma", fr: "Gamma Construction", en: "Gamma Construction", projets: ["gamma-construction", "exposition-port-louis"] },
    { id: "sasha-academy", fr: "Sasha Academy", en: "Sasha Academy", projets: ["sasha-academy"] },
    { id: "konekte", fr: "Konekte", en: "Konekte", projets: ["konekte"] },
    { id: "associations", fr: "Associations", en: "Associations", projets: ["eclosia", "ciel-group", "ome-fam-uni"] },
    { id: "immobilier", fr: "Immobilier", en: "Real estate",
      projets: ["villa-la-plage", "ocean-villa", "villa-anahita", "le-dalblair", "yesterday-rodrigues", "villa-horizon", "bluemoon-villa", "details"] }
  ],

  projets: {
    "paysage": { titre: { fr: "Paysage", en: "Landscape" }, dossier: "paysage", couverture: "03", lignes: [["03", "02"], ["05", "10"], ["04", "08", "06"], ["07", "11"]] },
    "vert-nature": { titre: { fr: "Vert nature", en: "Green nature" }, dossier: "vert-nature", couverture: "08" },
    "konekte": { titre: "Konekte", dossier: "konekte", couverture: "01", nouveau: true },
    "drone": { titre: { fr: "Drone", en: "Drone" }, dossier: "drone", couverture: "01", lignes: [["04", "01"], ["13", "09"], ["08", "03"], ["02", "12"], ["10", "05"], ["06", "07"], ["16", "11", "19"], ["15", "17", "18"]] },
    "ciel-textile": { titre: "Ciel Textile", dossier: "corporate/ciel-textile", couverture: "16" },
    "gamma-construction": { titre: { fr: "Gamma Construction, chantier", en: "Gamma Construction, site" }, dossier: "corporate/gamma-construction", couverture: "09" },
    "sealife": { titre: "Sealife", dossier: "corporate/sealife", couverture: "05" },
    "sasha-academy": { titre: "Sasha Academy", dossier: "corporate/sasha-academy", couverture: "18" },
    "kenya-telkom": { titre: { fr: "Kenya Telkom", en: "Kenya Telkom" }, dossier: "corporate/kenya-telkom", couverture: "02" },
    "exposition-port-louis": { titre: { fr: "Exposition à Port-Louis", en: "Port Louis exhibition" }, dossier: "corporate/exposition-port-louis" },
    "portrait": { titre: "Portrait", dossier: "portrait", coupure: ["02"], apercu: ["20", "18", "23", "19"] },
    "voyage": { titre: { fr: "Voyage", en: "Travel" }, dossier: "voyage", apercu: ["32", "24", "25", "08"] },
    "kenya-film": { titre: { fr: "Kenya Telkom, film", en: "Kenya Telkom, film" }, dossier: "coulisses", partie: "Kenya Film Telkom", couverture: "26" },
    "ferney": { titre: { fr: "Ferney, film", en: "Ferney, film" }, dossier: "coulisses", partie: "Ferney Film", couverture: "14" },
    "kfc": { titre: { fr: "KFC, film", en: "KFC, film" }, dossier: "coulisses", partie: "KFC Film" },
    "eclosia": { titre: "Groupe Eclosia", dossier: "evenements", partie: "Eclosia Groupe associations", couverture: "09" },
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
    "etalonnage": { titre: { fr: "Étalonnage, DCTL Lumina", en: "Colour grading, Lumina DCTL" }, dossier: "etalonnage-dctl-lumina", couverture: "09" }
  },

  // Photos de l'accueil d'origine (sans les affiches ni les collages), pour la visionneuse de l'accueil.
  selection: "accueil",
  selectionSauf: ["01", "02", "03", "05", "07", "09", "13", "26", "36", "43", "44", "45"]
};
