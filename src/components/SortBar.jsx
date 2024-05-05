import React, { useState } from 'react'

// Functional component for the sorting bar
const SortBar = ({ onSort, onRemoveSort }) => {
  // State variables to track the current sorting criteria and direction
  const [currentCriteria, setCurrentCriteria] = useState(null)
  const [isDescending, setIsDescending] = useState(false)

  // Function to handle sorting by a specific criteria
  const handleSort = (criteria) => {
    // Toggle sorting direction if the same criteria is clicked again
    if (currentCriteria === criteria) {
      setIsDescending(!isDescending)
    } else {
      // Set new criteria and reset sorting direction
      setCurrentCriteria(criteria)
      setIsDescending(false)
    }
    // Notify the parent component with the sorting criteria and direction
    onSort(criteria, isDescending)
  };

  // Function to handle removing sorting
  const handleRemoveSort = () => {
    // Reset criteria and sorting direction
    setCurrentCriteria(null)
    setIsDescending(false)
    // Notify the parent component to remove sorting
    onRemoveSort()
  };

  // Render the sorting bar UI
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* Buttons to sort by health, damage, and armor */}
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleSort('health')}>Sort by Health</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleSort('damage')}>Sort by Damage</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleSort('armor')}>Sort by Armor</button>
            </li>
            {/* Button to remove sorting */}
            <li className="nav-item">
              <button className="nav-link btn" onClick={handleRemoveSort}>Remove Sorting</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SortBar;
