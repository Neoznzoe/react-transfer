// ═══════════════════════════════════════════════════════════════════════════
// EMPLOYEELISTWITHFILTERS.JSX - Liste avec recherche et filtres
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - useState pour gérer l'état local
// - Filtrage avec filter()
// - Lifting state up (le state est ici, pas dans les enfants)
// - Composition de composants
//
// ═══════════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import EmployeeCard from '../../etape-2-annuaire/correction/EmployeeCard';
import SearchBar from './SearchBar';
import DepartmentFilter from './DepartmentFilter';
import { employees } from '../../../data/employees';
import './EmployeeListWithFilters.css';

function EmployeeListWithFilters() {
  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  //
  // ⚠️ POINT BLOQUANT : Où mettre le state ?
  //
  // Le state de recherche et filtre est ICI (dans EmployeeList) et non
  // dans SearchBar ou DepartmentFilter parce que :
  // 1. C'est EmployeeList qui a besoin de ces valeurs pour filtrer
  // 2. Les composants enfants ne font qu'afficher et notifier les changements
  //
  // Ce pattern s'appelle "Lifting State Up" (remonter l'état)
  // ═══════════════════════════════════════════════════════════════════════════
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Tous');

  // ═══════════════════════════════════════════════════════════════════════════
  // FILTRAGE
  //
  // ⚠️ POINT BLOQUANT : filter() et conditions combinées
  //
  // filter() crée un NOUVEAU tableau contenant uniquement les éléments
  // qui passent le test (retournent true)
  //
  // On combine plusieurs conditions avec && :
  // - matchesSearch : l'employé correspond à la recherche
  // - matchesDepartment : l'employé est dans le bon département
  // ═══════════════════════════════════════════════════════════════════════════
  const filteredEmployees = employees.filter(employee => {
    // ─────────────────────────────────────────────────────────────────────────
    // CONDITION 1 : Recherche par nom
    //
    // On cherche dans le prénom ET le nom
    // toLowerCase() pour ignorer la casse (majuscules/minuscules)
    // ─────────────────────────────────────────────────────────────────────────
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = fullName.includes(searchLower);

    // ─────────────────────────────────────────────────────────────────────────
    // CONDITION 2 : Filtre par département
    //
    // Si "Tous" est sélectionné, on laisse passer tout le monde
    // Sinon, on vérifie que le département correspond
    // ─────────────────────────────────────────────────────────────────────────
    const matchesDepartment =
      selectedDepartment === 'Tous' ||
      employee.department === selectedDepartment;

    // L'employé doit passer LES DEUX conditions
    return matchesSearch && matchesDepartment;
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <section className="employee-list-section">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* EN-TÊTE AVEC TITRE                                                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="section-header">
        <h2>Annuaire</h2>
        <span className="employee-count">
          {filteredEmployees.length} employé{filteredEmployees.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BARRE DE FILTRES                                                    */}
      {/*                                                                     */}
      {/* ⚠️ POINT BLOQUANT : Props callbacks                                */}
      {/*                                                                     */}
      {/* On passe aux composants enfants :                                   */}
      {/* - value : la valeur actuelle (pour affichage)                      */}
      {/* - onChange : une fonction (pour notifier les changements)          */}
      {/*                                                                     */}
      {/* Quand l'utilisateur tape, SearchBar appelle onChange(newValue)     */}
      {/* Ce qui appelle setSearchTerm(newValue) ici                         */}
      {/* Le state change → React re-rend → le filtre se met à jour         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="filters-bar">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}  // On passe directement le setter
          placeholder="Rechercher par nom..."
        />

        <DepartmentFilter
          value={selectedDepartment}
          onChange={setSelectedDepartment}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LISTE DES EMPLOYÉS                                                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {filteredEmployees.length === 0 ? (
        <div className="no-results">
          <p>Aucun employé ne correspond à votre recherche.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDepartment('Tous');
            }}
            className="reset-filters-btn"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="employee-grid">
          {filteredEmployees.map(employee => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default EmployeeListWithFilters;


// ═══════════════════════════════════════════════════════════════════════════
// SCHÉMA MENTAL : Flux de données
// ═══════════════════════════════════════════════════════════════════════════
//
// ┌─────────────────────────────────────────────────────────────────────────┐
// │                    EmployeeListWithFilters                              │
// │                                                                         │
// │   const [searchTerm, setSearchTerm] = useState('')                      │
// │                                                                         │
// │   ┌─────────────────────────────────────────────────────────────────┐   │
// │   │                      SearchBar                                   │   │
// │   │                                                                  │   │
// │   │   Props reçues :                                                │   │
// │   │   - value={searchTerm}  ◄────────── Lecture du state           │   │
// │   │   - onChange={setSearchTerm} ────► Modification du state       │   │
// │   │                                                                  │   │
// │   │   Quand l'utilisateur tape :                                    │   │
// │   │   onChange("vic") → setSearchTerm("vic") → state mis à jour    │   │
// │   └─────────────────────────────────────────────────────────────────┘   │
// │                                                                         │
// │   Le state change → React re-rend → filteredEmployees recalculé       │
// │                                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
//
// ═══════════════════════════════════════════════════════════════════════════
