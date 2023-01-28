import { newYorkTimesApi } from './../api/newYorkTimesApi/newYorkTimesApi';
import { googleBooksApi } from './../api/googleBooksApi/googleBooksApi';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookshelfReducer from './bookshelf/bookshelfSlice';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {} from '../api/googleBooksApi/googleBooksApi';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  bookshelf: bookshelfReducer,
  [googleBooksApi.reducerPath]: googleBooksApi.reducer,
  [newYorkTimesApi.reducerPath]: newYorkTimesApi.reducer,
});

// Configure redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [
    'search',
    googleBooksApi.reducerPath,
    newYorkTimesApi.reducerPath,
  ],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(googleBooksApi.middleware)
      .concat(newYorkTimesApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
