import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
export default StyleSheet.create({
    screen: {
        // padding: 10,
    },
    titleHolder: {
        padding: 10,
        borderBottomWidth: 1, 
        borderBottomColor: colors.primary,
        
    },
    title: {
        fontSize: 20,
        color: colors.tirkiz,
        fontFamily: 'montserrat-bold'
    },
    eventDataHolder: {
        flexDirection: 'row',
        padding: 10,
    },
    label: {
        color: colors.primary,
        width: '30%',
        fontFamily: 'montserrat-light'
    },
    value: {
        color: colors.tirkiz,
        fontFamily: 'montserrat-bold',
        fontWeight: '700',
        width: '70%',
    },
    invitedPeopleHolder: {
        width: '70%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    personLabel: {
        color: colors.white,
        backgroundColor: colors.tirkiz,
        padding: 10,

        margin: 2,
    },
});
