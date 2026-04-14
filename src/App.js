import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import TransportScreen from './screens/TransportScreen';
import MethodologyScreen from './screens/MethodologyScreen';

function App() {
  var screenState = useState('home');
  var currentScreen = screenState[0];
  var setCurrentScreen = screenState[1];

  function navigate(screen) {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  }

  if (currentScreen === 'transport') {
    return <TransportScreen onBack={function() { navigate('home'); }} />;
  }

  if (currentScreen === 'methodology') {
    return <MethodologyScreen onBack={function() { navigate('home'); }} />;
  }

  return <HomeScreen onNavigate={navigate} />;
}

export default App;
