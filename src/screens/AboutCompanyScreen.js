// screens/AboutCompanyScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';

const socialLinks = [
  { label: '🌐 Visit Our Website', url: 'https://www.example.com' },
  { label: '📘 Facebook', url: 'https://facebook.com/yourpage' },
  { label: '🐦 Twitter', url: 'https://twitter.com/yourpage' },
  { label: '📷 Instagram', url: 'https://instagram.com/yourpage' },
  { label: '💼 LinkedIn', url: 'https://linkedin.com/company/yourpage' },
];

export default function AboutCompanyScreen() {
  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open the link.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About Our Company</Text>
      <Text style={styles.description}>
        EduBox is an innovative learning platform that provides educational resources, quizzes, and study materials for students of all ages. 
        Our mission is to make learning accessible, engaging, and effective for everyone.
      </Text>

      <Text style={styles.subtitle}>Follow Us</Text>
      {socialLinks.map((link, index) => (
        <TouchableOpacity
          key={index}
          style={styles.linkButton}
          onPress={() => openLink(link.url)}
        >
          <Text style={styles.linkText}>{link.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E86C1',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    color: '#555',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2E86C1',
  },
  linkButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#2E86C1',
    fontWeight: '500',
  },
});
