import { APP_ENV } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices';
import {
  AuthSlice,
  NotificationsSlice,
  AvailabilitySlice,
  BookingsSlice,
  ServiceSlice,
  DoctorsSlice,
} from './slices';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [AuthSlice.name],
  whiteList: [NotificationsSlice.name],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: [
    'error',
    'loading',
    'isVerifyNeeded',
    'providerLoading',
    'booking',
    'refresh',
  ],
  whitelist: ['user', 'isAuthenticated', 'profile'],
};

const rootReducer = combineReducers({
  [AuthSlice.name]: persistReducer(authPersistConfig, authReducer),
  [NotificationsSlice.name]: NotificationsSlice.reducer,
  [AvailabilitySlice.reducerPath]: AvailabilitySlice.reducer,
  [BookingsSlice.reducerPath]: BookingsSlice.reducer,
  [ServiceSlice.reducerPath]: ServiceSlice.reducer,
  [DoctorsSlice.reducerPath]: DoctorsSlice.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      AvailabilitySlice.middleware,
      BookingsSlice.middleware,
      ServiceSlice.middleware,
      DoctorsSlice.middleware,
    ]),
  devTools: APP_ENV === 'development',
});

export const persistedStore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export const AppState = store.getState;
export const AppDispatch = store.dispatch;
