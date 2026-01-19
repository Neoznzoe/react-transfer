// ═══════════════════════════════════════════════════════════════════════════
// DEPARTMENTFILTER.JSX - Filtre par département
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Select contrôlé
// - Itération avec map() pour les options
// - Props callback
//
// ═══════════════════════════════════════════════════════════════════════════

import { departments } from '../../../data/employees';
import './DepartmentFilter.css';

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT DEPARTMENTFILTER
//
// ⚠️ POINT BLOQUANT : Select contrôlé
//
// Comme pour les inputs, un <select> peut être contrôlé :
// - value={selectedValue} : la valeur sélectionnée vient du state
// - onChange : appelé quand l'utilisateur change la sélection
//
// Props attendues :
// - value : string (le département actuellement sélectionné)
// - onChange : function (appelée avec le nouveau département)
//
// ─────────────────────────────────────────────────────────────────────────────
function DepartmentFilter({ value, onChange }) {

  // Handler pour le changement de sélection
  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <div className="department-filter">
      <label htmlFor="department-select" className="filter-label">
        Département :
      </label>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SELECT CONTRÔLÉ                                                     */}
      {/*                                                                     */}
      {/* value={value} : contrôle quelle option est sélectionnée            */}
      {/* onChange={handleChange} : appelé quand l'utilisateur change        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <select
        id="department-select"
        value={value}
        onChange={handleChange}
        className="filter-select"
      >
        {/* ─────────────────────────────────────────────────────────────── */}
        {/* OPTIONS DYNAMIQUES                                              */}
        {/*                                                                 */}
        {/* On utilise map() pour générer les options depuis le tableau    */}
        {/* des départements importé depuis les données                     */}
        {/* ─────────────────────────────────────────────────────────────── */}
        {departments.map(dept => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DepartmentFilter;
