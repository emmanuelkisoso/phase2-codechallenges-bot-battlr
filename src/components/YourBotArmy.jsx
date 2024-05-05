import React from 'react'

// Functional component for displaying the user's bot army
const YourBotArmy = ({ bots, onBotDelete }) => {
    // If there are no bots, return null
    if (!bots) return null

    // Render the bot army
    return (
        <div className="bot-army">
            <div className="row">
                {/* Map through the bots array and render each bot */}
                {Object.values(bots).map((bot) => (
                    <div key={bot.id} className="col-sm-3 col-md-3 mb-4">
                        <div className="card">
                            {/* Bot image */}
                            <img src={bot.avatar_url} className="card-img-top" alt={bot.name} />
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
                                {/* Button to delete the bot */}
                                <button className="btn btn-danger" onClick={() => onBotDelete(bot)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YourBotArmy
