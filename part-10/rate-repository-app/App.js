import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

const App = () => {
  console.log('I love console.log() for debugging');
  return (
    <NativeRouter>
        <Main />
    </NativeRouter>
  );
};

export default App;
