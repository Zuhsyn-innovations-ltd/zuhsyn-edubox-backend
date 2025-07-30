// src/screens/ResetPasswordScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const ResetPasswordScreen = ({ route, navigation }) => {
  const { uid, token } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match.');
    }

    try {
      const response = await axios.post('http://10.0.2.2:8000/api/reset-password/', {
        uid,
        token,
        new_password: newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Password has been reset.');
        navigation.replace('Login'); // Or navigate to login screen
      }
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert('Failed', error.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>

      <TextInput
        placeholder="New Password"
        secureTextEntry
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        placeholder="Confirm New Password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button title="Reset Password" color="#001F54" onPress={handleReset} />
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#001F54', textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 15 },
});
