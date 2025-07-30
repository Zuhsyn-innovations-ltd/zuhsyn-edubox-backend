import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../components/HeaderTitle';

const LeaderBoardScreen = () => {
  const navigation = useNavigation();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/api/leaderboard/');
      setLeaders(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => {
    const crown =
      index === 0
        ? require('../../assets/icons/gold.jpg')
        : index === 1
        ? require('../../assets/icons/silver.jpg')
        : index === 2
        ? require('../../assets/icons/bronze.jpg')
        : null;

    return (
      <View style={styles.card}>
        <View style={styles.rankWrap}>
          <Text style={styles.rank}>{index + 1}</Text>
          {crown && <Image source={crown} style={styles.crown} />}
        </View>

        <Image
          source={require('../../assets/images/default-avatar.jpg')}
          style={styles.avatar}
        />

        <View style={styles.info}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.details}>Level {item.level} • {item.points} pts</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#001F54" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <HeaderTitle />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.screenTitle}>🏆 Leaderboard</Text>

      <FlatList
        data={leaders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default LeaderBoardScreen;

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
    marginBottom: 20,
    borderRadius: 8,
  },
  headerTitleWrap: {
    marginLeft: 10,
  },

  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001F54',
    marginBottom: 15,
    marginLeft: 5,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F6FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  rankWrap: {
    width: 40,
    alignItems: 'center',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F54',
  },
  crown: {
    width: 20,
    height: 20,
    marginTop: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 17,
    fontWeight: '600',
    color: '#001F54',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
