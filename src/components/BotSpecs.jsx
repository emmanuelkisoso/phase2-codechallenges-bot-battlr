import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Functional component for displaying bot details and handling enlistment
const BotSpecs = ({ onBotEnlist }) => {
  // Extract botId from URL parameters
  const { botId } = useParams()
  // State variables to hold bot data and enlistment status
  const [botData, setBotData] = useState(null)
  const [isEnlisted, setIsEnlisted] = useState(false)

  // Fetch bot details when component mounts or botId changes
  useEffect(() => {
    const fetchBotDetails = async () => {
      try {
        const response = await fetch(`https://deployment-of-bot-battlr.onrender.com/bots/${botId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch bot details')
        }
        const botDetails = await response.json();
        setBotData(botDetails)
      } catch (error) {
        console.error('Error fetching bot details:', error);
      }
    }

    fetchBotDetails()
  }, [botId])

  // Function to handle bot enlistment
  const handleEnlist = async () => {
    try {
      // Perform enlistment logic, e.g., send a POST request to enlist the bot
      const response = await fetch('https://deployment-of-bot-battlr.onrender.com/bots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ botId }),
      })

      if (!response.ok) {
        throw new Error('Failed to enlist bot')
      }

      setIsEnlisted(true) // Update enlistment status
      if (onBotEnlist) {
        onBotEnlist(botData) // Notify parent component about enlisted bot
      }

      console.log('Bot enlisted successfully!')
    } catch (error) {
      console.error('Error enlisting bot:', error)
      // Handle error
    }
  }

  // Render bot details and enlist button
  return (
    <div className="bot-specs">
      <h2>Bot Details</h2>
      <p>Bot ID: {botId}</p>
      {botData && (
        <>
          <p>Bot Name: {botData.name}</p>
          {botData.avatar_url && <img src={botData.avatar_url} alt="Bot" />}
          <p>Class: {botData.bot_class}</p>
          <p>Health: {botData.health}</p>
          <p>Damage: {botData.damage}</p>
          <p>Armor: {botData.armor}</p>
          <p>Created At: {botData.created_at}</p>
          <p>Updated At: {botData.updated_at}</p>
          {!isEnlisted && ( // Display enlist button only if not already enlisted
            <button onClick={handleEnlist}>Enlist</button>
          )}
        </>
      )}
      <Link to="/phase2-codechallenges-bot-battlr">Back to Bot Collection</Link> {/* Link to navigate back to bot collection */}
    </div>
  )
}

export default BotSpecs;
