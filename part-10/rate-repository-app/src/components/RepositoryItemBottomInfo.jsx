import React from "react";
import { View, StyleSheet } from 'react-native';
import Text from "./Text";

const styles = StyleSheet.create({
    bottomRow: {
        flexDirection: 'row',
        marginLeft: 20,
    },
});

const RepositoryItemBottomInfo = ({item}) => {
    return (
        <View style={styles.bottomRow}>
            <Text>Stars: {item.stargazersCount}</Text>
            <Text>Forks: {item.forksCount}</Text>
            <Text>Reviews: {item.reviewCount}</Text>
            <Text>Rating: {item.ratingAverage}</Text>
        </View>
    );
};

export default RepositoryItemBottomInfo;