import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },  
  userCredentials: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
  },
  signIn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const UserCredentialForm = ({onSubmit}) => {

  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.userCredentials} name={'username'} placeholder={'Username'} />
      <FormikTextInput style={styles.userCredentials} name={'password'} placeholder={'Password'} />
      <Pressable onPress={onSubmit}>
        <View style={styles.signIn}>
          <Text style={styles.signInLabel} color={'white'} fontWeight={'bold'}>Sign In</Text>
        </View>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <View>
        <Formik 
          initialValues={initialValues} 
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
            {({handleSubmit}) => <UserCredentialForm onSubmit={handleSubmit}/>}
        </Formik>
    </View>
  );
};

export default SignIn;