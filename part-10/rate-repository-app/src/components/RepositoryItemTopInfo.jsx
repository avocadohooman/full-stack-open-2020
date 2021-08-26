import React from "react";
import { View, StyleSheet } from 'react-native';
import Text from "./Text";

const styles = StyleSheet.create({
    topRowColumn: {
        flexDirection: 'column',
        marginLeft: 20,
    },
    languageTag: {
        backgroundColor: '#0366d6',
        color: 'white',
        padding: 5,
        alignSelf: 'flex-start',
        borderRadius: 5,
    }
});

const RepositoryItemTopInfo = ({item}) => {
    return (
        <View style={styles.topRowColumn}>
            <Text fontWeight={'bold'} fontSize={'subheading'}>{item.fullName}</Text>
            <Text color={'textSecondary'}>{item.description}</Text>
            <Text fontWeight={'bold'} style={styles.languageTag}>{item.language}</Text>
        </View>
    );
};

export default RepositoryItemTopInfo;