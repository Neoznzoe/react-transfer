// ═══════════════════════════════════════════════════════════════════════════
// EMPLOYEELIST.JSX - Liste des employés
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Itération avec map()
// - Prop key obligatoire
// - Rendu conditionnel (liste vide)
// - Composition de composants
//
// ═══════════════════════════════════════════════════════════════════════════

import EmployeeCard from './EmployeeCard';
import { employees } from '../../../data/employees';
import './EmployeeList.css';

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT EMPLOYEELIST
//
// ⚠️ POINT BLOQUANT : La prop "key" dans map()
//
// Quand on utilise map() pour créer des éléments, React a besoin d'une
// "key" unique pour chaque élément afin de :
// - Identifier quel élément a changé
// - Optimiser les mises à jour du DOM
// - Maintenir l'état des composants dans la liste
//
// RÈGLES pour key :
// 1. Doit être UNIQUE parmi les frères/soeurs
// 2. Doit être STABLE (pas un index si la liste change)
// 3. Utiliser l'ID de l'objet si disponible
//
// ─────────────────────────────────────────────────────────────────────────────
function EmployeeList() {
  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU CONDITIONNEL : Liste vide
  // ═══════════════════════════════════════════════════════════════════════════
  if (employees.length === 0) {
    return (
      <div className="employee-list-empty">
        <p>Aucun employé trouvé.</p>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <section className="employee-list-section">
      {/* Titre de la section */}
      <div className="section-header">
        <h2>Annuaire ({employees.length} employés)</h2>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* GRILLE DES CARTES                                                   */}
      {/*                                                                     */}
      {/* ⚠️ POINT BLOQUANT : map() et key                                   */}
      {/*                                                                     */}
      {/* employees.map(employee => ...) transforme chaque objet employee     */}
      {/* en un composant EmployeeCard                                        */}
      {/*                                                                     */}
      {/* key={employee.id} est OBLIGATOIRE :                                 */}
      {/* - React l'utilise pour identifier chaque élément                    */}
      {/* - Sans key, React affiche un warning                                */}
      {/* - Ne jamais utiliser l'index si la liste peut être modifiée        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="employee-grid">
        {employees.map(employee => (
          <EmployeeCard
            key={employee.id}    // ⚠️ OBLIGATOIRE ET UNIQUE
            employee={employee}  // On passe l'objet entier comme prop
          />
        ))}
      </div>
    </section>
  );
}

export default EmployeeList;


// ═══════════════════════════════════════════════════════════════════════════
// NOTES PÉDAGOGIQUES
// ═══════════════════════════════════════════════════════════════════════════
//
// POURQUOI NE PAS UTILISER L'INDEX COMME KEY ?
//
// employees.map((employee, index) => (
//   <EmployeeCard key={index} ... />  // ❌ MAUVAISE PRATIQUE
// ))
//
// Problèmes :
// 1. Si on supprime un élément au milieu, tous les index changent
// 2. React pense que les éléments ont changé alors que non
// 3. Peut causer des bugs avec les états internes des composants
//
// QUAND l'index est acceptable :
// - Liste statique qui ne change jamais
// - Pas d'ID disponible
// - Éléments sans état interne
//
// ═══════════════════════════════════════════════════════════════════════════
