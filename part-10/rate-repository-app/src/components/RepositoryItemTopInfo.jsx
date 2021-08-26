import React from "react";
import { View, StyleSheet } from 'react-native';
import Text from "./Text";
import theme from '../theme';

const styles = StyleSheet.create({
    topRowColumn: {
        flexDirection: 'column',
        marginLeft: 20,
    },
    languageTag: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
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
            <View style={styles.languageTag}>
                <Text fontWeight={'bold'} color={'white'}>{item.language}</Text>
            </View>
        </View>
    );
};

export default RepositoryItemTopInfo;