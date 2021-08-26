import React from "react";  
import { StyleSheet, Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    appBar: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingBottom: 20,
    }
});

const AppBarTab = () => {

    const headerLabel = 'Repositories';

    return (
        <Pressable style={styles.appBar}>
            <Text color={'white'} fontWeight={'bold'} fontSize={'subheading'}> 
                {headerLabel}
            </Text>
        </Pressable>
    );
};

export default AppBarTab;
