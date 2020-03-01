import React from 'react';
import { 
  createAppContainer, 
  SafeAreaView, 
  createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator}  from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Platform, View, Image, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import TimesheetScreen from '../screens/TimesheetScreen/TimesheetScreen';
import TestScreen from '../screens/TestScreen/TestScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import PikselCalendarScreen from '../screens/PikselCalendarScreen/PikselCalendarScreen';
import MyCalendarScreen from '../screens/MyCalendarScreen/MyCalendarScreen';
import ListEventsScreen from '../screens/ListEventsScreen/ListEventsScreen';
import ListDayEventsScreen from '../screens/ListDayEventsScreen/ListDayEventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen/EventDetailScreen';
import AddEventScreen from '../screens/AddEventScreen/AddEventScreen';
import InvitationsScreen from '../screens/InvitationsScreen/InvitationsScreen';
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
      // drawerLabel: () => null,
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-stopwatch' : 'ios-stopwatch'}
          size={23}
          color={Colors.tirkiz}
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
          color={Colors.tirkiz}
        />
      ),
      
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

const PikselCalendarNavigator = createStackNavigator(
  {
    PikselCalendar: {
      screen: PikselCalendarScreen
    },
    EventDetail: {
      screen: EventDetailScreen
    },
    AddEvent: {
      screen: AddEventScreen
    },
    ListDayEvents: {
      screen: ListDayEventsScreen
    }
  },
  {
    // initialRouteName: 'Categories',
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


const MyCalendarNavigator = createStackNavigator(
  {
    MyCalendar: {
      screen: MyCalendarScreen
    },
    EventDetail: {
      screen: EventDetailScreen
    },
    AddEvent: {
      screen: AddEventScreen
    },
    ListDayEvents: {
      screen: ListDayEventsScreen
    }
  },
  {
    // initialRouteName: 'Categories',
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

const ListEventsNavigator = createStackNavigator(
  {
    ListEvents: {
      screen: ListEventsScreen
    },
    AddEvent: {
      screen: AddEventScreen
    },
    EventDetail: {
      screen: EventDetailScreen
    },
    
  },
  {
    
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


const InvitationsNavigator = createStackNavigator(
  {
    Invitations: {
      screen: InvitationsScreen
    },
    EventDetail: {
      screen: EventDetailScreen
    },
    AddEvent: {
      screen: AddEventScreen
    },
  },
  {
    // initialRouteName: 'Categories',
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

const tabScreenConfig = {
  Calendar: {
    screen: PikselCalendarNavigator,
    navigationOptions: {
      tabBarLabel: 'Company Cal.',
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name="ios-calendar"
            size={25}
            color={Platform.OS === 'android' ? Colors.white : Colors.tirkiz} />
        );
      },
      tabBarOptions: { activeTintColor: Platform.OS === 'android' ? Colors.white : Colors.tirkiz, }
    }
  },
  ListEvents: {
    screen: ListEventsNavigator,
    navigationOptions: {
      tabBarLabel: 'List Events',
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-list" size={25} color={Platform.OS === 'android' ? Colors.white : Colors.tirkiz} />
          );
      },
      tabBarOptions: { activeTintColor: Platform.OS === 'android' ? Colors.white : Colors.tirkiz, }
    }
  },
  Invitations: {
    screen: InvitationsNavigator,
    navigationOptions: {
      tabBarLabel: 'Invitations',
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-paper-plane" size={25} color={Platform.OS === 'android' ? Colors.white : Colors.tirkiz} />
        );
      },
      tabBarOptions: { activeTintColor: Platform.OS === 'android' ? Colors.white : Colors.tirkiz, }
    }
  },
  
  MyCalendar: {
    screen: MyCalendarNavigator,
    navigationOptions: {
      tabBarLabel: 'My Cal.',
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-today" size={25} color={Platform.OS === 'android' ? Colors.white : Colors.tirkiz} />
        );
      },
      tabBarOptions: { activeTintColor: Platform.OS === 'android' ? Colors.white : Colors.tirkiz, }
    }
  },
  
};

const CalendarBottomNavigator = Platform.OS === 'android'
? createMaterialBottomTabNavigator(tabScreenConfig, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}
        size={23}
        color={Colors.tirkiz}
      />
    )
  },
    activeTintColor: 'white',
    shifting: true,
    barStyle: {
      backgroundColor: Colors.tirkiz
    }
  })
: createBottomTabNavigator(tabScreenConfig, {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}
          size={23}
          color={Colors.tirkiz}
        />
      )
    },
    tabBarOptions: {
      labelStyle: {
        fontFamily: 'open-sans'
      },
      activeTintColor: Colors.accentColor
    }
  });

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
    Calendar: CalendarBottomNavigator,
    Timesheet: TimesheetNavigator,
    Profile: ProfileNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.tirkiz
    },
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



const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Login: LoginNavigator,
  App: AppNavigator
});

export default createAppContainer(MainNavigator);


