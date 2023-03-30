import React, {useEffect} from 'react';
import { Image, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = React.memo(({ navigation }) => {
  
  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <LinearGradient colors={['#B31B1B', '#1E1E1E']} style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/icon.png')} />
      <Button
        title="Ver Eventos"
        onPress={() => navigation.navigate('EventList')}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
      />
      <TouchableOpacity style={styles.favoriteButton} onPress={() => navigation.navigate('FavoriteEvents')}>
        <Icon name="heart" size={24} color="#E23B3B" />
      </TouchableOpacity>
      <Button
        title="Sair"
        onPress={handleExitApp}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
      />
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 50,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 20,
  },
  buttonTitle: {
    color: '#FFFFFF',
  },
  favoriteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    top: 40,
    right: 20,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#B31B1B',
  }
});

export default HomeScreen;