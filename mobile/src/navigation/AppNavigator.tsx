import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Home from '../screens/Home';
import Feed from '../screens/Feed';
import Explore from '../screens/Explore';
import Fandom from '../screens/Fandom';
import Search from '../screens/Search';
import DeFi from '../screens/DeFi';
import NFTMarket from '../screens/NFTMarket';
import Gallery from '../screens/Gallery';
import Events from '../screens/Events';
import Store from '../screens/Store';
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import { autumnTheme } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs: React.FC<{ darkMode: boolean }> = ({ darkMode }) => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: darkMode ? autumnTheme.dark.accent1 : autumnTheme.light.accent1,
      },
      tabBarActiveTintColor: darkMode ? autumnTheme.dark.text : autumnTheme.light.text,
    }}
  >
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="Explore" component={Explore} />
    <Tab.Screen name="Fandom" component={Fandom} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

const AppNavigator: React.FC<{ darkMode: boolean; toggleDarkMode: () => void }> = ({ darkMode, toggleDarkMode }) => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen
        name="Main"
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleDarkMode} style={styles.headerButton}>
              <Text style={{ color: darkMode ? '#E8DAB2' : '#4A2C1A' }}>
                {darkMode ? '☀️' : '🌙'}
              </Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: darkMode ? autumnTheme.dark.accent1 : autumnTheme.light.accent1,
          },
          headerTintColor: darkMode ? autumnTheme.dark.text : autumnTheme.light.text,
        }}
      >
        {() => <MainTabs darkMode={darkMode} />}
      </Stack.Screen>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DeFi" component={DeFi} />
      <Stack.Screen name="NFTMarket" component={NFTMarket} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Store" component={Store} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerButton: { padding: 10 },
});

export default AppNavigator;