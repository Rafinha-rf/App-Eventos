import React, { createContext, useState, useEffect } from 'react';
import events from '../../data/event.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
          setFavoriteEvents(JSON.parse(favorites));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavoriteEvent = async (eventId) => {
    try {
      let favorites = await AsyncStorage.getItem('favorites');
      favorites = favorites ? JSON.parse(favorites) : [];

      const index = favorites.findIndex((event) => event.id === eventId);

      if (index === -1) {
        // se o evento não estiver nos favoritos, adiciona-o
        const eventToAdd = events.find((event) => event.id === eventId);
        favorites.push(eventToAdd);
      } else {
        // se o evento já estiver nos favoritos, remove-o
        favorites.splice(index, 1);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setFavoriteEvents(favorites);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider value={{ favoriteEvents, toggleFavoriteEvent }}>
      {children}
    </AppContext.Provider>
  );
};
