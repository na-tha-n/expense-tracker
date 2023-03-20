import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
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
import { login, clearState, userSelector } from '../features/UserSlice';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isError, isSuccess, errorMessage } = useSelector(userSelector);

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onLoginPressed = () => {
    const emailError = validate_email(email.value);
    const passwordError = validate_password(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

		const loginData = {
			email: email.value,
			password: password.value,
		}
		dispatch(login(loginData));
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
    <Container>
      <Header>Login</Header>

      <View style={styles.input}>
        <TextInput
          label="Email"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          returnKeyType="next"
          keyboardType="email-address"
        />
        {email.error ? <Text style={styles.error}>{email.error}</Text> : null}
      </View>
        
      <View style={styles.input}>
        <TextInput
          label="Password"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          returnKeyType="done"
          secureTextEntry
        />
        {password.error ? <Text style={styles.error}>{password.error}</Text> : null}
      </View>

      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>

    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginVertical: 12,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingTop: 4,
  },
});

export default LoginScreen;
