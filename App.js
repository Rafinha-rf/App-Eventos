import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './src/components/AppContext';
import HomeScreen from './src/pages/Home';
import EventListScreen from './src/pages/EventList';
import SplashScreen from './src/pages/Splash';
import FavoriteEventsScreen from './src/pages/FavoriteEvents';
import EventDetailsScreen from './src/pages/EventDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EventList" component={EventListScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FavoriteEvents" component={FavoriteEventsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;