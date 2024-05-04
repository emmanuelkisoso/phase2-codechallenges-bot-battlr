import React ,{ useState,useEffect } from "react";

function YourBotArmy({ listedBots,onRelease }) {
    const [ armyBots,setArmyBots ] =useState([])

    useEffect(() =>{
        if (listedBots.length > 0) {
            setArmyBots(listedBots);
          }
    }, [listedBots])

    const handleRelease = (botData) => {
        const existingBot = armyBots.find((bot) => bot.id === botData.id);
        if (existingBot) {
          onRelease(botData);
          setArmyBots((prevBots) => prevBots.filter((bot) => bot.id !== botData.id));
        } else {
          setArmyBots((prevBots) => [...prevBots, botData]);
        }
    }

    return(
        <div className="container">
            <div className="row">
                {armyBots.map((botData) => (
                    <div key={botData.id} className="col-sm-3 md-4">
                        <div className="card" onClick={handleRelease}>
                            <img src={botData.avatar_url} className="card-img-top" alt={botData.name} />
                            <div className="card-body">
                                <h5 className="card-title">{botData.name}</h5>
                                <p className="card-text">{botData.catchphrase}</p>
                                <div className="d-flex justify-content-between">
                                    <h6>Health: {botData.health}</h6>
                                    <h6>Damage: {botData.damage}</h6>
                                    <h6>Armor: {botData.armor}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YourBotArmy