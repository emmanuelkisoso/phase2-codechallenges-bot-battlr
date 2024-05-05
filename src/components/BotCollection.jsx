import React from 'react';
import { Link } from 'react-router-dom';

const BotCollection = ({ bots }) => {
  if (!bots || bots.length === 0) return <div>No bots available</div>;

  const rows = [];
  for (let i = 0; i < bots.length; i += 4) {
    rows.push(
      <div className="row" key={i}>
        {bots.slice(i, i + 4).map((bot) => (
          <div key={bot.id} className="col-sm-3 col-md-3 mb-4">
            <div className="card">
              <Link to={`/bots/${bot.id}`} className="card-link">
                <img src={bot.avatar_url} className="card-img-top" alt={bot.name} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{bot.name}</h5>
                <p className="card-text">{bot.catchphrase}</p>
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
    );
  }

  return <div className="bot-collection">{rows}</div>;
};

export default BotCollection;