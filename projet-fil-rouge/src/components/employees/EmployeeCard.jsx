import './EmployeeCard.css';

function EmployeeCard({ employee }) {
  const { firstName, lastName, email, department, role, avatar, phone, isOnline, joinedAt } = employee;

  function formatJoinDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(date);
  }

  return (
    <article className="employee-card">
      <div className="card-header">
        <div className="avatar-container">
          <img src={avatar} alt={`${firstName} ${lastName}`} className="avatar" />
          <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`} />
        </div>
      </div>

      <div className="card-body">
        <h3 className="employee-name">{firstName} {lastName}</h3>
        <p className="employee-role">{role}</p>
        <span className="employee-department">{department}</span>
      </div>

      <div className="card-footer">
        <a href={`mailto:${email}`} className="contact-link">{email}</a>
        <span className="phone">{phone}</span>
        <span className="joined-date">Depuis {formatJoinDate(joinedAt)}</span>
      </div>
    </article>
  );
}

export default EmployeeCard;
