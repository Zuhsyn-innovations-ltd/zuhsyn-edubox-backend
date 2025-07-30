import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../components/HeaderTitle';

const AboutCompanyScreen = () => {
  const navigation = useNavigation();

  const openLink = (url) => Linking.openURL(url);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <HeaderTitle />
        </View>
      </View>

      {/* Logo */}
      <Image
        source={require('../../assets/images/logo.jpeg')}
        style={styles.logo}
      />

      {/* Company Description */}
      <Text style={styles.title}>About Zuhsyn Innovation Limited</Text>
      <Text style={styles.description}>
        Zuhsyn Innovation Limited is a forward-thinking company driving the future of innovation and technology. 
        We are dedicated to building next-generation solutions that empower communities across the world.
      </Text>

      {/* Fields */}
      <Text style={styles.sectionTitle}>Our Focus Areas</Text>
      <View style={styles.bullets}>
        <Text style={styles.bullet}>• Software Development</Text>
        <Text style={styles.bullet}>• Web Development</Text>
        <Text style={styles.bullet}>• Mobile App Development</Text>
        <Text style={styles.bullet}>• Artificial Intelligence</Text>
        <Text style={styles.bullet}>• Machine Learning</Text>
        <Text style={styles.bullet}>• Education Technology</Text>
        <Text style={styles.bullet}>• Community Empowerment Projects</Text>
      </View>

      {/* Social Links */}
      <Text style={styles.sectionTitle}>Connect with Us</Text>

      <TouchableOpacity onPress={() => openLink('https://github.com/zuhsyn')} style={styles.linkRow}>
        <Icon name="logo-github" size={20} color="#001F54" />
        <Text style={styles.linkText}>GitHub: github.com/zuhsyn</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openLink('https://www.instagram.com/zuhsyn')} style={styles.linkRow}>
        <Icon name="logo-instagram" size={20} color="#001F54" />
        <Text style={styles.linkText}>Instagram: @zuhsyn</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openLink('https://www.twitter.com/zuhsyn')} style={styles.linkRow}>
        <Icon name="logo-twitter" size={20} color="#001F54" />
        <Text style={styles.linkText}>Twitter: @zuhsyn</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openLink('https://zuhsyn.com')} style={styles.linkRow}>
        <Icon name="globe-outline" size={20} color="#001F54" />
        <Text style={styles.linkText}>Website: zuhsyn.com</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default AboutCompanyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#001F54',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerTitleWrap: {
    marginLeft: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#001F54',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F54',
  },
  bullets: {
    marginLeft: 30,
    marginTop: 10,
  },
  bullet: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 20,
  },
  linkText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#001F54',
  },
});
