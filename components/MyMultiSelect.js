import React from 'react';
import { StyleSheet, TextInput, View, Text} from 'react-native';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';


import Colors from '../constants/colors';


const MyMultiSelect = props => {

    const items = props.items;
    const selectedItems = props.selectedItems;

    const stilovi = {
        // chipText: {
        searchBar: {
            borderRadius: 2,
            color: 'red',
        }
    };

    return (
        <View style={styles.inputHolder}>
            <Text style={styles.label}>{props.label}</Text>
            <SectionedMultiSelect
                items={items}
                ref={SectionedMultiSelect => this.SectionedMultiSelect = SectionedMultiSelect}
                uniqueKey="id"
                subKey="children"
                selectText={props.selectTitle}
                showDropDowns={false}
                showCancelButton={true}
                readOnlyHeadings={false}
                modalWithSafeAreaView={true}
                showRemoveAll={false}
                searchPlaceholderText="Search people..."
                highlightChildren={true}
                colors={{
                  primary: Colors.pikselGreen,
                  cancel: Colors.regularGray
                }}
                styles={{
                    selectToggle: {
                        borderWidth: 1,
                        borderColor: Colors.bordersGray,
                        borderRadius: 5,
                        padding: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                    },
                    selectToggleText: {
                        fontSize: 12,
                    },
                    selectedSubItemText: {
                        color: Colors.tirkiz,
                    },
                    chipContainer: {
                        borderRadius: 0,
                        borderColor: Colors.tirkiz,
                        // backgroundColor: Colors.tirkiz,
                    },
                    chipText: {
                        color: Colors.tirkiz
                    }
                }}
                onSelectedItemsChange={props.onSelectedItemsChange}
                selectedItems={selectedItems}
              />
            
        </View>
    );
  };



const styles = StyleSheet.create({
    inputHolder: {
        marginBottom: 20,  
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



export default MyMultiSelect;