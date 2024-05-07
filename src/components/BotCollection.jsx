// BotCollection.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from './FilterBar';

const BotCollection = ({ bots }) => {
  // State to manage selected filters
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Function to handle filter change
  const handleFilterChange = (filter, isChecked) => {
    if (isChecked) {
      setSelectedFilters((prevFilters) => [...prevFilters, filter]);
    } else {
      setSelectedFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
    }
  };

  // Extract unique bot classes from the bots array
  const botClasses = [...new Set(bots.map((bot) => bot.bot_class))];

  // Function to filter bots based on selected filters
  const botMatchesFilters = (bot) => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(bot.bot_class);
  };

  return (
    <div className="bot-collection">
      {/* FilterBar component */}
      <FilterBar
        filters={botClasses}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      {/* Display bots in a single row */}
      <div className="row">
        {bots.filter(botMatchesFilters).map((bot) => (
          <div key={bot.id} className="col-sm-3 col-md-3 mb-4">
            <div className="card">
              {/* Link to navigate to the bot's details page */}
              <Link to={`/bots/${bot.id}`} className="card-link">
                <img src={bot.avatar_url} className="card-img-top" alt={bot.name} />
              </Link>
              <div className="card-body">
                {/* Bot name and catchphrase */}
                <h5 className="card-title">{bot.name}</h5>
                <p className="card-text">{bot.catchphrase}</p>
                {/* Bot stats: health, damage, armor */}
                <div className="d-flex justify-content-between">
                  <h6>Health: {bot.health}</h6>
                  <h6>Damage: {bot.damage}</h6>
                  <h6>Armor: {bot.armor}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BotCollection;
