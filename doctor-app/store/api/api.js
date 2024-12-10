import { Platform } from 'react-native';
import axios from 'axios';
// import { APP_ENV, API_URL, API_BASE_URL } from '@env';
import Constants from 'expo-constants';
const { APP_ENV, API_URL, API_BASE_URL } = Constants.expoConfig.extra;

const AppEnv = process.env?.APP_ENV || APP_ENV;
export const APP_URL =
  AppEnv === 'development' ? `http://localhost:3000` : API_URL;
export const BASE_URL =
  AppEnv === 'production'
    ? process.env?.API_BASE_URL || API_BASE_URL
    : Platform.OS === 'ios'
      ? // ? 'http://127.0.0.1:8000/api'
        'http://192.168.1.100:3000/api'
      : 'http://192.168.1.100:3000/api';
const DEFAULT_TIMEOUT = 30_000;
// const BASE_URL = 'http://192.168.1.100:3000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  timeoutErrorMessage:
    'Server took too long to respond. Please try again later.',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  // console.log(config.baseURL, config.url);
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), DEFAULT_TIMEOUT + 5000);
  config.signal = abortController.signal;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data) {
      return Promise.reject(error?.response?.data);
    }
    const statusCode =
      error?.response?.statusCode || error.response?.status || 500;
    const errorData = {
      ...error?.response,
      statusCode,
      data: null,
      error: error.message,
      message: error?.response?.statusText ?? error.code,
    };
    // console.log('error response', errorData);
    return Promise.reject(errorData);
  },
);

export default apiClient;
