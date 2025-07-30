import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../components/HeaderTitle'; // ✅ Shared header

const subjects = ['Maths', 'Chemistry', 'English', 'Biology', 'Physics', 'Agric Science'];

const SubjectsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top bar with back button + logo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <HeaderTitle />
        </View>
      </View>

      {/* Screen-specific title */}
      <Text style={styles.screenTitle}>Subjects</Text>

      {/* Grid */}
      <FlatList
        data={subjects}
        numColumns={2}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            switch (item) {
              case 'Maths':
                navigation.navigate('MathsSubject');
                break;
              case 'English':
                navigation.navigate('EnglishSubject');
                break;
              case 'Chemistry':
                navigation.navigate('ChemistrySubject');
                break;
              case 'Biology':
                navigation.navigate('BiologySubject');
                break;
              case 'Physics':
                navigation.navigate('PhysicsSubject');
                break;
              case 'Agric Science':
                navigation.navigate('AgricSubject');
                break;
              default:
                break;
            }
          }}
        >
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      )}

        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

export default SubjectsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#001F54',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerTitleWrap: {
    marginLeft: 10,
  },

  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001F54',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 5,
  },

  card: {
    backgroundColor: '#001F54',
    padding: 30,
    borderRadius: 10,
    marginBottom: 30,
    width: '47%',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
