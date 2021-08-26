import React from "react";  
import { StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
    appBar: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingBottom: 20,
    }
});

const AppBarTab = () => {

    const repoLabel = 'Repositories';
    const signInLabel = 'Sign In';

    return (
        <Pressable style={styles.appBar}>
            <Link to='/'>
                <Text color={'white'} fontWeight={'bold'} fontSize={'subheading'}> 
                    {repoLabel}
                </Text>
            </Link>
            <Link to='signIn'>
                <Text color={'white'} fontWeight={'bold'} fontSize={'subheading'}> 
                    {signInLabel}
                </Text>
            </Link>
        </Pressable>
    );
};

export default AppBarTab;
