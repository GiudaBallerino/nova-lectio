import { createSlice } from '@reduxjs/toolkit';
import { LANGUAGE } from '../../types/enums';

type InitialState = {
    colorScheme: 'dark' | 'light';
    language: LANGUAGE;
};

const initialState: InitialState = {
    colorScheme: 'dark',
    language: LANGUAGE.EN
};

// Slice
export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateColorScheme: (state, action) => {
            state.colorScheme = action.payload;
        },
        updateLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
});
export const { updateColorScheme, updateLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
