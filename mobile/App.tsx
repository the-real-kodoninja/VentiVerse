import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaProvider>
      <AppNavigator darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
    </SafeAreaProvider>
  );
};

export default App;