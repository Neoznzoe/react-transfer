// Données mockées des annonces
// Dans une vraie application, ces données viendraient d'une API

export const announcements = [
  {
    id: 1,
    title: "Bienvenue sur TeamHub !",
    content: `Notre nouvel intranet est maintenant disponible. Vous y trouverez :
    - L'annuaire de tous les collaborateurs
    - Les annonces de l'entreprise
    - Votre espace personnel

    N'hésitez pas à explorer toutes les fonctionnalités !`,
    author: "François Moreau",
    authorId: 7,
    authorRole: "CEO",
    createdAt: "2025-01-15T10:30:00",
    category: "Général",
    isPinned: true
  },
  {
    id: 2,
    title: "Formation React - Inscriptions ouvertes",
    content: `Une formation React sera organisée le mois prochain pour tous les développeurs intéressés.

    Programme :
    - Les fondamentaux de React
    - Les Hooks avancés
    - State management
    - Best practices

    Contactez le service RH pour vous inscrire.`,
    author: "Claire Leroy",
    authorId: 4,
    authorRole: "DRH",
    createdAt: "2025-01-14T14:00:00",
    category: "RH",
    isPinned: false
  },
  {
    id: 3,
    title: "Maintenance serveurs - Dimanche 20 janvier",
    content: `Une maintenance programmée aura lieu dimanche 20 janvier de 2h à 6h du matin.

    Services impactés :
    - Email
    - Intranet
    - VPN

    Merci de votre compréhension.`,
    author: "Victor Besson",
    authorId: 1,
    authorRole: "Lead Developer",
    createdAt: "2025-01-13T09:15:00",
    category: "Technique",
    isPinned: false
  },
  {
    id: 4,
    title: "Afterwork - Vendredi 24 janvier",
    content: `Pour fêter la fin du mois, un afterwork est organisé vendredi 24 janvier à partir de 18h.

    Lieu : Le Comptoir, 12 rue de la Paix

    Inscriptions via le formulaire en ligne. Conjoints bienvenus !`,
    author: "Gabrielle Simon",
    authorId: 8,
    authorRole: "Content Manager",
    createdAt: "2025-01-12T16:45:00",
    category: "Événements",
    isPinned: false
  },
  {
    id: 5,
    title: "Nouveau process de validation des congés",
    content: `À partir du 1er février, les demandes de congés devront être soumises au moins 2 semaines à l'avance.

    Rappel des étapes :
    1. Soumettre la demande via l'outil RH
    2. Validation par le manager
    3. Validation par les RH
    4. Confirmation par email

    Pour toute question, contactez le service RH.`,
    author: "Claire Leroy",
    authorId: 4,
    authorRole: "DRH",
    createdAt: "2025-01-10T11:00:00",
    category: "RH",
    isPinned: true
  }
];

export const categories = [
  "Toutes",
  "Général",
  "RH",
  "Technique",
  "Événements"
];

// Fonction utilitaire pour formater la date
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Fonction pour obtenir le temps relatif (il y a X jours)
export function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "À l'instant";
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} h`;
  if (diffInSeconds < 604800) return `Il y a ${Math.floor(diffInSeconds / 86400)} j`;

  return formatDate(dateString);
}
