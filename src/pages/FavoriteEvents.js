import React, { useState, useContext} from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { AppContext } from '../components/AppContext';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const FavoriteEventsScreen = React.memo(() => {
  const navigation = useNavigation();
  const { favoriteEvents, toggleFavoriteEvent } = useContext(AppContext);
  const [title] = useState('Lista de Eventos Favoritos');

  const renderItem = ({ item }) => (
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
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => toggleFavoriteEvent(item.id)}>
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
  <LinearGradient colors={['#B31B1B', '#1E1E1E']} style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={favoriteEvents}
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
  removeButton: {
    backgroundColor: '#B31B1B',
    padding: 8,
    borderRadius: 8,
    margin: -5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 13,
  },
});

export default FavoriteEventsScreen;