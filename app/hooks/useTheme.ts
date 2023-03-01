import { useCallback, useMemo } from 'react';
import useAppSelector from './useAppSelector';
import { Theme } from '../configs/constants';
import useAppDispatch from './useAppDispath';
import { updateColorScheme } from '../store/slices/settingsSlice';

const useTheme = () => {
    const scheme = useAppSelector(store => store.settings.colorScheme);
    const dispatch = useAppDispatch();

    // Memos
    const palette = useMemo(() => Theme.schemes[scheme], [scheme]);

    // Callbacks
    const changeScheme = useCallback(
        (newScheme: 'dark' | 'light') => dispatch(updateColorScheme(newScheme)),
        []
    );

    return { palette, dark: scheme === 'dark', changeScheme };
};

export default useTheme;
