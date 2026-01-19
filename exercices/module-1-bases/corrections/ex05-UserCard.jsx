// Exercice 5 - Carte utilisateur
// Concepts : Props, déstructuration

function UserCard({ user }) {
  const { name, email, avatar, role, isOnline } = user;

  return (
    <div className="user-card">
      <div className="user-avatar-container">
        <img src={avatar} alt={name} className="user-avatar" />
        <span className={`status ${isOnline ? 'online' : 'offline'}`} />
      </div>
      <div className="user-info">
        <h3 className="user-name">{name}</h3>
        <p className="user-role">{role}</p>
        <a href={`mailto:${email}`} className="user-email">{email}</a>
      </div>
    </div>
  );
}

// Composant parent pour démonstration
function UserList() {
  const users = [
    { id: 1, name: "Victor Besson", email: "victor@example.com", avatar: "https://i.pravatar.cc/150?img=1", role: "Développeur", isOnline: true },
    { id: 2, name: "Alice Martin", email: "alice@example.com", avatar: "https://i.pravatar.cc/150?img=5", role: "Designer", isOnline: false },
  ];

  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export { UserCard, UserList };
export default UserCard;
