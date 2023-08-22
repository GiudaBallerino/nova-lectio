// React
import { Alert } from 'react-native';

// Others
import { t } from 'i18next';

export const showAlert = (
    title: string,
    body: string,
    buttons?: { text: string; onPress?: () => void; style?: 'default' | 'cancel' | 'destructive' }[]
) => {
    Alert.alert(
        t(title),
        t(body) || body,
        buttons?.map(b => ({
            text: t(b.text) || b.text,
            style: b.style,
            onPress: () => {
                b.onPress && b.onPress();
            }
        }))
    );
};
