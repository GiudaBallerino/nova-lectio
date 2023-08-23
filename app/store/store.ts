import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookshelfReducer from './slices/bookshelfSlice';
import settingsReducer from './slices/settingsSlice';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { googleBooksApi } from '../api/googleBooksApi';
import { newYorkTimesApi } from '../api/newYorkTimesApi';

const rootReducer = combineReducers({
    bookshelf: bookshelfReducer,
    settings: settingsReducer,
    [googleBooksApi.reducerPath]: googleBooksApi.reducer,
    [newYorkTimesApi.reducerPath]: newYorkTimesApi.reducer
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: [googleBooksApi.reducerPath, newYorkTimesApi.reducerPath]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
            .concat(googleBooksApi.middleware)
            .concat(newYorkTimesApi.middleware)
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
