import React, { useState  } from 'react';
import { StyleSheet, StatusBar, Platform, SafeAreaView } from 'react-native';
import { useScreens } from 'react-native-screens';


//ACTIVATE REDUX
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

//LOAD REDUCERS
import authReducer from './store/reducers/auth';
import timesheetReducer from './store/reducers/timesheet';
import profileReducer from './store/reducers/profile';
import calendarReducer from './store/reducers/calendar';

const rootReducer = combineReducers({
  auth: authReducer,
  timesheet: timesheetReducer,
  profile: profileReducer,
  calendar: calendarReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


import * as Font from 'expo-font';
import { AppLoading } from 'expo';


import AppNavigator from './navigation/AppNavigator';

useScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'montserrat-light': require('./assets/fonts/Montserrat-Regular.otf'),
    'montserrat-regular': require('./assets/fonts/Montserrat-Regular.otf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.otf'),
  });
};



export default function App() {

  Platform.OS === 'android' ? StatusBar.setBarStyle('light-content', true) : StatusBar.setBarStyle('dark-content', true);
  
  

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }


  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
