/* ============================================================
   LES SITES PRÉSENTÉS
   Pour ajouter un site : copie un bloc { ... }, change les textes,
   mets ses captures dans img/ (ordinateur : 1440 × 900, téléphone : 560 de large)
   et son adresse dans « lien ».
   type : "reel" (site en ligne pour un vrai client) ou "concept" (marque fictive).
   ============================================================ */
window.SITES = [
  {
    id: "samuel-drouin",
    type: "reel",
    phare: true,
    titre: "Samuel Drouin",
    sous: { fr: "Photographie et film, île Maurice", en: "Photography and film, Mauritius" },
    annee: "2026",
    lien: "https://samueldrouin.github.io/",
    img: { d: "img/sd-d.jpg", d2: "img/sdv-d.jpg", m: "img/sd-m.jpg" },
    texte: {
      fr: "Mon propre portfolio, et le terrain où tout a été affiné : plus de quarante projets photo, et une page vidéo qui s’ouvre en plein écran.",
      en: "My own portfolio, and the place where everything was refined: over forty photo projects, and a video page that opens full screen."
    },
    points: {
      fr: ["Vitrine animée réglée sur la lumière de chaque photo", "Ouverture vidéo plein écran en fondus enchaînés", "Index par familles, visionneuse photo au clavier et au doigt", "Français et anglais, référencement local à Maurice"],
      en: ["Animated showcase tuned to the light of each photo", "Full-screen video opening with cross-fades", "Index by family, photo viewer for keyboard and touch", "French and English, local SEO for Mauritius"]
    }
  },
  {
    id: "maison-corail",
    type: "concept",
    titre: "Maison Corail",
    sous: { fr: "Boutique-hôtel sur le lagon", en: "Boutique hotel on the lagoon" },
    annee: "2026",
    lien: "maison-corail/index.html",
    img: { d: "img/mc-d.jpg", m: "img/mc-m.jpg" },
    texte: {
      fr: "Un petit hôtel imaginaire de six chambres sur la côte est, face à l’île aux Cerfs. Une interface lente et aérienne, ivoire et filets fins, où l’on prend le temps comme on le prendrait sur place.",
      en: "An imaginary six-room hotel on the east coast, facing Île aux Cerfs. A slow, airy interface in ivory and fine lines, where you take your time as you would on site."
    },
    points: {
      fr: ["Ouverture en fondus lents, heure et lever du soleil à Maurice en direct", "Chambres à faire glisser, fiche détaillée pour chacune", "Réservation qui calcule le séjour et vérifie la capacité", "Photos adoucies pour une palette ivoire cohérente"],
      en: ["Slow cross-fade opening, live Mauritius time and sunrise", "Draggable rooms, a detailed sheet for each", "Booking that totals the stay and checks capacity", "Softened photos for a consistent ivory palette"]
    }
  },
  {
    id: "ti-potager",
    type: "concept",
    titre: "Ti Potager",
    sous: { fr: "Table du jardin", en: "Garden table" },
    annee: "2026",
    lien: "ti-potager/index.html",
    img: { d: "img/tp-d.jpg", m: "img/tp-m.jpg" },
    texte: {
      fr: "Un restaurant imaginaire où tout vient du potager. Une mise en page en deux colonnes façon menu imprimé, très différente de l’hôtel, pour montrer qu’aucun site ne ressemble au précédent.",
      en: "An imaginary restaurant where everything comes from the garden. A two-column layout like a printed menu, very different from the hotel, to show that no site looks like the last."
    },
    points: {
      fr: ["Colonne fixe : horaires, ouverture en direct, navigation", "Carte filtrable avec aperçu photo au survol", "Récolte du jour calculée selon l’heure", "Réservation par jour et par créneau, fermeture du lundi gérée"],
      en: ["Fixed column: hours, live open status, navigation", "Filterable menu with photo preview on hover", "Today’s harvest timed to the clock", "Booking by day and time slot, Monday closing handled"]
    }
  }
];
