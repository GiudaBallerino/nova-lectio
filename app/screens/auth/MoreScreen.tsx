import { useCallback, useMemo, useRef } from 'react';
import Scaffold from '../../components/commons/Scaffold';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FolderIcon, GlobeAltIcon, SparklesIcon } from 'react-native-heroicons/outline';
import BaseText from '../../components/commons/BaseText';
import useTheme from '../../hooks/useTheme';
import Divider from '../../components/commons/Divider';
import BottomSheet, { BottomSheetMethods } from '../../components/commons/BottomSheet';
import ThemeModal from '../../components/modals/ThemeModal';
import LanguageModal from '../../components/modals/LanguageModal';
import { useNavigation } from '@react-navigation/native';
import TimeCard from '../../components/commons/TimeCard';
import ReadedCard from '../../components/commons/ReadedCard';
import useAppSelector from '../../hooks/useAppSelector';

function MoreScreen() {
    // Hooks
    const navigation = useNavigation<any>();
    const theme = useTheme();

    // Global stats
    const time: number =
        ((useAppSelector(store => store.bookshelf.bookshelf)
            .map(b => b.currentPage)
            .reduce((a, b) => a + b, 0) *
            450) /
            250) *
        60000;

    const count: number = useAppSelector(store => store.bookshelf.bookshelf).length;

    // Refs
    const themeBottomSheetRef = useRef<BottomSheetMethods>(null);
    const languageBottomSheetRef = useRef<BottomSheetMethods>(null);

    // Memos
    const primaryColor = useMemo<string>(() => theme.palette.primary, [theme]);
    const baseColor = useMemo<string>(() => theme.palette.onBackground, [theme]);
    const dividerColor = useMemo<string>(() => theme.palette.outline, [theme]);

    // Callbacks
    const handleNavigateToFolders = useCallback(() => navigation.push('Folders'), []);
    // const handleNavigateToStats = useCallback(() => navigation.push('Stats'), []);

    return (
        <Scaffold>
            <BottomSheet title='more:select_theme' ref={themeBottomSheetRef} snapPoint={'30%'}>
                <ThemeModal />
            </BottomSheet>
            <BottomSheet title='more:select_lang' ref={languageBottomSheetRef} snapPoint={'30%'}>
                <LanguageModal />
            </BottomSheet>
            <View style={styles.body}>
                <TimeCard time={time} />
                <ReadedCard value={count} />
                <Divider color={dividerColor} lineWidth={0.5} />
                <TouchableOpacity style={styles.row} onPress={handleNavigateToFolders}>
                    <FolderIcon color={primaryColor} />
                    <BaseText
                        variant={'body'}
                        size={'medium'}
                        color={baseColor}
                        textTransform='capitalize'>
                        more:folders
                    </BaseText>
                </TouchableOpacity>
                {/*<TouchableOpacity style={styles.row} onPress={handleNavigateToStats}>*/}
                {/*    <ChartBarIcon color={primaryColor} />*/}
                {/*    <BaseText*/}
                {/*        variant={'body'}*/}
                {/*        size={'medium'}*/}
                {/*        color={baseColor}*/}
                {/*        textTransform='capitalize'>*/}
                {/*        more:stats*/}
                {/*    </BaseText>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => themeBottomSheetRef.current?.present()}>
                    <SparklesIcon color={primaryColor} />
                    <BaseText
                        variant={'body'}
                        size={'medium'}
                        color={baseColor}
                        textTransform='capitalize'>
                        more:theme
                    </BaseText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => languageBottomSheetRef.current?.present()}>
                    <GlobeAltIcon color={primaryColor} />
                    <BaseText
                        variant={'body'}
                        size={'medium'}
                        color={baseColor}
                        textTransform='capitalize'>
                        more:lang
                    </BaseText>
                </TouchableOpacity>
                {/*<View style={styles.row}>*/}
                {/*    <InformationCircleIcon color={primaryColor} />*/}
                {/*    <BaseText*/}
                {/*        variant={'body'}*/}
                {/*        size={'medium'}*/}
                {/*        color={baseColor}*/}
                {/*        textTransform='capitalize'>*/}
                {/*        more:info*/}
                {/*    </BaseText>*/}
                {/*</View>*/}
            </View>
        </Scaffold>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 20
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        gap: 25
    }
});

export default MoreScreen;
