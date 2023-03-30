import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Linking } from 'react-native';
import events from '../../data/event.json';
import { AppContext } from '../components/AppContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const EventListScreen = React.memo(() => {
  const navigation = useNavigation();
  const {toggleFavoriteEvent } = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);
  const [title] = useState('Lista de Eventos');

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem('favorites');
        if (favoritesString) {
          const favoritesArray = JSON.parse(favoritesString);
          setFavorites(favoritesArray);
        }
      } catch (e) {
        console.log(e);
      }
    };
    loadFavorites();
  }, [navigation]);

  const saveFavorites = async (favoritesArray) => {
      const favoritesString = JSON.stringify(favoritesArray);
      await AsyncStorage.setItem('favorites', favoritesString);
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some((event) => event.id === item.id);
    const favoriteButtonStyle = isFavorite ? styles.favoriteButtonActive : styles.favoriteButton;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('EventDetails', { event: item })}
        style={styles.item}
      >
        <View style={styles.logoContainer}>
          <Image source={{ uri: item.logo }} style={styles.logo} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.name}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.location.latitude},${item.location.longitude}`)}>
            <Text style={styles.local}>{item.location.address}</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>{item.date}</Text>
          <View style={styles.favoriteButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                toggleFavoriteEvent(item.id);
                const newFavorites = isFavorite
                  ? favorites.filter((event) => event.id !== item.id)
                  : [...favorites, item];
                setFavorites(newFavorites);
                saveFavorites(newFavorites);
              }}
              style={favoriteButtonStyle}
            >
              <Icon name="heart" size={20} color={isFavorite ? '#FF4136' : '#A9A9A9'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
  <LinearGradient colors={['#B31B1B', '#1E1E1E']} style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.separator}>
          {renderItem({ item })}
        </View>
      )}
      contentContainerStyle={styles.scrollView}
    />
  </LinearGradient>
);

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
  separator: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    elevation: 2,
  },
  logoContainer: {
    marginRight: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  details: {
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#A9A9A9',
    marginTop: 5,
  },
  local: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  favoriteButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  favoriteButtonActive: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
});


export default EventListScreen;