import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import CryptoReducer from './crypto/CryptoSlice';
import AuthReducer from './auth/AuthSlice';
import { combineReducers } from 'redux';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    cryptoReducer: CryptoReducer,
    authReducer: AuthReducer,
  },
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  cryptoReducer: CryptoReducer,
  authReducer: AuthReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
