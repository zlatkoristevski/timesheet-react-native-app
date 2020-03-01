import React, {useCallback, useState, useEffect} from 'react';
import { View, ScrollView, Alert, ActivityIndicator, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import GestureRecognizer from 'react-native-swipe-gestures';



import styles from './InvitationsScreenStyles';

import HeaderButton from '../../components/HeaderButton';

import ActionButton from './components/ActionButton';
import Invitation from './components/Invitation';

import Colors from '../../constants/colors';


//LOAD ACTIONS
import { 
  getInvitationsDataFromServer,
  respondOnInvitationToServer
} from '../../store/actions/calendar';


const InvitationsScreen = props => {
  const invitationsData = useSelector(state => state.calendar.invitationsData);
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [tab, setTab] = useState("PEND");


  const geInvitationsDataFromServerHandler = useCallback(async (value = null) => {
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(getInvitationsDataFromServer());
        
      } catch (err) {
        console.log(err);
        setError(err.message);
        setIsLoading(false);
      }
  }, [dispatch, setIsLoading, setError]);

  const respondOnInvitationHandler = useCallback(async (id, status) => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(respondOnInvitationToServer(id, status));
        Alert.alert('Success!', 'Status has been changed successfully', [{ text: 'Okay' }]);
        setIsLoading(true);
        geInvitationsDataFromServerHandler().then(() => {
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }
}, [dispatch, setIsLoading, setError]);

  useCallback(useEffect(() => {
    setIsLoading(true);
    geInvitationsDataFromServerHandler().then(() => {
      setIsLoading(false);
    });
    
  }, [dispatch])
, [dispatch]);

  if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
  }

  if (error) {
      return (
        <View style={styles.centered}>
          <Text>An error occurred!</Text>
        </View>
      );
  }

  let listInvitationsRenderData = null;

  Object.keys(invitationsData).map((key) => {
    // console.log(key);
    if(key == tab){
      let invitedInvitations = invitationsData[key];

      listInvitationsRenderData = Object.keys(invitedInvitations).map((inv_key) => {
          return (<Invitation 
                    style={styles.invitationSingle}
                    key={inv_key} 
                    activeTab={tab}
                    onPress={() => props.navigation.navigate({ routeName: "EventDetail", params: {
                      eventKey: invitedInvitations[inv_key].eventId,
                      hostId: invitedInvitations[inv_key].hostId,
                      loggedInUserId: authData.logged_in_user,
                    } })}
                    uniqueKey={inv_key}
                    onAcceptPressed={(invitation_id, status) => respondOnInvitationHandler(invitedInvitations[inv_key].id, 'ACC')}
                    onRejectPressed={(invitation_id, status) => respondOnInvitationHandler(invitedInvitations[inv_key].id, 'DEC')}
                    navigation={props.navigation}
                  >{invitedInvitations[inv_key].title}</Invitation>)
        
      });
    }
  });

  return (
    <View style={styles.screen}>
      <View style={styles.buttonsHolder}>
        <ActionButton isActive={tab == 'PEND' ? 1: 0} onPress={() => setTab('PEND')}>Invited</ActionButton>
        <ActionButton isActive={tab == 'ACC' ? 1: 0} onPress={() => setTab('ACC')}>Accepted</ActionButton>
        <ActionButton isActive={tab == 'DEC' ? 1: 0} onPress={() => setTab('DEC')}>Declined</ActionButton>
      </View>
      <View style={styles.invitationsHolder}>
          <ScrollView>
            {
              listInvitationsRenderData != null ? 
              listInvitationsRenderData : null 
            }
          </ScrollView>
          {
              listInvitationsRenderData == null ? 
              <Text style={styles.centered}>No invitations found in this category!</Text> : null
            }
          
      </View>
    </View>
  );
};


InvitationsScreen.navigationOptions = (navigationData) => {

  return {headerTitle: 'Invitations',
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

export default InvitationsScreen;
