import React from "react";
import { Text, View, StyleSheet, Image } from 'react-native';
import RepositoryItemTopInfo from "./RepositoryItemTopInfo";

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    profilePicture: {
        width: 50,
        height: 50,
    },
    topRow: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 300,
    },
    topRowColumn: {
        flexDirection: 'column',
    },
    bottomRow: {
        display: 'flex',
        flexDirection: 'row',
    },
});

const RepositoryItem = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Image style={styles.profilePicture} source={{uri: item.ownerAvatarUrl,}}/>
                <RepositoryItemTopInfo item={item}/>
            </View>
            <Text>Stars: {item.stargazersCount}</Text>
            <Text>Forks: {item.forksCount}</Text>
            <Text>Reviews: {item.reviewCount}</Text>
            <Text>Rating: {item.ratingAverage}</Text>
        </View>
    );
};

export default RepositoryItem;