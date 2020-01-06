import React, {useCallback, useState, useEffect} from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { 
  setProfileName,
  setProfilePassword,
  setProfileNewPassword,
  changePassword
} from '../../store/actions/profile';

import HeaderButton from '../../components/HeaderButton';

import styles from './ProfileScreenStyle';
import Colors from '../../constants/colors';

import Input from '../../components/Input';


import MainButton from '../../components/MainButton';

const ProfileScreen = props => {
  const profileData = useSelector(state => state.profile.profileData);
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [profileNameValid, setProfileNameValid] = useState(true);
  const [currentPasswordValid, setCurrentPasswordValid] = useState(true);
  const [newPasswordValid, setNewPasswordValid] = useState(true);

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const inputChangeHandler = useCallback(
    (event, input_name, requirements = {}) => {
      const value = event;
      let error = false;

      Object.keys(requirements).map((requirement) => {
          if(requirement == 'required'){
            if(value.length == 0){
              error = true;
            }else{
              error = false;
            }
          }

          if(requirement == 'min'){
            if(value.length <= requirements[requirement]){
              error = true;
            }else{
              error = false;
            }
          }
      });



      if(input_name == "profile_name"){
        dispatch(setProfileName( value ));

        if(error == true){
          setProfileNameValid(false);
        }else{
          setProfileNameValid(true);
        }
      }

      if(input_name == "profile_password"){
        dispatch(setProfilePassword( value ));

        if(error == true){
          setCurrentPasswordValid(false);
        }else{
          setCurrentPasswordValid(true);
        }
      }

      if(input_name == "profile_new_password"){
        dispatch(setProfileNewPassword( value ));

        if(error == true){
          setNewPasswordValid(false);
        }else{
          setNewPasswordValid(true);
        }
      }

    },
    [dispatch, profileNameValid, currentPasswordValid, newPasswordValid]
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const changePasswordHandler = async () => {
    const id = authData.logged_in_user;
    const email = profileData[0].profile_email;
    const current_pass = profileData[0].profile_password;
    const new_pass = profileData[0].profile_new_password;

    console.log(id);

    setError(null);
    setIsLoading(true);
    try {
      const change_pass_response = await dispatch(changePassword( id , email , current_pass , new_pass ));

      console.log(change_pass_response);
      if(change_pass_response == true){
        Alert.alert('Success!', 'Your password has been changed successfully', [{ text: 'Okay' }]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={100}
        >
        <ScrollView style={styles.screen}>
          <Input 
            label="Name"
            placeholder="Enter your name..." 
            title="Name input"
            error={!profileNameValid}
            errorText="Please enter valid name!"
            keyboardType="default"
            value={profileData[0].profile_name}
            onInputChange={(event, input_name) => inputChangeHandler(event, "profile_name", {
              'required': true,
              'min': 3,
            })}
          />

          <Input 
            label="Email"
            placeholder="Enter your email..." 
            title="Name email"
            errorText="Please enter valid name!"
            keyboardType="default"
            value={profileData[0].profile_email}
          />

          <Input 
            label="Current Password"
            placeholder="Enter your current password..." 
            title="Current Password"
            error={!currentPasswordValid}
            errorText="Please enter your current password!"
            keyboardType="default"
            value={profileData[0].profile_password}
            onInputChange={(event, input_name) => inputChangeHandler(event, "profile_password", {
              'required': true,
            })}
            secureTextEntry={true}
            required
          />

          <Input 
            label="New password"
            placeholder="Enter your new password..." 
            title="New Password"
            error={!newPasswordValid}
            errorText="Please enter valid password!"
            keyboardType="default"
            value={profileData[0].profile_new_password}
            onInputChange={(event, input_name) => inputChangeHandler(event, "profile_new_password", {
              'required': true,
              'min': 8,
            })}
            secureTextEntry={true}
          />



          <View style={styles.inputHolder}>
          {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <MainButton onPress={() => { changePasswordHandler(); }}>Save</MainButton>
            )}
            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};


ProfileScreen.navigationOptions = (navigationData) => {

  return {headerTitle: 'My Profile',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  }
};

export default ProfileScreen;
