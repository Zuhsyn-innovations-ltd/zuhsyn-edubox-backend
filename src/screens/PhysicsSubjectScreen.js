// screens/PhysicsSubjectScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getDBConnection } from '../utils/database'; // ✅ SQLite DB connection

const PhysicsSubjectScreen = () => {
  const navigation = useNavigation();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const db = await getDBConnection();
        const results = await db.executeSql(`SELECT * FROM physics_topics ORDER BY id ASC`);
        
        if (results[0].rows.length > 0) {
          const loadedTopics = [];
          for (let i = 0; i < results[0].rows.length; i++) {
            loadedTopics.push(results[0].rows.item(i).title);
          }
          setTopics(loadedTopics);
        } else {

          // ✅ Insert default topics if DB is empty
          const defaultTopics = [
            'Introduction to Physics',
            'Measurement',
            'Motion',
            'Forces',
            'Work, Energy & Power',
            'Simple Machines',
            'Heat Energy',
            'Light (Reflection & Refraction)',
            'Sound Waves',
            'Electricity & Magnetism',
          ];

          for (const topic of defaultTopics) {
            await db.executeSql(`INSERT INTO physics_topics (title) VALUES (?);`, [topic]);
          }
          setTopics(defaultTopics);
        }
      } catch (error) {
        console.error("Error loading topics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#001F54" />
        <Text>Loading topics...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 🔷 Blue header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Physics</Text>
      </View>

      {/* 📘 Table of Contents */}
      <Text style={styles.sectionTitle}>Table of Contents</Text>

      {/* 🔹 Topics list */}
      {topics.map((topic, index) => (
        <TouchableOpacity
          key={index}
          style={styles.topic}
          onPress={() =>
            navigation.navigate('PhysicsLessonDetail', { topicIndex: index })
          }
        >
          <Text style={styles.topicText}>{index + 1}. {topic}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default PhysicsSubjectScreen;

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

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
