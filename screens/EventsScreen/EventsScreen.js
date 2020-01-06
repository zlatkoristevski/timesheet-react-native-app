import React, {useCallback, useState} from 'react';
import { View, ScrollView, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import styles from './EventsScreenStyle';

import HeaderButton from '../../components/HeaderButton';


const EventsScreen = props => {
  

  return (
    <View>
        <Text>Events Screen</Text>
    </View>
  );
};


EventsScreen.navigationOptions = (navigationData) => {

  return {headerTitle: 'My Events',
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

export default EventsScreen;
