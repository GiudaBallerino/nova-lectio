import useTheme from '../../hooks/useTheme';
import Scaffold from '../commons/Scaffold';
import { LANGUAGE } from '../../types/enums';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useAppDispatch from '../../hooks/useAppDispath';
import { updateLanguage } from '../../store/slices/settingsSlice';
import useAppSelector from '../../hooks/useAppSelector';
import MultiSelectItem from '../commons/MultiSelectItem';

function LanguageModal() {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // Global States
    const language = useAppSelector(store => store.settings.language);

    // States
    const [selected, setSelected] = useState<LANGUAGE>(language);

    // Memos
    const handleIsSelected = useMemo(() => {
        return (item: LANGUAGE) => item === selected;
    }, [selected]);

    // Callbacks
    const getKeyName = useCallback(
        (value: string) => Object.entries(LANGUAGE).find(([key, val]) => val === value)?.[0],
        []
    );

    const handleOnDone = useCallback((item: LANGUAGE) => setSelected(item), [selected]);

    const renderMenuItem = useCallback(
        (item: LANGUAGE, index: number) => (
            <MultiSelectItem
                key={index.toString()}
                title={`${getKeyName(item)} - ${item}`}
                onPress={() => handleOnDone(item)}
                selected={handleIsSelected(item)}
            />
        ),
        [handleIsSelected, handleOnDone]
    );

    // Effects
    useEffect(() => {
        if (selected !== language) {
            dispatch(updateLanguage(selected));
        }
    }, [selected, language]);

    return <Scaffold>{Object.values(LANGUAGE).map(renderMenuItem)}</Scaffold>;
}

export default LanguageModal;
