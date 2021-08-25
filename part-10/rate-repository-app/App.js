import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import Main from './src/components/Main';

const App = () => {
  console.log('I love console.log() for debugging');
  return (
    <Main />
  );
};

export default App;
