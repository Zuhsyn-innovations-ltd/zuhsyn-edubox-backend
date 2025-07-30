import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HeaderTitle = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.jpeg')}
        style={styles.logo}
      />
      <Text style={styles.title}>ZUHSYN EDUBOX</Text> {/* Line break to stack text */}
    </View>
  );
};

export default HeaderTitle

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    flexWrap: 'wrap', 
    maxWidth: 160, 
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
    borderRadius: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff', 
    lineHeight: 18,
    
  },
});
