import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, BackHandler, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = React.memo(({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      navigation.navigate('Home');
    }
  };

  const isDisabled = !username || !password;

  return (
    <LinearGradient colors={['#B31B1B', '#1E1E1E']} style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/icon.png')} />
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
        title="Entrar"
        onPress={handleLogin}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        disabled={isDisabled}
        disabledStyle={styles.disabledButton}
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
  input: {
    backgroundColor: '#FFF',
    width: '80%',
    marginBottom: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
    fontSize: 15,
    padding: 7,
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
});

export default LoginScreen;