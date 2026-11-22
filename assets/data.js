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
    { projet: "paysage", img: ["paysage/03"] },
    { projet: "sealife", img: ["corporate/sealife/09"] },
    { projet: "kenya-telkom", img: ["corporate/kenya-telkom/02", "corporate/kenya-telkom/03"] },
    { projet: "vert-nature", img: ["vert-nature/02"] },
    { projet: "gamma-construction", img: ["corporate/gamma-construction/09", "corporate/gamma-construction/01"] },
    { projet: "ciel-textile", img: ["corporate/ciel-textile/16"] }
  ],

  // Les sections, comme sur le Google Site (l'immobilier en dernier).
  sections: [
    { id: "voyage", fr: "Voyage", en: "Travel", projets: ["voyage"] },
    { id: "paysage", fr: "Paysage", en: "Landscape", projets: ["paysage"] },
    { id: "vert-nature", fr: "Vert nature", en: "Green nature", projets: ["vert-nature"] },
    { id: "portrait", fr: "Portrait", en: "Portrait", projets: ["portrait"] },
    { id: "coulisses", fr: "Coulisses de tournage", en: "Behind the scenes", projets: ["ferney", "kenya-film", "kfc"] },
    { id: "kenya-telkom", fr: "Kenya Telkom", en: "Kenya Telkom", projets: ["kenya-telkom"] },
    { id: "ciel-textile", fr: "Ciel Textile", en: "Ciel Textile", projets: ["ciel-textile"] },
    { id: "sealife", fr: "Sealife", en: "Sealife", projets: ["sealife"] },
    { id: "gamma", fr: "Gamma Construction", en: "Gamma Construction", projets: ["gamma-construction", "exposition-port-louis"] },
    { id: "sasha-academy", fr: "Sasha Academy", en: "Sasha Academy", projets: ["sasha-academy"] },
    { id: "associations", fr: "Associations", en: "Associations", projets: ["eclosia", "ciel-group", "ome-fam-uni"] },
    { id: "immobilier", fr: "Immobilier", en: "Real estate",
      projets: ["villa-la-plage", "ocean-villa", "villa-anahita", "le-dalblair", "yesterday-rodrigues", "villa-horizon", "west-island", "bluemoon-villa", "details", "drone-paletuviers"] }
  ],

  projets: {
    "paysage": { titre: { fr: "Paysage", en: "Landscape" }, dossier: "paysage", couverture: "01" },
    "vert-nature": { titre: { fr: "Vert nature", en: "Green nature" }, dossier: "vert-nature", couverture: "02" },
    "ciel-textile": { titre: "Ciel Textile", dossier: "corporate/ciel-textile", couverture: "16" },
    "gamma-construction": { titre: { fr: "Gamma Construction, chantier", en: "Gamma Construction, site" }, dossier: "corporate/gamma-construction", couverture: "09" },
    "sealife": { titre: "Sealife", dossier: "corporate/sealife", couverture: "09" },
    "sasha-academy": { titre: "Sasha Academy", dossier: "corporate/sasha-academy", couverture: "18" },
    "kenya-telkom": { titre: { fr: "Kenya Telkom", en: "Kenya Telkom" }, dossier: "corporate/kenya-telkom", couverture: "02" },
    "exposition-port-louis": { titre: { fr: "Exposition à Port-Louis", en: "Port Louis exhibition" }, dossier: "corporate/exposition-port-louis" },
    "portrait": { titre: "Portrait", dossier: "portrait", apercu: ["20", "18", "23", "19"] },
    "voyage": { titre: { fr: "Voyage", en: "Travel" }, dossier: "voyage", sauf: ["35", "36"], apercu: ["32", "24", "25", "08"] },
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
    "west-island": { titre: "West Island", dossier: "immobilier/west-island" },
    "villa-la-plage": { titre: "Villa La Plage", dossier: "immobilier/villa-la-plage", couverture: "01" },
    "bluemoon-villa": { titre: "Bluemoon Villa", dossier: "immobilier/bluemoon-villa" },
    "details": { titre: { fr: "Détails", en: "Details" }, dossier: "immobilier/details", couverture: "24" },
    "drone-paletuviers": { titre: { fr: "Palétuviers, drone", en: "Mangroves, drone" }, dossier: "immobilier/drone-paletuviers" },
    "etalonnage": { titre: { fr: "Étalonnage, DCTL Lumina", en: "Colour grading, Lumina DCTL" }, dossier: "etalonnage-dctl-lumina", sauf: ["01"], couverture: "09" }
  },

  // Photos de l'accueil d'origine (sans les affiches ni les collages), pour la visionneuse de l'accueil.
  selection: "accueil",
  selectionSauf: ["01", "02", "03", "05", "07", "09", "13", "26", "36", "43", "44", "45"]
};
