import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://bank-of-anthos-api.example.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  accountId: string;
}

export interface BalanceResponse {
  accountId: string;
  balance: number;
  currency: string;
}

export interface TransactionRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  currency: string;
}

export interface DepositRequest {
  accountId: string;
  amount: number;
  currency: string;
}

export interface TransactionResponse {
  transactionId: string;
  status: string;
  message: string;
}

export interface ChatRequest {
  userId: string;
  message: string;
}

export interface ChatResponse {
  message: string;
  timestamp: string;
}

const ChatAgentApiClient = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/login', { username, password });
    return response.data;
  },

  getBalance: async (accountId: string): Promise<BalanceResponse> => {
    const response = await apiClient.get<BalanceResponse>(`/accounts/${accountId}/balance`);
    return response.data;
  },

  sendTransaction: async (transaction: TransactionRequest): Promise<TransactionResponse> => {
    const response = await apiClient.post<TransactionResponse>('/transactions', transaction);
    return response.data;
  },

  makeDeposit: async (deposit: DepositRequest): Promise<TransactionResponse> => {
    const response = await apiClient.post<TransactionResponse>('/deposits', deposit);
    return response.data;
  },

  sendChatMessage: async (chatRequest: ChatRequest): Promise<ChatResponse> => {
    const response = await apiClient.post<ChatResponse>('/chat', chatRequest);
    return response.data;
  },
};

export default ChatAgentApiClient;