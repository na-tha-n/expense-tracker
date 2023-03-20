import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import { logout, userSelector } from '../features/UserSlice';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const onLogout = () => {
    dispatch(logout());
  }

  return (
    <ScrollView>
		<Container>
      <Avatar.Image
        style={styles.avatar}
        size={96}
        source={require('../assets/logo.png')}
      />
      <List.Section style={styles.list}>
        <List.Item title="ID" description={user.id} />
        <List.Item title="First Name" description={user.first_name} />
        <List.Item title="Last Name" description={user.last_name} />
        <List.Item title="Email Address" description={user.email} />
      </List.Section>
      <Button onPress={() => {navigation.navigate('Edit Profile')}}>
        Edit Profile
      </Button>
      <Button onPress={onLogout}>
        Log out
      </Button>
		</Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    margin: 20,
  },
  list: {
    width: '100%',
  },
});

export default ProfileScreen;
