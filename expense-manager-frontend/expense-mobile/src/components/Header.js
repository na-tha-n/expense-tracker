import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Header = ({ children }) => (
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default Header;
