// Exercice 3 - Liste de courses
// Concepts : map(), key, rendu de listes

function ListeCourses() {
  const articles = [
    { id: 1, nom: "Pommes", quantite: 6, achete: false },
    { id: 2, nom: "Pain", quantite: 1, achete: true },
    { id: 3, nom: "Lait", quantite: 2, achete: false },
    { id: 4, nom: "Oeufs", quantite: 12, achete: false },
    { id: 5, nom: "Fromage", quantite: 1, achete: true },
  ];

  return (
    <div className="liste-courses">
      <h2>Ma liste de courses</h2>
      <ul>
        {articles.map(article => (
          <li
            key={article.id}
            className={article.achete ? 'achete' : ''}
          >
            <span className="nom">{article.nom}</span>
            <span className="quantite">x{article.quantite}</span>
            {article.achete && <span className="check">✓</span>}
          </li>
        ))}
      </ul>
      <p className="total">
        {articles.filter(a => !a.achete).length} article(s) restant(s)
      </p>
    </div>
  );
}

export default ListeCourses;
