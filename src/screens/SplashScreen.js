import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../constants/colors';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to the login screen after 3 seconds
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.jpeg')}
        style={styles.logo}
      />
      <View style={styles.row}>
      <View style={styles.textContainer}>
      <Text style={styles.zuhsyn}>ZUHSYN</Text>
      <Text style={styles.edu}>EDU</Text>
    </View>

    <LottieView
      source={require('../../assets/animations/edu-box.json')}
      autoPlay
      loop
      style={styles.animation}
    />
    </View>

    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: Colors.primary,
  justifyContent: 'center',
  alignItems: 'center',
},

logo: {
  width: 200,
  height: 200,
  resizeMode: 'contain',
  marginBottom: 10,
  borderRadius: 100,
},

row: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

textContainer: {
  marginRight: 10,
  alignItems: 'flex-start',
},

zuhsyn: {
  fontSize: 40,
  fontWeight: 'bold',
  color: '#fff',
  lineHeight: 45,
},

edu: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#fff',
},

animation: {
  width: 100,
  height: 100,
},
});
// This code defines a SplashScreen component that displays a logo and an animation.