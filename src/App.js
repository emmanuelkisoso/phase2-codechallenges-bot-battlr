// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import BotSpecs from './components/BotSpecs';

function App() {
  const [allBots, setAllBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('http://localhost:3000/bots');
        if (!response.ok) {
          throw new Error('Failed to fetch bot data');
        }
        const data = await response.json();
        setAllBots(data);
      } catch (error) {
        console.error('Error fetching bot data:', error);
      }
    };

    fetchBots();
  }, []);

  const handleBotEnlist = (bot) => {
    setEnlistedBots((prevEnlistedBots) => [bot, ...prevEnlistedBots]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/bots/:botId" element={<BotSpecs onBotEnlist={handleBotEnlist} />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );

  function MainPage() {
    return (
      <div className="container">
        <YourBotArmy bots={enlistedBots} />
        <BotCollection bots={allBots} onBotEnlist={handleBotEnlist} /> {/* Pass onBotEnlist */}
      </div>
    );
  }
}

export default App;
