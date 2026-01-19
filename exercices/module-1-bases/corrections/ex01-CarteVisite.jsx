// Exercice 1 - Carte de visite
// Concepts : JSX, expressions, attributs

function CarteVisite() {
  const prenom = "Victor";
  const nom = "Besson";
  const metier = "Développeur React";
  const anneeNaissance = 1998;
  const email = "victor.besson@example.com";

  // Calcul de l'âge
  const age = new Date().getFullYear() - anneeNaissance;

  return (
    <div className="carte-visite">
      <h1>{prenom} {nom}</h1>
      <p className="metier">{metier}</p>
      <p className="age">{age} ans</p>
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  );
}

export default CarteVisite;
