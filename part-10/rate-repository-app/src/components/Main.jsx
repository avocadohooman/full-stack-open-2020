import React from 'react';
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
    },
    textContainer: {
        padding: 20,
    },
    text: {
        color: 'grey',
        fontSize: 14,
    },
    blueText: {
        color: 'blue',
    },
    bigText: {
        fontSize: 24,
        fontWeight: '700',
    },
});

const FancyText = ({ isBlue, isBig, children  }) => {
    const textStyles = [
        styles.text,
        isBlue && styles.blueText,
        isBig && styles.bigText,
    ];
    return (
        <Text style={textStyles}>{children}</Text>
    );
};

const Main = () => {
    return (
        <View style={styles.container}>
            <Text>Rate Repository Application</Text>
            <FancyText> Simple Text </FancyText>
            <FancyText isBlue={true}> Simple Blue Text </FancyText>
            <FancyText isBig={true}> Big Text </FancyText>
            <FancyText isBlue={true} isBig={true}> Big Blue Text </FancyText>
            <RepositoryList/>
        </View>
    );
};

export default Main;