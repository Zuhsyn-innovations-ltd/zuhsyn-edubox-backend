import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, TouchableOpacity,
  StyleSheet, Image, Alert, Platform, ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../utils/dbHelpers'; // SQLite helper

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('❌ Error', 'Please enter email and password');
      return;
    }

    try {
      const user = await loginUser(email.trim(), password);

      if (!user) {
        Alert.alert('❌ Login Failed', 'Invalid email or password.');
        return;
      }

      // Save user info for global access
      await AsyncStorage.multiSet([
        ['current_user', JSON.stringify(user)],
        ['user_name', user.name || ''],
        ['user_level', user.level ? String(user.level) : '1'],
        ['user_last_subject', user.lastSubject || 'Maths']
      ]);

      if (Platform.OS === 'android') {
        ToastAndroid.show('✅ Login Successful', ToastAndroid.SHORT);
      } else {
        Alert.alert('✅ Login Successful');
      }

      navigation.replace('Main'); // Navigate to the dashboard stack
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('❌ Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>

      <Image
        source={require('../../assets/images/logo.jpeg')}
        style={styles.logo}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={{ marginBottom: 20 }}>
        <Button title="Login" color="#001F54" onPress={handleLogin} />
      </View>

      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.forget}>Don't have an account?</Text>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.replace('Register')}
      >
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#001F54',
    textAlign: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 60,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  link: {
    color: '#001F54',
    marginTop: 10,
    textAlign: 'center',
  },
  forget: {
    color: '#001F54',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#fff',
    borderColor: '#001F54',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#001F54',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
