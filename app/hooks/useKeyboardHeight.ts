import { useState, useEffect, SetStateAction, useCallback } from 'react';
import { Keyboard, KeyboardEventListener } from 'react-native';

const useKeyboardHeight = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const handleKeyboardDidShow = useCallback<KeyboardEventListener>(({ endCoordinates }) => {
        setKeyboardHeight(endCoordinates.height);
    }, []);

    const handleKeyboardDidHide = useCallback<KeyboardEventListener>(() => {
        setKeyboardHeight(0);
    }, []);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return { keyboardHeight };
};

export default useKeyboardHeight;
