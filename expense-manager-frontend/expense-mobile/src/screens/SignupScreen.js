import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../components/Container';
import Header from '../components/Header';
import Button from '../components/Button';
import { theme } from '../common/theme';
import {
  validate_email,
  validate_password,
} from '../common/utils';
import { signup, clearState, userSelector } from '../features/UserSlice';

const SignupScreen = ({ navigation }) => {
	const dispatch = useDispatch();
  const { isError, isSuccess, errorMessage } = useSelector(userSelector);

  const [first_name, setFname] = useState({ value: '', error: '' });
  const [last_name, setLname] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const emailError = validate_email(email.value);
    const passwordError = validate_password(password.value);

    if (emailError || passwordError ) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const signupData = {
      email: email.value,
      first_name: first_name.value,
      last_name: last_name.value,
      password: password.value,
    }
    dispatch(signup(signupData));
  };

  useEffect(() => {
    if (isError) {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isError, isSuccess]);

  return (
    <ScrollView>
    <Container>
      <Header>Create an Account</Header>

      <View style={styles.input}>
        <TextInput
          label="First Name"
          returnKeyType="next"
          value={first_name.value}
          onChangeText={text => setFname({ value: text, error: '' })}
          error={!!first_name.error}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          label="Last Name"
          returnKeyType="next"
          value={last_name.value}
          onChangeText={text => setLname({ value: text, error: '' })}
          error={!!last_name.error}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          keyboardType="email-address"
        />
        {email.error ? <Text style={styles.error}>{email.error}</Text> : null}
      </View>

      <View style={styles.input}>
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        {password.error ? <Text style={styles.error}>{password.error}</Text> : null}
      </View>

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>
    </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginVertical: 12,
  },
  button: {
    marginTop: 24,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingTop: 4,
  },
});

export default SignupScreen;
