import React from 'react';
import { View, Text } from 'react-native';

import Container from '../components/Container';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  return (
    <Container>
      <Logo />
      <Header>Expense Manager</Header>

      <Button onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('Signup')}>
        Sign Up
      </Button>
    </Container>
  );
}

export default HomeScreen;
