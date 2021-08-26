import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import RepositoryItemTopInfo from "./RepositoryItemTopInfo";
import RepositoryItemBottomInfo from "./RepositoryItemBottomInfo";

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    topRow: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 300,
    },    
    bottomRow: {
        flexDirection: 'row',
        marginLeft: 20,
    },
});

const RepositoryItem = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Image style={styles.profilePicture} source={{uri: item.ownerAvatarUrl,}}/>
                <RepositoryItemTopInfo item={item}/>
            </View>
            <RepositoryItemBottomInfo item={item}/> 
        </View>
    );
};

export default RepositoryItem;