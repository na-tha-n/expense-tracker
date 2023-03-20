import React from 'react';
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { userSelector } from './features/UserSlice';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ExpenseScreen from './screens/ExpenseScreen';
import ExpenseItemScreen from './screens/ExpenseItemScreen';
import ReceiptScreen from './screens/ReceiptScreen';

const Stack = createStackNavigator();

function App() {
  const { token } = useSelector(userSelector);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token == null ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
            <Stack.Screen name="Expense" component={ExpenseScreen} />
            <Stack.Screen name="Expense Item" component={ExpenseItemScreen} />
            <Stack.Screen name="Receipt" component={ReceiptScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
