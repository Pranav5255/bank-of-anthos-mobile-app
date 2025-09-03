import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import ChatScreen from './src/screens/ChatScreen';
import TransactionScreen from './src/screens/TransactionScreen';

// Types
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Chat: undefined;
  Transaction: { type: 'send' | 'deposit' };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen 
          name="Transaction" 
          component={TransactionScreen} 
          options={({ route }) => ({ 
            title: route.params?.type === 'send' ? 'Send Money' : 'Make Deposit',
            headerShown: true
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;