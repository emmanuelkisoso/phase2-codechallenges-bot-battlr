import React, { useState,useEffect } from "react";

function BotCollection({onBotClick}) {
    const [bots, setBots] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/bots`)
            .then(res =>res.json())
            .then(data => setBots(data))
            .catch(error => console.error('Error fetching bot data:', error));
    }, []);

    return (
        <div className="container">
            <div className="row">
                {bots.map(bot => (
                    <div key={bot.id} className="col-sm-3 md-4">
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BotCollection;
