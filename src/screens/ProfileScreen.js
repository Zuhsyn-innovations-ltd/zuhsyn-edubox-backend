// src/screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderTitle from '../components/HeaderTitle';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedName = await AsyncStorage.getItem('user_name');
        const storedEmail = await AsyncStorage.getItem('user_email');
        const storedPhone = await AsyncStorage.getItem('user_phone');
        setName(storedName || '');
        setEmail(storedEmail || '');
        setPhone(storedPhone || '');
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUser();
  }, []);

  const handleUpdate = async () => {
    if (password && password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    try {
      await AsyncStorage.setItem('user_name', name);
      await AsyncStorage.setItem('user_phone', phone);

      // If password is changed, store it locally (hashing recommended)
      if (password) {
        await AsyncStorage.setItem('user_password', password);
      }

      Alert.alert('✅ Success', 'Profile updated locally');
    } catch (err) {
      console.error('Error updating profile:', err);
      Alert.alert('Update Failed', 'Something went wrong while saving');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <HeaderTitle />
        </View>
      </View>

      <Text style={styles.screenTitle}>Profile</Text>

      <Image
        source={require('../../assets/images/default-avatar.jpg')}
        style={styles.logo}
      />

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        editable={false}
        style={[styles.input, { backgroundColor: '#f0f0f0' }]}
      />
      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <Text style={styles.section}>Change Password</Text>
      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#001F54',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
  },
  headerTitleWrap: {
    marginLeft: 10,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001F54',
    marginBottom: 20,
    marginLeft: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 25,
    borderRadius: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#001F54',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 15,
  },
  section: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#001F54',
  },
  button: {
    backgroundColor: '#001F54',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
