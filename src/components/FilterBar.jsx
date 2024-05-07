// FilterBar.jsx
import React from 'react';

const FilterBar = ({ filters, selectedFilters, onFilterChange, onResetFilters }) => {
  const handleFilterChange = (filter, isChecked) => {
    onFilterChange(filter, isChecked);
  };

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <label key={filter}>
          <input
            type="checkbox"
            value={filter}
            checked={selectedFilters.includes(filter)}
            onChange={(e) => handleFilterChange(filter, e.target.checked)}
          />
          {filter}
        </label>
      ))}
    </div>
  );
};

export default FilterBar;
