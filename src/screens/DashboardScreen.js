import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderTitle from '../components/HeaderTitle';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: '',
    level: '',
    lastSubject: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const name = await AsyncStorage.getItem('user_name');
        const level = await AsyncStorage.getItem('user_level');
        const lastSubject = await AsyncStorage.getItem('user_last_subject');

        setUser({
          name: name || 'Guest',
          level: level || '1',
          lastSubject: lastSubject || 'Maths',
        });
      } catch (error) {
        console.log('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    setShowOptions(false);
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  const navigateToLastSubject = () => {
    const screenMap = {
      Maths: 'MathsSubject',
      English: 'EnglishSubject',
      Physics: 'PhysicsSubject',
      Chemistry: 'ChemistrySubject',
      Biology: 'BiologySubject',
      Agric: 'AgricSubject',
    };

    const screen = screenMap[user.lastSubject] || 'Subjects';
    navigation.navigate(screen);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#001F54" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Icon name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        <HeaderTitle />

        <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
          <Icon name="dots-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.screenTitle}>Dashboard</Text>

      {/* Options Dropdown */}
      {showOptions && (
        <View style={styles.popup}>
          <TouchableOpacity onPress={() => {
            setShowOptions(false);
            navigation.navigate('AboutCompany');
          }}>
            <Text style={styles.popupText}>About Company</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.popupText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sidebar Menu */}
      <Modal visible={showMenu} animationType="slide" transparent>
        <View style={styles.menuOverlay}>
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Menu</Text>
            {['Dashboard', 'Subjects', 'Profile'].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setShowMenu(false);
                  navigation.navigate(item);
                }}>
                <Text style={styles.menuItem}>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowMenu(false)}>
              <Text style={styles.menuItem}>Update App</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowMenu(false)}>
              <Text style={styles.menuClose}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Main Content */}
      <View style={styles.container}>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcome}>Welcome!</Text>
          <Text style={styles.user}>{user.name}</Text>
          <Text style={styles.level}>Level {user.level}</Text>
          <TouchableOpacity onPress={navigateToLastSubject}>
            <Text style={styles.subject}>Continue: {user.lastSubject}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Subjects')}>
            <Text style={styles.cardText}>Subjects</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('LeaderBoard')}>
            <Text style={styles.cardText}>Leader Board</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.cardText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => alert('Update App feature coming soon')}>
            <Text style={styles.cardText}>Update App</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  header: {
    backgroundColor: '#001F54',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001F54',
    marginVertical: 20,
    marginLeft: 10,
  },

  popup: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 70,
    right: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    elevation: 5,
    zIndex: 10,
  },

  popupText: {
    padding: 12,
    fontSize: 16,
    color: '#001F54',
  },

  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },

  menuContainer: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    width: '70%',
    height: '100%',
    elevation: 5,
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#001F54',
  },

  menuItem: {
    fontSize: 16,
    paddingVertical: 12,
    color: '#001F54',
  },

  menuClose: {
    fontSize: 24,
    color: 'red',
    textAlign: 'center',
    marginTop: 30,
  },

  welcomeBox: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    elevation: 2,
  },

  welcome: {
    fontSize: 18,
    color: '#555',
  },

  user: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#001F54',
  },

  level: {
    fontSize: 16,
    color: '#888',
  },

  subject: {
    fontSize: 16,
    marginTop: 10,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },

  card: {
    width: '47%',
    backgroundColor: '#001F54',
    padding: 45,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
