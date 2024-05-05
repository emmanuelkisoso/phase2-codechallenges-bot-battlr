// BotSpecs.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BotSpecs = ({ onBotEnlist }) => {
  const { botId } = useParams();
  const [botData, setBotData] = useState(null);
  const [isEnlisted, setIsEnlisted] = useState(false);

  useEffect(() => {
    const fetchBotDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bots/${botId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bot details');
        }
        const botDetails = await response.json();
        setBotData(botDetails);
      } catch (error) {
        console.error('Error fetching bot details:', error);
      }
    };

    fetchBotDetails();
  }, [botId]);

  const handleEnlist = async () => {
    try {
      // Perform enlistment logic here
      // For example, send a POST request to enlist the bot
      const response = await fetch('http://localhost:3000/bots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ botId }),
      });

      if (!response.ok) {
        throw new Error('Failed to enlist bot');
      }

      setIsEnlisted(true); // Update isEnlisted state
      if (onBotEnlist) {
        onBotEnlist(botData); // Update enlisted bots state
      }

      console.log('Bot enlisted successfully!');
    } catch (error) {
      console.error('Error enlisting bot:', error);
      // Handle error
    }
  };

  return (
    <div className="bot-specs">
      <h2>Bot Details</h2>
      <p>Bot ID: {botId}</p>
      {botData && (
        <>
          <p>Bot Name: {botData.name}</p>
          <p>Health: {botData.health}</p>
          <p>Damage: {botData.damage}</p>
          <p>Armor: {botData.armor}</p>
          {!isEnlisted && ( // Display the enlist button only if not already enlisted
            <button onClick={handleEnlist}>Enlist</button>
          )}
        </>
      )}
      <Link to="/">Back to Bot Collection</Link>
    </div>
  );
};

export default BotSpecs;
