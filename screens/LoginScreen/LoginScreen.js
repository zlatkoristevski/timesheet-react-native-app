import React, { useCallback, useState, useEffect } from 'react';
import { 
          View, 
          ActivityIndicator, 
          Alert, 
          Image, 
          TouchableWithoutFeedback, 
          Keyboard, 
          KeyboardAvoidingView, 
          AsyncStorage ,
          Text
} from 'react-native';
import { useDispatch } from 'react-redux';

import styles from './LoginScreenStyle';

import Input from '../../components/Input';
import CustomSwitch from '../../components/CustomSwitch';

import Colors from '../../constants/colors';


import {
  login,
} from '../../store/actions/auth';


import MainButton from '../../components/MainButton';

const LoginScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLoginData = async () => {
      const loginData = await AsyncStorage.getItem('loginData');
      
      const loginDataArr = JSON.parse(loginData);

      if(loginDataArr != null){
        setEmail(loginDataArr.email);
        setPassword(loginDataArr.password);
        setRememberMe(loginDataArr.remember_me);
      }
      
    } 
      getLoginData();
    
  }, []);
  
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememeberMe, setRememberMe] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const inputChangeHandler = useCallback(
    (event, input_name, requirements = {}) => {
      const value = event;
      let error = false;

      Object.keys(requirements).map((requirement) => {
        if (requirement == 'required') {
          if (value.length == 0) {
            error = true;
          } else {
            error = false;
          }
        }

        if (requirement == 'min') {
          if (value.length <= requirements[requirement]) {
            error = true;
          } else {
            error = false;
          }
        }

        if (requirement == 'email') {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
            error = false;
          } else {
            error = true;
          }
        }
      });



      if (input_name == "email") {
        setEmail(value);
        if (error == true) {
          setEmailValid(false);
        } else {
          setEmailValid(true);
        }
      }

      if (input_name == "password") {
        setPassword(value);

        if (error == true) {
          setPasswordValid(false);
        } else {
          setPasswordValid(true);
        }
      }


    },
    [dispatch, emailValid, passwordValid]
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);


  const loginHandler = async () => {
    // dispatch(login(email, password));
    if(email == '' && password == ''){
      Alert.alert('Warning!', 'Fill the form before submiting', [{ text: 'Okay' }]);
      return;
    }

    if(emailValid == true && passwordValid == true){
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(login(email, password, rememeberMe));
  
        props.navigation.navigate('Timesheet');
      } catch (err) {
        console.log(err);
        setError(err.message);
        setIsLoading(false);
      }
    }else{
      Alert.alert('Warning!', 'Please fix the errors in the form', [{ text: 'Okay' }]);
    }

    
  }

  const toggleRememeberMe = (value) => {
      setRememberMe(value);
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <View style={styles.screen}>
          <View style={styles.loginHolder}>
            <View style={styles.logoContainer}>
              <Image style={styles.logoImage} source={require('../../assets/images/logo.png')} />
            </View>
            <Input
              label="Email"
              placeholder="Enter your email..."
              title="Email input"
              error={!emailValid}
              errorText="Please enter valid email!"
              keyboardType="email-address"
              value={email}
              autoCapitalize="none"
              onInputChange={(event, input_name) => inputChangeHandler(event, "email", {
                'required': true,
                'email': true,
              })}
            />

            <Input
              label="Password"
              placeholder="Enter your password..."
              title="Current Password"
              error={!passwordValid}
              errorText="Please enter your password!"
              keyboardType="default"
              autoCapitalize="none"
              value={password}
              onInputChange={(event, input_name) => inputChangeHandler(event, "password", {
                'required': true,
              })}
              secureTextEntry={true}
              required
            />

            <CustomSwitch
              label="Remember me"
              value={rememeberMe}
              onChange={(value) => { toggleRememeberMe(!rememeberMe) }}
            />


            <View style={styles.inputHolder}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                  <MainButton onPress={() => { loginHandler() }}>LOGIN</MainButton>
                )}

            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};



LoginScreen.navigationOptions = (navigationData) => {

  return {
    headerTitle: 'Login',
  }
};

export default LoginScreen;
