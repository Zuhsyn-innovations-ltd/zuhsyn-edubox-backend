import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';
import { getLeaderboard } from '../utils/dbHelpers'; // ✅ Pull from SQLite

const LeaderboardScreen = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const data = await getLeaderboard(); // ✅ Offline data
      setLeaders(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Renders each leaderboard row
  const renderLeader = ({ item, index }) => {
    let crown = '';
    if (index === 0) crown = '👑';
    else if (index === 1) crown = '🥈';
    else if (index === 2) crown = '🥉';

    return (
      <View style={styles.leaderRow}>
        <Text style={styles.rank}>{index + 1}</Text>
        <Text style={styles.name}>
          {item.username} {crown}
        </Text>
        <Text style={styles.points}>{item.points}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <FlatList
          data={leaders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderLeader}
        />
      )}
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.primary,
  },
  leaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  name: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
    color: Colors.text,
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
});
