import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { initDB } from './utils/database';
import { seedInitialData, getCurrentUser } from './utils/dbHelpers';
import { AuthProvider, AuthContext } from './src/context/AuthContext';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import EnglishSubjectScreen from './src/screens/EnglishSubjectScreen';
import EnglishLessonDetailScreen from './src/screens/EnglishLessonDetailScreen';
import MathsSubjectScreen from './src/screens/MathsSubjectScreen';
import MathsLessonDetailScreen from './src/screens/MathsLessonDetailScreen';
import PhysicsSubjectScreen from './src/screens/PhysicsSubjectScreen';
import PhysicsLessonDetailScreen from './src/screens/PhysicsLessonDetailScreen';
import ChemistrySubjectScreen from './src/screens/ChemistrySubjectScreen';
import ChemistryLessonDetailScreen from './src/screens/ChemistryLessonDetailScreen';
import BiologySubjectScreen from './src/screens/BiologySubjectScreen';
import BiologyLessonDetailScreen from './src/screens/BiologyLessonDetailScreen';
import AgricSubjectScreen from './src/screens/AgricSubjectScreen';
import AgricLessonDetailScreen from './src/screens/AgricLessonDetailScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import SubjectsScreen from './src/screens/SubjectsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import LeaderBoardScreen from './src/screens/LeaderBoardScreen';
import AboutCompanyScreen from './src/screens/AboutCompanyScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerShown: false,
      drawerStyle: { backgroundColor: '#001F54' },
      drawerLabelStyle: { color: '#fff' },
    }}
  >
    <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    <Drawer.Screen name="Subjects" component={SubjectsScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="LeaderBoard" component={LeaderBoardScreen} />
  </Drawer.Navigator>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        // Initialize DB
        await initDB();
        // Seed offline data
        await seedInitialData();
        // Check if user already logged in
        const user = await getCurrentUser();
        setIsLoggedIn(!!user);
      } catch (err) {
        console.error('App init error:', err);
      } finally {
        setLoading(false);
      }
    };
    initApp();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              {/* Main App Drawer */}
              <Stack.Screen name="Main" component={DrawerNavigator} />
              {/* Lesson Details */}
              <Stack.Screen name="EnglishSubject" component={EnglishSubjectScreen} />
              <Stack.Screen name="EnglishLessonDetail" component={EnglishLessonDetailScreen} />
              <Stack.Screen name="MathsSubject" component={MathsSubjectScreen} />
              <Stack.Screen name="MathsLessonDetail" component={MathsLessonDetailScreen} />
              <Stack.Screen name="PhysicsSubject" component={PhysicsSubjectScreen} />
              <Stack.Screen name="PhysicsLessonDetail" component={PhysicsLessonDetailScreen} />
              <Stack.Screen name="ChemistrySubject" component={ChemistrySubjectScreen} />
              <Stack.Screen name="ChemistryLessonDetail" component={ChemistryLessonDetailScreen} />
              <Stack.Screen name="BiologySubject" component={BiologySubjectScreen} />
              <Stack.Screen name="BiologyLessonDetail" component={BiologyLessonDetailScreen} />
              <Stack.Screen name="AgricSubject" component={AgricSubjectScreen} />
              <Stack.Screen name="AgricLessonDetail" component={AgricLessonDetailScreen} />
              <Stack.Screen name="AboutCompany" component={AboutCompanyScreen} />
            </>
          ) : (
            <>
              {/* Auth Screens */}
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
              <Stack.Screen name="AboutCompany" component={AboutCompanyScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
