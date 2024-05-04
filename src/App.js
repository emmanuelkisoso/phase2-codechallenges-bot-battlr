import './App.css';
import React ,{ useState } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';


function App() {
  const [ listedBots,setListedBots ] =useState([])
  const [ releasedBots,setReleasedBots ] =useState([])

  const handleBotClick = (botData) =>{
    const existingBot = listedBots.find(bot => bot.id === botData.id);
    if (!existingBot) {
      setListedBots((prevBots) => [...prevBots, botData])
    }
  }

  const handleBotRelease = (botData) =>{
    setReleasedBots((prevBots) =>[...prevBots,botData])
    setListedBots((prevBots) => prevBots.filter( (bot) => bot.id !== botData.id))
  }


  return (
    <div>
      <div className="bot-area">
        {listedBots.map((bot) =>(
          <div key={bot.id}>{bot.name}</div>
        ))}
      </div>
      <BotCollection bots={releasedBots} onClick={(bot) => handleBotClick(bot)} onRelease={(bot) => handleBotRelease(bot)}/>
      <YourBotArmy listedBots={listedBots} onRelease={(bot) => handleBotRelease(bot)}/>
    </div>
  );
}

export default App;
