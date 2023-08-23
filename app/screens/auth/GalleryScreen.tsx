import { useCallback, useMemo } from 'react';
import Scaffold from '../../components/commons/Scaffold';
import Header from '../../components/commons/Header';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as React from 'react';
import SearchBar from '../../components/commons/SearchBar';
import { useNavigation } from '@react-navigation/native';
import useTheme from '../../hooks/useTheme';
import { useGetBestSellersQuery } from '../../api/newYorkTimesApi';
import { BestSeller } from '../../types/entities';
import BestSellerCard from '../../components/commons/BestSellerCard';

function GalleryScreen() {
    // Hooks
    const navigation = useNavigation<any>();
    const theme = useTheme();

    // Api
    const { data: bestSellers = [], isSuccess } = useGetBestSellersQuery();

    // Memos
    const SearchButton = useMemo(
        () => <MagnifyingGlassIcon color={theme.palette.onSecondary} />,
        [theme]
    );

    // const FilterButton = useMemo(
    //     () => <AdjustmentsVerticalIcon color={theme.palette.onSecondary} />,
    //     [theme]
    // );

    const activityIndicatorColor = useMemo<string>(() => theme.palette.primary, [theme]);

    // Callbacks
    const handleOpenSearch = useCallback(() => {
        navigation.push('Search');
    }, []);

    const renderCard = useCallback(
        ({ item }: { item: BestSeller }) => (
            <BestSellerCard
                title={item.title}
                source={item.bookImage}
                authors={[item.author]}
                type='cover'
                isbn={item.primaryIsbn10}
            />
        ),
        []
    );

    return (
        <Scaffold>
            <TouchableOpacity onPress={handleOpenSearch}>
                <SearchBar editable={false} actions={[SearchButton]} />
            </TouchableOpacity>
            <Header title={'gallery:best_seller'} color={theme.palette.onBackground} />
            {!isSuccess ? (
                <ActivityIndicator
                    style={styles.activityIndicator}
                    color={activityIndicatorColor}
                />
            ) : (
                <FlatList
                    data={bestSellers}
                    renderItem={renderCard}
                    keyExtractor={item => item.primaryIsbn10}
                    numColumns={3}
                    columnWrapperStyle={styles.columnWrapper}
                />
            )}
        </Scaffold>
    );
}

const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 55
    },
    columnWrapper: {
        justifyContent: 'space-between'
    },
    activityIndicator: {
        width: '100%',
        height: '80%'
    }
});

export default GalleryScreen;
