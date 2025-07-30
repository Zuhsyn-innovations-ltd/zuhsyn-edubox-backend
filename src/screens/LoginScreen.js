import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, TouchableOpacity,
  StyleSheet, Image, Alert,
} from 'react-native';
import { Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  try {
    const response = await axios.post('http://10.0.2.2:8000/api/login/', {
      email,
      password,
    });

    const { access, refresh } = response.data;

    await AsyncStorage.setItem('access_token', access);
    await AsyncStorage.setItem('refresh_token', refresh);

    // Get user profile
    const profileRes = await axios.get('http://10.0.2.2:8000/api/user/profile/', {
      headers: { Authorization: `Bearer ${access}` },
    });

    const { name, level, last_subject } = profileRes.data;
    if (name) await AsyncStorage.setItem('user_name', name);
    if (level) await AsyncStorage.setItem('user_level', level.toString());
    if (last_subject) await AsyncStorage.setItem('user_last_subject', last_subject);

    // Toast or Alert
    if (Platform.OS === 'android') {
      ToastAndroid.show('✅ Login Successful', ToastAndroid.SHORT);
    } else {
      Alert.alert('✅ Login Successful');
    }

    navigation.replace('Main');
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);

    let errorMessage = 'Login failed. Please try again.';
    if (error.response?.data?.non_field_errors) {
      errorMessage = error.response.data.non_field_errors[0];
    } else if (error.response?.data?.detail) {
      errorMessage = error.response.data.detail;
    }

    Alert.alert('❌ Login Failed', errorMessage);
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

// Styles remain unchanged...

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
