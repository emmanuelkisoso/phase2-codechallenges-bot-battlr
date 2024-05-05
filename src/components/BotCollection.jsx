import React from 'react'
import { Link } from 'react-router-dom'

// Functional component for displaying a collection of bots
const BotCollection = ({ bots }) => {
  // If there are no bots or the bots array is empty, display a message
  if (!bots || bots.length === 0) return <div>No bots available</div>

  // Array to hold rows of bots
  const rows = []
  // Split bots into rows of 4 bots each
  for (let i = 0; i < bots.length; i += 4) {
    rows.push(
      <div className="row" key={i}>
        {/* Map through bots in the current row and render each bot */}
        {bots.slice(i, i + 4).map((bot) => (
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
    )
  }

  // Render the bot collection
  return <div className="bot-collection">{rows}</div>
}

export default BotCollection
