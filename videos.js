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
  { id: "films", fr: "Films", en: "Films" },
  { id: "mr-bao", fr: "Mr Bao", en: "Mr Bao" },
  { id: "concepts", fr: "Fake Ads", en: "Fake Ads", note: { fr: "Films concept réalisés et étalonnés par Samuel Drouin, non commandés par les marques citées.", en: "Spec films directed and graded by Samuel Drouin, not commissioned by the brands shown." } },
  { id: "drone", fr: "Drone", en: "Drone" },
  { id: "interviews", fr: "Interview", en: "Interview" },
  { id: "contenu", fr: "Contenu", en: "Content", note: { fr: "Filmé en vertical, flou ajouté sur les côtés pour l’affichage horizontal.", en: "Shot vertically, blurred sides added for horizontal display." } }
];

window.VIDEOS = [
  { section: "films", projet: "les-paletuviers", ambiance: true, vedette: 1.5, titre: { fr: "Les Palétuviers", en: "Les Palétuviers" }, lien: "videos/les-paletuviers/film.mp4", vertical: "videos/les-paletuviers/film-v.mp4" },
  { section: "drone", vedette: 3.5, titre: { fr: "Chiroulet, Pyrénées", en: "Chiroulet, Pyrenees" }, lien: "videos/chiroulet.mp4" },
  { section: "mr-bao", vedette: 4.5, titre: { fr: "Mr Bao, Crispy Chicken Bao", en: "Mr Bao, Crispy Chicken Bao" }, lien: "videos/mr-bao/crispy-chicken-bao.mp4" },
  { section: "mr-bao", titre: { fr: "Mr Bao, Dumplings", en: "Mr Bao, Dumplings" }, lien: "videos/mr-bao/dumplings.mp4" },
  { section: "mr-bao", titre: { fr: "Mr Bao, Teriyaki Chicken Fried Rice", en: "Mr Bao, Teriyaki Chicken Fried Rice" }, lien: "videos/mr-bao/teriyaki-fried-rice.mp4" },
  { section: "films", une: true, vedette: 1, titre: { fr: "Bande-démo", en: "Showreel" }, lien: "https://drive.google.com/file/d/16PQFUlTkXY5R09ySKLWW5eV92SCB1E9F/view" },
  { section: "films", vedette: 4, titre: { fr: "Samaya, manucure", en: "Samaya, manicure" }, lien: "https://drive.google.com/file/d/1rS2dBFF36lKrow1QVfWk04ntoTWQmaD6/view" },
  { section: "films", titre: { fr: "Samaya, massage", en: "Samaya, massage" }, lien: "https://drive.google.com/file/d/109_ZBRzkiquWfBxgOpKGFUSLyI5U25HV/view" },
  { section: "films", projet: "peizan", vedette: 6, titre: { fr: "Peizan, Roselle", en: "Peizan, Roselle" }, lien: "https://drive.google.com/file/d/1loJhiusHv2_FjFQM6nOMPXeX_-UpLzRW/view" },
  { section: "films", projet: "peizan", titre: { fr: "Peizan, Palétuviers", en: "Peizan, Mangroves" }, lien: "https://drive.google.com/file/d/1tZTpK6touwCF-iw0TzSK_J2zJP9J3fep/view" },
  { section: "drone", vedette: 3, titre: { fr: "Après-midi, Hautacam", en: "Afternoon, Hautacam" }, lien: "https://youtu.be/QzYLXv8_BjQ" },
  { section: "drone", titre: { fr: "Le Chiroulet, France", en: "Le Chiroulet, France" }, lien: "https://youtu.be/jnvMcSBXid0" },
  { section: "interviews", vedette: 5, titre: { fr: "École de l’Ouest, II", en: "École de l’Ouest, II" }, lien: "https://youtu.be/ichzVg8sMu4" },
  { section: "interviews", titre: { fr: "École de l’Ouest, I", en: "École de l’Ouest, I" }, lien: "https://youtu.be/UPFtghfB5oE" },
  { section: "interviews", titre: { fr: "École de l’Ouest, III", en: "École de l’Ouest, III" }, lien: "https://youtu.be/_S2wi6h9vMA" },
  { section: "contenu", vedette: 7, titre: { fr: "Caprizzio Pizza", en: "Caprizzio Pizza" }, lien: "https://youtu.be/8RMG_1su8XA" },
  { section: "contenu", titre: { fr: "Caprizzio Pizza, dégustation", en: "Caprizzio Pizza, tasting" }, lien: "https://youtu.be/iIlgPFjt8LU" },
  { section: "concepts", vedette: 2, titre: { fr: "Gucci Flora", en: "Gucci Flora" }, lien: "https://youtu.be/j_BfIGbbTws" },
  { section: "concepts", titre: { fr: "San Pellegrino", en: "San Pellegrino" }, lien: "https://youtu.be/4DG1AfIPeeo" },
  { section: "concepts", titre: { fr: "Brio, citron et menthe", en: "Brio, lemon and mint" }, lien: "https://youtu.be/FhllkeRPY00" }
];
