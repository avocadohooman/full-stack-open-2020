import React from "react";  
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
    },
    appBar: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingBottom: 20,
    }
});

const AppBar = () => {

    const headerLabel = 'Repositories';

    return (
        <View style={styles.container}>
            <View style={styles.appBar}>
                <Text color={'white'} fontWeight={'bold'} fontSize={'subheading'}> 
                    {headerLabel}
                </Text>
            </View>
        </View>
    );
};

export default AppBar;
