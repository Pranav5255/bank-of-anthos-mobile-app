import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/login/LoginScreen';
import MainScreen from '../screens/main/MainScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import TransactionScreen from '../screens/transaction/TransactionScreen';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Chat: undefined;
  Transaction: { type: 'send' | 'deposit' };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{ title: 'Bank Assistant' }}
        />
        <Stack.Screen 
          name="Transaction" 
          component={TransactionScreen} 
          options={({ route }) => ({ 
            title: route.params.type === 'send' ? 'Send Money' : 'Make Deposit' 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;