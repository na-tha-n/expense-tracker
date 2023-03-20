import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../common/theme';

const Button = ({ children, ...props }) => (
  <PaperButton
    mode="contained"
    style={styles.button}
    labelStyle={styles.text}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 30,
  },
});

export default Button;
