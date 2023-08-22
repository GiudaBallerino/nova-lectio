import { useCallback, useEffect } from 'react';
import i18n, { isLanguageAvailable } from '../locale';
import useAppSelector from './useAppSelector';

function useOnResume() {
    const languageCode = useAppSelector(store => store.settings.language);

    // Callbacks
    const updateLanguage = useCallback(() => {
        if (isLanguageAvailable(languageCode) && languageCode !== i18n.language) {
            i18n.changeLanguage(languageCode);
        }
    }, [languageCode]);

    // Effects
    useEffect(() => {
        updateLanguage();
    }, [languageCode]);

    return 'Home';
}

export default useOnResume;
