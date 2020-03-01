import React, {useCallback, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/HeaderButton';
import Calendar from '../../components/Calendar/Calendar';



const MyCalendarScreen = props => {

  return (
    <View style={styles.screen}>
        <Calendar calendarScreen="my_calendar" navigation={props.navigation} />
    </View>
  );
};


MyCalendarScreen.navigationOptions = (navigationData) => {

  return {headerTitle: 'My Calendar',
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
    ),
    // headerRight: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Add"
    //       iconName="ios-add"
    //       onPress={() => {
    //         navigationData.navigation.navigate("AddEvent");
    //       }}
    //     />
    //   </HeaderButtons>
    // )
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});


export default MyCalendarScreen;
