import React from 'react';
import { StyleSheet, Switch, View, Text} from 'react-native';

import Colors from '../constants/colors';


const CustomSwitch = props => {
    return (
        <View style={styles.inputHolder}>
            <Text style={styles.label}>{props.label}</Text>
            <Switch
                style={styles.switchInput}
                onValueChange = {props.onChange}
                value={props.value}
                thumbColor={Colors.pikselGreen}   
                trackColor={{true: Colors.pikselLightGreen, false: 'grey'}}

            />
        </View>
    );
  };

const styles = StyleSheet.create({
    inputHolder: {
        marginBottom: 20,  
        alignItems: 'flex-start'
    },
    label: {
        paddingBottom: 5,
        fontSize: 12,
        fontFamily: 'montserrat-light',
    },
    switchInput: {
        // marginTop: 10,
        marginBottom: 10,
        marginLeft: 0,

    },
});

export default CustomSwitch;