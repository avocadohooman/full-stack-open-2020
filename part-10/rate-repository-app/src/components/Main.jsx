import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar'; 
import SignIn from './SignIn';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e1e4e8',
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path='/' exact>
                    <RepositoryList/>
                </Route>
                <Route path='/signIn'>
                    <SignIn />
                </Route>
                <Redirect to='/' />
            </Switch>
        </View>
    );
};

export default Main;