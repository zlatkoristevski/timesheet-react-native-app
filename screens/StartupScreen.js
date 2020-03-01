import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';

import registerForPushNotificationsAsync from '../helpers/registerForPushNotifications';


import Colors from '../constants/colors';

import { 
  setLoggedIn,
  setProfileData
} from '../store/actions/auth';


const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      // AsyncStorage.removeItem('userData');
      // AsyncStorage.removeItem('loginData');

      const userData = await AsyncStorage.getItem('userData');
      
      if (userData === null) {
        props.navigation.navigate('Login');
        return;
      }else{
        const userDataArr = JSON.parse(userData);


        const todaysDate = new Date();
        const expirationDate = toJSDate(userDataArr.tokenExpiresAt);

        registerForPushNotificationsAsync(userDataArr.userId, userDataArr.token);

        if (expirationDate <= todaysDate) {
          props.navigation.navigate('Login');
          return;
        }

        dispatch(
          setLoggedIn(
            userDataArr.userId,
            userDataArr.userName,
            userDataArr.companyId,
            userDataArr.departmentId,
            userDataArr.companyLogo,
            userDataArr.token,
          )
        );

        dispatch(
          setProfileData(
            userDataArr.userName,
            userDataArr.userEmail,
          )
        );
          
        if(userDataArr.departmentId == "Management"){
          props.navigation.navigate('Calendar');
        }else{
          props.navigation.navigate('App');
        }
        
      }
      // console.log(userData);
      
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

//convert DateTime (dd-mm-yyyy hh-mm) to javascript DateTIme
//Ex: 16-11-2015 16:05
toJSDate = ( dateTime ) => {

  var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time
  
  var date = dateTime[0].split("-");
  var time = dateTime[1].split(":");
  
  //(year, month, day, hours, minutes, seconds, milliseconds)
  //subtract 1 from month because Jan is 0 and Dec is 11
  return new Date(date[0], (date[1]-1), date[2], time[0], time[1], time[2], 0);
  
  }

export default StartupScreen;
