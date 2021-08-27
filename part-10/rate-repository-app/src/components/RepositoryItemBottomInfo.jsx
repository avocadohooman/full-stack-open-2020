import React from "react";
import { View, StyleSheet } from 'react-native';
import Text from "./Text";

const styles = StyleSheet.create({
    bottomRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    bottomColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});

const kFormatter = (number) => {
    return Math.abs(number) > 999 ? Math.sign(number) * ((Math.abs(number)/1000).toFixed(1)) + 'k' : number;
};

const RepositoryItemBottomInfo = ({item}) => {
    return (
        <View style={styles.bottomRow}>
            <View style={styles.bottomColumn}>
                <Text fontWeight={'bold'}>{kFormatter(item.stargazersCount)}</Text>
                <Text color={'textSecondary'}>Stars</Text>
            </View>
            <View style={styles.bottomColumn}>
                <Text fontWeight={'bold'}>{kFormatter(item.forksCount)}</Text>
                <Text color={'textSecondary'}>Forks</Text>
            </View>
            <View style={styles.bottomColumn}>
                <Text fontWeight={'bold'}>{kFormatter(item.reviewCount)}</Text>
                <Text color={'textSecondary'}>Reviews</Text>
            </View>
            <View style={styles.bottomColumn}>
                <Text fontWeight={'bold'}>{kFormatter(item.ratingAverage)}</Text>
                <Text color={'textSecondary'}>Rating</Text>
            </View>
        </View>
    );
};

export default RepositoryItemBottomInfo;