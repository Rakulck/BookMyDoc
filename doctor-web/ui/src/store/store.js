import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices';
import { AvailabilitySlice, BookingsSlice, ServiceSlice } from './slices';

const rootReducer = combineReducers({
  auth: authReducer,
  [AvailabilitySlice.reducerPath]: AvailabilitySlice.reducer,
  [BookingsSlice.reducerPath]: BookingsSlice.reducer,
  [ServiceSlice.reducerPath]: ServiceSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      AvailabilitySlice.middleware,
      BookingsSlice.middleware,
      ServiceSlice.middleware,
    ]),
  devTools: process.env.NODE_ENV === 'development' ? true : false,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export const AppState = store.getState;
export const AppDispatch = store.dispatch;
