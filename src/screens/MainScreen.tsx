import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import ChatAgentApiClient from '../api/ChatAgentApiClient';
import SessionManager from '../utils/SessionManager';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [currency, setCurrency] = useState('USD');
  const [isLoading, setIsLoading] = useState(true);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const storedAccountId = await SessionManager.getAccountId();
        if (storedAccountId) {
          setAccountId(storedAccountId);
          await fetchBalance(storedAccountId);
        } else {
          Alert.alert('Error', 'Account information not found');
          handleLogout();
        }
      } catch (error) {
        console.error('Error loading account data:', error);
        Alert.alert('Error', 'Failed to load account data');
      } finally {
        setIsLoading(false);
      }
    };

    loadAccountData();
  }, []);

  const fetchBalance = async (accId: string) => {
    try {
      const response = await ChatAgentApiClient.getBalance(accId);
      setBalance(response.balance);
      setCurrency(response.currency);
    } catch (error) {
      console.error('Error fetching balance:', error);
      Alert.alert('Error', 'Failed to fetch account balance');
    }
  };

  const handleLogout = async () => {
    await SessionManager.clearSession();
    navigation.replace('Login');
  };

  const navigateToSendMoney = () => {
    navigation.navigate('Transaction', { type: 'send' });
  };

  const navigateToDeposit = () => {
    navigation.navigate('Transaction', { type: 'deposit' });
  };

  const navigateToChat = () => {
    navigation.navigate('Chat');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bank of Anthos</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Current Balance</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#1976D2" />
        ) : (
          <Text style={styles.balanceAmount}>
            {balance !== null ? formatCurrency(balance) : 'Not available'}
          </Text>
        )}
        <Text style={styles.accountId}>Account: {accountId}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={navigateToSendMoney}
          >
            <Text style={styles.actionButtonText}>Send Money</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={navigateToDeposit}
          >
            <Text style={styles.actionButtonText}>Deposit</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.chatButton]} 
          onPress={navigateToChat}
        >
          <Text style={styles.actionButtonText}>Chat with Assistant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1976D2',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '500',
  },
  balanceCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  balanceTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  accountId: {
    fontSize: 14,
    color: '#888',
  },
  actionsContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  chatButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MainScreen;