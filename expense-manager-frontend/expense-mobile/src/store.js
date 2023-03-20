import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { userSlice } from './features/UserSlice';
import { expenseSlice } from './features/ExpenseSlice';

const persistConfig = {
	key: 'root',
	version: 1,
	storage: AsyncStorage,
}

const rootReducer = combineReducers({
	user: userSlice.reducer,
	expense: expenseSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
	getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
})

export const persistor = persistStore(store)
