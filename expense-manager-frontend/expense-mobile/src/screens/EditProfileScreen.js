import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'

import Container from '../components/Container';
import Button from '../components/Button';
import { theme } from '../common/theme';
import {
  validate_email,
  validate_password,
} from '../common/utils';
import { clearState, updateProfile, userSelector } from '../features/UserSlice';

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const [fname, setFname] = useState({ value: user.first_name, error: '' });
  const [lname, setLname] = useState({ value: user.last_name, error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [cpassword, setCpassword] = useState({ value: '', error: '' });

  const _onSaveChanges = () => {
    if (password.value !== cpassword.value) {
      setCpassword({ ...cpassword, error: "Password does not match" });
      return;
    }

    dispatch(updateProfile({
      id: user.id,
      first_name: fname.value,
      last_name: lname.value,
      password: password.value,
    }));
  };

  useEffect(() => {
    if (user.isError) {
      ToastAndroid.show(user.errorMessage, ToastAndroid.LONG);
      dispatch(clearState());
    }
    if (user.isSuccess) {
      navigation.goBack();
      dispatch(clearState());
    }
  }, [user]);

  return (
    <ScrollView>
    <Container>
      <Avatar.Image
        style={styles.avatar}
        size={96}
        source={require('../assets/logo.png')}
      />
      <Button mode="contained" style={styles.button}>
        Change Profile Image
      </Button>

      <View style={styles.input}>
        <TextInput
          mode="outlined"
          label="ID"
          disabled={true}
          value={user.id.toString()}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          mode="outlined"
          label="First Name"
          returnKeyType="next"
          value={fname.value}
          onChangeText={text => setFname({ value: text, error: '' })}
          error={!!fname.error}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          mode="outlined"
          label="Last Name"
          returnKeyType="next"
          value={lname.value}
          onChangeText={text => setLname({ value: text, error: '' })}
          error={!!lname.error}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          mode="outlined"
          label="Email"
          returnKeyType="next"
          value={user.email}
          disabled={true}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          mode="outlined"
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          secureTextEntry
        />
        {password.error ? <Text style={styles.error}>{password.error}</Text> : null}
      </View>

      <View style={styles.input}>
        <TextInput
          mode="outlined"
          label="Confirm Password"
          returnKeyType="done"
          value={cpassword.value}
          onChangeText={text => setCpassword({ value: text, error: '' })}
          error={!!cpassword.error}
          secureTextEntry
        />
        {cpassword.error ? <Text style={styles.error}>{cpassword.error}</Text> : null}
      </View>

      <Button mode="contained" onPress={_onSaveChanges} style={styles.button}>
        Save Changes
      </Button>
    </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginTop: 20,
  },
  input: {
    width: '100%',
    marginVertical: 12,
  },
  button: {
    marginVertical: 24,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingTop: 4,
  },
});

export default EditProfileScreen;
