import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import ChatAgentApiClient from '../api/ChatAgentApiClient';
import SessionManager from '../utils/SessionManager';

type TransactionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Transaction'>;
type TransactionScreenRouteProp = RouteProp<RootStackParamList, 'Transaction'>;

type Props = {
  navigation: TransactionScreenNavigationProp;
  route: TransactionScreenRouteProp;
};

const TransactionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { type } = route.params;
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [currency] = useState('USD');

  useEffect(() => {
    const loadAccountId = async () => {
      const id = await SessionManager.getAccountId();
      setAccountId(id);
    };
    
    loadAccountId();
  }, []);

  const handleSubmit = async () => {
    if (!accountId) {
      Alert.alert('Error', 'Account information not found');
      return;
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (type === 'send' && !recipient) {
      Alert.alert('Error', 'Please enter a recipient account ID');
      return;
    }

    setIsLoading(true);

    try {
      const amountValue = parseFloat(amount);
      
      if (type === 'send') {
        const response = await ChatAgentApiClient.sendTransaction({
          fromAccountId: accountId,
          toAccountId: recipient,
          amount: amountValue,
          currency: currency,
        });
        
        if (response.status === 'success') {
          Alert.alert(
            'Success',
            `Transaction completed successfully. Transaction ID: ${response.transactionId}`,
            [{ text: 'OK', onPress: () => navigation.navigate('Main') }]
          );
        } else {
          Alert.alert('Transaction Failed', response.message);
        }
      } else if (type === 'deposit') {
        const response = await ChatAgentApiClient.makeDeposit({
          accountId: accountId,
          amount: amountValue,
          currency: currency,
        });
        
        if (response.status === 'success') {
          Alert.alert(
            'Success',
            `Deposit completed successfully. Transaction ID: ${response.transactionId}`,
            [{ text: 'OK', onPress: () => navigation.navigate('Main') }]
          );
        } else {
          Alert.alert('Deposit Failed', response.message);
        }
      }
    } catch (error) {
      console.error('Transaction error:', error);
      Alert.alert(
        'Error',
        'Failed to process transaction. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {type === 'send' ? 'Send Money' : 'Make Deposit'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {type === 'send' ? 'Send Money to Account' : 'Deposit to Your Account'}
          </Text>

          {type === 'send' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Recipient Account ID</Text>
              <TextInput
                style={styles.input}
                value={recipient}
                onChangeText={setRecipient}
                placeholder="Enter recipient account ID"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount ({currency})</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>
                {type === 'send' ? 'Send Money' : 'Make Deposit'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    padding: 15,
    backgroundColor: '#1976D2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  placeholder: {
    width: 50,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#1976D2',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionScreen;