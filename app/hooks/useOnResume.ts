import { useEffect } from 'react';
import * as RNLocalize from 'react-native-localize';
import i18n, { isLanguageAvailable } from '../locale';
import { store } from '../store/store';

function useOnResume() {
    // Methods
    const updateLanguage = () => {
        const languageCode = store.getState().settings.language;

        if (isLanguageAvailable(languageCode) && languageCode !== i18n.language) {
            i18n.changeLanguage(languageCode);
        }
    };

    // Effects
    useEffect(() => {
        updateLanguage();
    }, []);

    return 'Home';
}

export default useOnResume;
