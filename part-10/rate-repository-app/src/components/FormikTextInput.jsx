import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';


const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
    },
});

const FormikTextInput = ({name, ...props}) => {
    const [field,  meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
          <TextInput 
            onChangeText={value => helpers.setValue(value)}
            onBlue={() => helpers.setTouched(true)}
            value={field.value}
            error={showError}
            secureTextEntry={true}
            {...props}
          />
          {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;