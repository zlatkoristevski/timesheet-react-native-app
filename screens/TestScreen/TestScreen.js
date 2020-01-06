import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import HeaderButton from '../../components/HeaderButton';

import Colors from '../../constants/colors';

const TestScreen = props => {
  const title = 'Test screen';
  return (
    <View style={styles.screen}>
      <Text style={styles.hometext}>The Test Screen333!</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,

  },
  hometext: {
    fontFamily: 'montserrat-light',
  }
});

TestScreen.navigationOptions = (navigationData) => {

  return {headerTitle: 'Timesheet App',
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

export default TestScreen;
