import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleRegister = async () => {
    if (password1 !== password2) {
      return Alert.alert("Error", "Passwords do not match");
    }

    try {
      const response = await axios.post('http://10.0.2.2:8000/api/register/', {
        name,
        email,
        password: password1,
      });

      if (response.status === 201) {
        Alert.alert("✅ Success", "Registration complete. Please login.");
        navigation.replace('Login');
      }
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert("Registration Failed", JSON.stringify(error.response?.data));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Image
        source={require('../../assets/images/logo.jpeg')}
        style={styles.logo}
      />

      <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password1} onChangeText={setPassword1} />
      <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry value={password2} onChangeText={setPassword2} />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>

      <Text style={styles.have}>Already have an account?</Text>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('Login')}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#001F54', textAlign: 'center' },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 60,
  },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, borderColor: '#ccc' },
  have: { color: '#001F54', marginTop: 10, fontSize: 16, textAlign: 'center' },
  loginButton: {
    backgroundColor: '#fff',
    borderColor: '#001F54',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: { color: '#001F54', fontWeight: 'bold', fontSize: 16 },
  registerButton: {
    backgroundColor: '#001F54',
    borderColor: '#001F54',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
