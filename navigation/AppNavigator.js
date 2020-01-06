import React from 'react';
import { createAppContainer, SafeAreaView, StackActions, NavigationActions, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Platform, View, Image, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import TimesheetScreen from '../screens/TimesheetScreen/TimesheetScreen';
import TestScreen from '../screens/TestScreen/TestScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import EventsScreen from '../screens/EventsScreen/EventsScreen';
import StartupScreen from '../screens/StartupScreen';

import MainButton from '../components/MainButton';


import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

import {
  logout,
} from '../store/actions/auth';



const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    // fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    // fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};




const TimesheetNavigator = createStackNavigator(
  {
    Timesheet: TimesheetScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-stopwatch' : 'ios-stopwatch'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTitleStyle: {
        fontFamily: 'montserrat-light',
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primary,
      headerTitle: 'A Screen',
    }
  }
);


const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTitleStyle: {
        fontFamily: 'montserrat-light',
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primary,
      headerTitle: 'A Screen',
    }
  }
);

const EventsNavigator = createStackNavigator(
  {
    Events: EventsScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}
          size={23}
          color="black"
        />
      )
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTitleStyle: {
        fontFamily: 'montserrat-light',
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primary,
      headerTitle: 'A Screen',
    }
  }
);

const LoginNavigator = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);


const AppNavigator = createDrawerNavigator(
  {

    Timesheet: TimesheetNavigator,
    Profile: ProfileNavigator,
    // Events: EventsNavigator
  },
  {
    contentComponent: (props) => {
      const logged_in_company_logo = useSelector(state => state.auth.logged_in_company_logo);
      // console.log(logged_in_company_logo);

      const dispatch = useDispatch();
      return (
        <SafeAreaView>
          <View style={styles.logoContainer}>
            {/* <Image style={styles.logoImage} source={require('../assets/images/logo.png')} /> */}
            <Image source={{ uri: logged_in_company_logo }} style={styles.logoImage} />
          </View>
          <ScrollView>
            <DrawerItems
              {...props}
            />
            <View style={styles.logoutButtonContainer}>
              <MainButton
                title="Logout"
                style={styles.mainButton}
                onPress={() => {
                  dispatch(logout());
                  props.navigation.navigate('Login');

                }}
              >Logout</MainButton>
            </View>
          </ScrollView>
        </SafeAreaView>);
    }
  },
  {
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      },
      labelStyle: {
        // fontFamily: 'SomeFont',
        color: 'white',
      },
    },

  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Login: LoginNavigator,
  App: AppNavigator
});


const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logoImage: {
    width: '40%',
    height: 100,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'montserrat-light',
    padding: 10,
    color: Colors.secondary,
  },
  button: {

  },
  logoutButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainButton: {
    width: '50%',
    resizeMode: 'contain'
  }
});

export default createAppContainer(MainNavigator);
