import React from 'react';
import { StyleSheet, TextInput, View, Text} from 'react-native';

import Colors from '../constants/colors';


const Input = props => {
    return (
        <View style={styles.inputHolder}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
                
                placeholder={props.placeholder} 
                title={props.title}
                style={{ ...styles.input}}  
                onChangeText={props.onInputChange}
                textContentType="password"
                

                {...props}
            />
            {props.error ? <Text style={styles.error_message}>{props.errorText}</Text> : null}
            
        </View>
    );
  };

const styles = StyleSheet.create({
    inputHolder: {
        marginBottom: 10,  
    },
    label: {
        paddingBottom: 5,
        fontSize: 12,
        fontFamily: 'montserrat-light',
    },
    error_message: {
        fontSize: 11,
        color: 'red',
        fontFamily: 'montserrat-light',
    },
    input: {
        borderColor: Colors.bordersGray,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
        fontSize: 12,
        fontFamily: 'montserrat-light',
    },
});

export default Input;