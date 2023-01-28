import {} from 'react';
import { useTheme } from 'react-native-paper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppTheme } from '../../..';
import { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hooks for theme
export const useAppTheme = () => useTheme<AppTheme>();
