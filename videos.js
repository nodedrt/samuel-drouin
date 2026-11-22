/*
  VIDÉOS DE LA PAGE VIDÉO
  Le plus simple : utilise l'app « Ajouter au site » (choix « Vidéo »).
  Ou copie une ligne ci-dessous et change le titre et le lien.

  section : "films", "drone", "interviews", "contenu" ou "concepts" (Fake Ads).
  2, 3... pour la vitrine de l'accueil (mode Vidéo).
  Liens : YouTube ou Vimeo (pour la 4K), ou Google Drive.
  Mets  une: true  pour la grande vidéo en tête de page.
*/
window.VIDEO_SECTIONS = [
  { id: "bande-demo", fr: "Bande-démo", en: "Showreel" },
  { id: "films", fr: "Films de marque", en: "Brand films" },
  { id: "contenu", fr: "Réseaux sociaux", en: "Social media", note: { fr: "Formats courts et verticaux pour Instagram et TikTok.", en: "Short vertical formats for Instagram and TikTok." } },
  { id: "concepts", fr: "Fake Ads", en: "Fake Ads", note: { fr: "Films concept réalisés et étalonnés par Samuel Drouin, non commandés par les marques citées.", en: "Spec films directed and graded by Samuel Drouin, not commissioned by the brands shown." } },
  { id: "drone", fr: "Drone", en: "Drone" },
  { id: "interviews", fr: "Interviews", en: "Interviews" }
];

window.VIDEOS = [
  { section: "bande-demo", une: true, vedette: 1, titre: { fr: "Bande-démo", en: "Showreel" }, lien: "https://drive.google.com/file/d/16PQFUlTkXY5R09ySKLWW5eV92SCB1E9F/view" },
  { section: "films", projet: "les-paletuviers", ambiance: true, format: "v", vedette: 1.5, titre: { fr: "Les Palétuviers", en: "Les Palétuviers" }, chap: { fr: "I. Le lac", en: "I. The lake" }, duree: 30.3, lien: "videos/les-paletuviers/film-1.mp4" },
  { section: "films", projet: "les-paletuviers", format: "v", titre: { fr: "Les Palétuviers, II. La mangrove", en: "Les Palétuviers, II. The mangrove" }, chap: { fr: "II. La mangrove", en: "II. The mangrove" }, duree: 21.4, lien: "videos/les-paletuviers/film-2.mp4" },
  { section: "films", projet: "les-paletuviers", format: "v", titre: { fr: "Les Palétuviers, III. La forêt", en: "Les Palétuviers, III. The forest" }, chap: { fr: "III. La forêt", en: "III. The forest" }, duree: 42.6, lien: "videos/les-paletuviers/film-3.mp4" },
  { section: "films", projet: "les-paletuviers", format: "v", titre: { fr: "Les Palétuviers, IV. Le lagon", en: "Les Palétuviers, IV. The lagoon" }, chap: { fr: "IV. Le lagon", en: "IV. The lagoon" }, duree: 47.0, lien: "videos/les-paletuviers/film-4.mp4" },
  { section: "films", projet: "les-paletuviers", titre: { fr: "Les Palétuviers, la terrasse", en: "Les Palétuviers, the terrace" }, lien: "https://drive.google.com/file/d/1tZTpK6touwCF-iw0TzSK_J2zJP9J3fep/view" },
  { section: "films", projet: "samaya", vedette: 4, titre: { fr: "Samaya, manucure", en: "Samaya, manicure" }, lien: "https://drive.google.com/file/d/1rS2dBFF36lKrow1QVfWk04ntoTWQmaD6/view" },
  { section: "films", projet: "samaya", titre: { fr: "Samaya, massage", en: "Samaya, massage" }, lien: "https://drive.google.com/file/d/109_ZBRzkiquWfBxgOpKGFUSLyI5U25HV/view" },
  { section: "films", projet: "peizan", vedette: 6, titre: { fr: "Peizan, Roselle", en: "Peizan, Roselle" }, lien: "https://drive.google.com/file/d/1loJhiusHv2_FjFQM6nOMPXeX_-UpLzRW/view" },
  { section: "contenu", projet: "mr-bao", vedette: 4.5, titre: { fr: "Mr Bao, Crispy Chicken Bao", en: "Mr Bao, Crispy Chicken Bao" }, format: "v", duree: 23.1, lien: "videos/mr-bao/crispy-chicken-bao.mp4" },
  { section: "contenu", projet: "mr-bao", titre: { fr: "Mr Bao, Dumplings", en: "Mr Bao, Dumplings" }, format: "v", duree: 26.9, lien: "videos/mr-bao/dumplings.mp4" },
  { section: "contenu", projet: "mr-bao", titre: { fr: "Mr Bao, Teriyaki Chicken Fried Rice", en: "Mr Bao, Teriyaki Chicken Fried Rice" }, format: "v", duree: 18.9, lien: "videos/mr-bao/teriyaki-fried-rice.mp4" },
  { section: "contenu", vedette: 7, titre: { fr: "Caprizzio Pizza", en: "Caprizzio Pizza" }, lien: "https://youtu.be/8RMG_1su8XA" },
  { section: "contenu", titre: { fr: "Caprizzio Pizza, dégustation", en: "Caprizzio Pizza, tasting" }, lien: "https://youtu.be/iIlgPFjt8LU" },
  { section: "concepts", vedette: 2, titre: { fr: "Gucci Flora", en: "Gucci Flora" }, lien: "https://youtu.be/j_BfIGbbTws" },
  { section: "concepts", titre: { fr: "San Pellegrino", en: "San Pellegrino" }, lien: "https://youtu.be/4DG1AfIPeeo" },
  { section: "concepts", titre: { fr: "Brio, citron et menthe", en: "Brio, lemon and mint" }, lien: "https://youtu.be/FhllkeRPY00" },
  { section: "drone", vedette: 3.5, titre: { fr: "Chiroulet, Pyrénées", en: "Chiroulet, Pyrenees" }, lien: "videos/chiroulet.mp4" },
  { section: "drone", titre: { fr: "Le Chiroulet, France", en: "Le Chiroulet, France" }, lien: "https://youtu.be/jnvMcSBXid0" },
  { section: "drone", vedette: 3, titre: { fr: "Après-midi, Hautacam", en: "Afternoon, Hautacam" }, lien: "https://youtu.be/QzYLXv8_BjQ" },
  { section: "interviews", titre: { fr: "École de l’Ouest, I", en: "École de l’Ouest, I" }, lien: "https://youtu.be/UPFtghfB5oE" },
  { section: "interviews", vedette: 5, titre: { fr: "École de l’Ouest, II", en: "École de l’Ouest, II" }, lien: "https://youtu.be/ichzVg8sMu4" },
  { section: "interviews", titre: { fr: "École de l’Ouest, III", en: "École de l’Ouest, III" }, lien: "https://youtu.be/_S2wi6h9vMA" }
];

/* projets dont les vidéos s’ouvrent sur une page dédiée (le projet, onglet Vidéo) */
window.VIDEO_PAGES = ["les-paletuviers", "mr-bao", "samaya"];
