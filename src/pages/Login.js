import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, BackHandler, TextInput, ActivityIndicator, Text} from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Asset } from 'expo-asset';
const icon = Asset.fromModule(require('../../assets/icon.png')).uri;

const LoginScreen = React.memo(({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogin = () => {
    if (username && password) {
      setIsLoading(true);
      // simulando um tempo de espera
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('Home');
      }, 2000);
    }
  };

  const isDisabled = !username || !password;

  return (
    <LinearGradient colors={['#B31B1B', '#1E1E1E']} style={styles.container}>
      <Image style={styles.logo} source={{uri: icon}} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        onChangeText={setUsername}
        value={username}
        placeholder="Usuário"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        autoCorrect={false}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <Button
        title={isLoading ? 'Entrando...' : 'Entrar'}
        onPress={handleLogin}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        disabled={isDisabled}
        disabledStyle={styles.disabledButton}
      />
      {isLoading && <ActivityIndicator size="large" color="#FFFFFF" />}
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
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
  input: {
    backgroundColor: '#FFF',
    width: '80%',
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
    fontSize: 15,
    padding: 15,
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
});

export default LoginScreen;