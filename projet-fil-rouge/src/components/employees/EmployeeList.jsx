import { useState } from 'react';
import EmployeeCard from './EmployeeCard';
import { employees, departments } from '../../data/employees';
import './EmployeeList.css';

function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Tous');

  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'Tous' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <section className="employee-list-section">
      <div className="section-header">
        <h2>Annuaire</h2>
        <span className="employee-count">{filteredEmployees.length} employé(s)</span>
      </div>

      <div className="filters-bar">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un employé..."
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-button">×</button>
          )}
        </div>

        <div className="department-filter">
          <label htmlFor="dept">Département :</label>
          <select
            id="dept"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="filter-select"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="no-results">
          <p>Aucun employé ne correspond à votre recherche.</p>
          <button onClick={() => { setSearchTerm(''); setSelectedDepartment('Tous'); }} className="reset-btn">
            Réinitialiser
          </button>
        </div>
      ) : (
        <div className="employee-grid">
          {filteredEmployees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </section>
  );
}

export default EmployeeList;
