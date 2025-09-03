import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_ID_KEY = 'user_id';
const ACCOUNT_ID_KEY = 'account_id';

const SessionManager = {
  saveAuthToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  },

  getAuthToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },

  saveUserId: async (userId: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_ID_KEY, userId);
    } catch (error) {
      console.error('Error saving user ID:', error);
    }
  },

  getUserId: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(USER_ID_KEY);
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  },

  saveAccountId: async (accountId: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(ACCOUNT_ID_KEY, accountId);
    } catch (error) {
      console.error('Error saving account ID:', error);
    }
  },

  getAccountId: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(ACCOUNT_ID_KEY);
    } catch (error) {
      console.error('Error getting account ID:', error);
      return null;
    }
  },

  clearSession: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_ID_KEY, ACCOUNT_ID_KEY]);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  },

  isLoggedIn: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      return token !== null;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  },
};

export default SessionManager;