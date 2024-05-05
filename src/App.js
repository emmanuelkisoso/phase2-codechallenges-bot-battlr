import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BotCollection from './components/BotCollection'
import YourBotArmy from './components/YourBotArmy'
import BotSpecs from './components/BotSpecs'
import SortBar from './components/SortBar'

function App() {
  // State variables for all bots, enlisted bots, and the original state of all bots
  const [allBots, setAllBots] = useState([])
  const [enlistedBots, setEnlistedBots] = useState([])
  const [originalAllBotsState, setOriginalAllBotsState] = useState([])

  // Fetch bots data from localhost when component mounts
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('http://localhost:3000/bots');
        if (!response.ok) {
          throw new Error('Failed to fetch bot data');
        }
        const data = await response.json();
        setAllBots(data);
        setOriginalAllBotsState(data); // Store the initial state of allBots
      } catch (error) {
        console.error('Error fetching bot data:', error)
      }
    };

    fetchBots();
  }, [])

  // Function to add a bot to the enlisted bots list
  const handleBotEnlist = (bot) => {
    setEnlistedBots((prevEnlistedBots) => [bot, ...prevEnlistedBots])
  }

  // Function to sort bots based on criteria and order
  const handleSort = (criteria, isDescending) => {
    // Clone the array of all bots to avoid mutating the state directly
    const sortedBots = [...allBots]

    // Sort the cloned array based on the provided criteria
    sortedBots.sort((a, b) => {
      if (isDescending) {
        return a[criteria] - b[criteria]
      } else {
        return b[criteria] - a[criteria]
      }
    })

    // Update the state with the sorted array of bots
    setAllBots(sortedBots)
  }

  // Function to remove sorting and reset to original state
  const handleRemoveSort = () => {
    // Reset allBots to its original state
    setAllBots(originalAllBotsState)
  }

  // Render component
  return (
    <Router>
      <Routes>
        {/* Route to display details of a specific bot */}
        <Route path="/bots/:botId" element={<BotSpecs onBotEnlist={handleBotEnlist} />} />
        {/* Default route to display the main page */}
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  )

  // Functional component for the main page
  function MainPage() {
    return (
      <div className="container">
        {/* Component for sorting the bot collection */}
        <SortBar onSort={handleSort} onRemoveSort={handleRemoveSort}/>
        {/* Component to display enlisted bots */}
        <YourBotArmy bots={enlistedBots} />
        {/* Component to display the collection of all bots */}
        <BotCollection bots={allBots} onBotEnlist={handleBotEnlist} /> {/* Pass onBotEnlist */}
      </div>
    )
  }
}

export default App
