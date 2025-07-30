// screens/AgricSubjectScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderTitle from '../components/HeaderTitle'; // ✅ Shared header
    

const agricTopics = [
  'Introduction to Agriculture',
  'Branches of Agriculture',
  'Soil Science',
  'Farm Tools and Implements',
  'Crops and Crop Production',
  'Animal Husbandry',
  'Agricultural Ecology',
  'Farming Systems',
  'Agricultural Economics',
  'Agricultural Extension',
];

const AgricSubjectScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* 🔷 Blue header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agricultural Science</Text>
      </View>

      {/* 📘 Table of Contents */}
      <Text style={styles.sectionTitle}>Table of Contents</Text>

      {/* 🔹 Topics list */}
      {agricTopics.map((topic, index) => (
        <TouchableOpacity
          key={index}
          style={styles.topic}
          onPress={() =>
            navigation.navigate('AgricLessonDetail', { topicIndex: index })
          }
        >
          <Text style={styles.topicText}>{index + 1}. {topic}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default AgricSubjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  header: {
    backgroundColor: '#001F54',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001f54',
    marginBottom: 15,
    marginTop: -5,
  },

  topic: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#001F54',
  },

  topicText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
