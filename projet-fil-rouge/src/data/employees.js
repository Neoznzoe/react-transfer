// Données mockées des employés
// Dans une vraie application, ces données viendraient d'une API

export const employees = [
  {
    id: 1,
    firstName: "Victor",
    lastName: "Besson",
    email: "victor.besson@teamhub.com",
    department: "Développement",
    role: "Developer",
    avatar: "https://i.pravatar.cc/150?img=1",
    phone: "01 23 45 67 89",
    isOnline: true,
    joinedAt: "2022-03-15",
    bio: "Passionné par React et les technologies web modernes."
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Martin",
    email: "alice.martin@teamhub.com",
    department: "Design",
    role: "UX Designer",
    avatar: "https://i.pravatar.cc/150?img=5",
    phone: "01 23 45 67 90",
    isOnline: false,
    joinedAt: "2023-01-10",
    bio: "Créatrice d'expériences utilisateur intuitives."
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Dupont",
    email: "bob.dupont@teamhub.com",
    department: "Marketing",
    role: "Marketing Manager",
    avatar: "https://i.pravatar.cc/150?img=3",
    phone: "01 23 45 67 91",
    isOnline: true,
    joinedAt: "2021-06-20",
    bio: "Expert en stratégies digitales et growth hacking."
  },
  {
    id: 4,
    firstName: "Claire",
    lastName: "Leroy",
    email: "claire.leroy@teamhub.com",
    department: "RH",
    role: "DRH",
    avatar: "https://i.pravatar.cc/150?img=9",
    phone: "01 23 45 67 92",
    isOnline: true,
    joinedAt: "2020-02-01",
    bio: "Accompagner les talents pour une entreprise épanouissante."
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Bernard",
    email: "david.bernard@teamhub.com",
    department: "Développement",
    role: "Backend Developer",
    avatar: "https://i.pravatar.cc/150?img=8",
    phone: "01 23 45 67 93",
    isOnline: false,
    joinedAt: "2023-05-15",
    bio: "Spécialiste Node.js et bases de données."
  },
  {
    id: 6,
    firstName: "Emma",
    lastName: "Petit",
    email: "emma.petit@teamhub.com",
    department: "Design",
    role: "UI Designer",
    avatar: "https://i.pravatar.cc/150?img=10",
    phone: "01 23 45 67 94",
    isOnline: true,
    joinedAt: "2024-01-08",
    bio: "Passionnée par le design system et l'accessibilité."
  },
  {
    id: 7,
    firstName: "François",
    lastName: "Moreau",
    email: "francois.moreau@teamhub.com",
    department: "Direction",
    role: "CEO",
    avatar: "https://i.pravatar.cc/150?img=11",
    phone: "01 23 45 67 95",
    isOnline: true,
    joinedAt: "2019-01-01",
    bio: "Visionnaire et passionné par l'innovation."
  },
  {
    id: 8,
    firstName: "Gabrielle",
    lastName: "Simon",
    email: "gabrielle.simon@teamhub.com",
    department: "Marketing",
    role: "Content Manager",
    avatar: "https://i.pravatar.cc/150?img=20",
    phone: "01 23 45 67 96",
    isOnline: false,
    joinedAt: "2022-09-01",
    bio: "Créatrice de contenus engageants et stratégiques."
  }
];

export const departments = [
  "Tous",
  "Développement",
  "Design",
  "Marketing",
  "RH",
  "Direction"
];

// Fonction utilitaire pour trouver un employé par ID
export function getEmployeeById(id) {
  return employees.find(emp => emp.id === id);
}

// Fonction utilitaire pour filtrer par département
export function getEmployeesByDepartment(department) {
  if (department === "Tous") return employees;
  return employees.filter(emp => emp.department === department);
}
