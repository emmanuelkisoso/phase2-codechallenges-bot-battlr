import React from 'react';

const YourBotArmy = ({ bots, onBotDelete }) => {
    if (!bots) return null;
        return (
          <div className="bot-army">
            <div className="row">
              {Object.values(bots).map((bot) => (
                <div key={bot.id} className="col-sm-3 col-md-3 mb-4">
                  <div className="card">
                    <img src={bot.avatar_url} className="card-img-top" alt={bot.name} />
                    <div className="card-body">
                      <h5 className="card-title">{bot.name}</h5>
                      <p className="card-text">{bot.catchphrase}</p>
                      <div className="d-flex justify-content-between">
                        <h6>Health: {bot.health}</h6>
                        <h6>Damage: {bot.damage}</h6>
                        <h6>Armor: {bot.armor}</h6>
                      </div>
                      <button className="btn btn-danger" onClick={() => onBotDelete(bot)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };

export default YourBotArmy;