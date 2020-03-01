import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
export default StyleSheet.create({
    screen: {
        // padding: 10,
        flex: 1,
    },
    buttonsHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    invitationsHolder: {
        padding: 10,
        height: '95%',
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    invitationSingle: {
        marginBottom: 5,
    },
    centered: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
    
});
