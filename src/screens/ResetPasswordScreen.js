// src/screens/ResetPasswordScreen.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, Alert, StyleSheet, Platform, ToastAndroid,
} from 'react-native';
import {
  getCurrentUser,
  verifyUserPassword,
  updateUserPassword,
  logoutUser,
} from '../utils/dbHelper';

const ResetPasswordScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const u = await getCurrentUser();
      setCurrentUser(u); // null if no session
    };
    loadUser();
  }, []);

  const showToast = (msg) => {
    if (Platform.OS === 'android') ToastAndroid.show(msg, ToastAndroid.SHORT);
    else Alert.alert(msg);
  };

  const handleChangePassword = async () => {
    if (!currentUser) {
      Alert.alert('Not logged in', 'You must be logged in to change your password.');
      return;
    }
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // Verify old password
      const ok = await verifyUserPassword(currentUser.email, oldPassword);
      if (!ok) {
        Alert.alert('Error', 'Current password is incorrect.');
        setLoading(false);
        return;
      }

      // Update password in local DB
      await updateUserPassword(currentUser.id, newPassword);

      // For security, log the user out and ask to login again
      await logoutUser();

      showToast('✅ Password updated. Please login again.');
      navigation.replace('Login');
    } catch (err) {
      console.error('Password change error:', err);
      Alert.alert('Error', 'Could not update password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.info}>
          You must be logged in to change your password. Please login first.
        </Text>

        <View style={{ marginTop: 20 }}>
          <Button title="Go to Login" color="#001F54" onPress={() => navigation.replace('Login')} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.sub}>Account: {currentUser.email}</Text>

      <TextInput
        placeholder="Current password"
        secureTextEntry
        style={styles.input}
        value={oldPassword}
        onChangeText={setOldPassword}
      />

      <TextInput
        placeholder="New password"
        secureTextEntry
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        placeholder="Confirm new password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={{ marginTop: 10 }}>
        <Button
          title={loading ? 'Updating...' : 'Update Password'}
          color="#001F54"
          onPress={handleChangePassword}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#001F54', textAlign: 'center' },
  sub: { fontSize: 14, color: '#333', marginBottom: 20, textAlign: 'center' },
  info: { fontSize: 16, color: '#444', textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 12, borderColor: '#ccc' },
});
