import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import QueryParameter, {
  useSearchBooksQuery,
} from '../../api/googleBooksApi/googleBooksApi';
import BookCard from './components/BookCard';
import { debounce } from 'lodash';
import { Searchbar } from 'react-native-paper';
import { useGetBestSellersQuery } from '../../api/newYorkTimesApi/newYorkTimesApi';
import BestSellersCard from './components/BestSellerCard';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BookData } from '../../utils/models/bookData';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BookBottomSheetModal from './components/BookBottomSheetModal/BookBottomSheetModal';
import { useAppTheme } from '../../state/hooks';
import { useTranslation } from 'react-i18next';

const SearchScreen = () => {
  // -- Hooks
  // get translation
  const { t, i18n } = useTranslation();
  // Hook for getting the theme colors
  const { colors } = useAppTheme();
  // State for search query and toggle to skip API call
  const [query, setQuery] = React.useState<QueryParameter>({
    query: '',
    queryType: undefined,
    maxResults: 30,
    startIndex: 0,
    langRestrict: undefined,
    orderBy: undefined,
    printType: undefined,
  });

  // State for whether to skip the API call
  const [skip, setSkip] = React.useState<boolean>(true);

  // State for the book that is opened in the bottom sheet
  const [openedBook, setOpenedBook] = React.useState<BookData | null>(null);

  // Hooks for fetching data from Google Books and New York Times APIs
  const { data: books = [] } = useSearchBooksQuery(query, { skip });

  // Hook for fetching best sellers from the New York Times API
  const { data: bestSellers = [] } = useGetBestSellersQuery();

  // Debounces the search method using the debounce method from lodash
  const debouncedSkipToggle = React.useCallback(
    debounce(query => skipToggle(query), 500),
    [],
  );

  // Effect for debouncing the search method
  React.useEffect(() => {
    debouncedSkipToggle(query.query);
  }, [query]);

  // ref for bottom sheet modal
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // callback for presenting the bottom sheet modal
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  //Effect for opening the bottom sheet modal
  React.useEffect(() => {
    handlePresentModalPress();
  }, [openedBook]);

  //-- Methods
  /**
   * Sets the query state and skips the API call
   * @param text The text to search for
   */
  const onChangeQuery = (text: string) => {
    setSkip(true);
    setQuery({
      query: text,
      queryType: undefined,
      maxResults: 30,
      startIndex: 0,
      langRestrict: undefined,
      orderBy: undefined,
      printType: undefined,
    });
  };

  /**
   * Sets the skip state based on the length of the query
   * @param text The text to search for
   */
  const skipToggle = (text: string) => {
    if (text.length > 3) {
      setSkip(false);
    } else if (text === '' || text.length > 3) {
      setSkip(true);
    } else {
      setSkip(true);
    }
  };

  //-- Animations
  // Shared values for use with the animated scroll handler and styles
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);
  const marginTop = useSharedValue(50);

  // Animated style for the search bar
  const searchBarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(-translateY.value, {
            duration: 200,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
      zIndex: 100,
      elevation: 4,
    };
  });

  // Animated scroll handler for the flatlist and the searchbar
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (
        lastContentOffset.value > event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 0;
      } else if (
        lastContentOffset.value < event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 52;
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: e => {
      isScrolling.value = true;
    },
    onEndDrag: e => {
      isScrolling.value = false;
    },
  });

  //-- Render
  return (
    <>
      <Animated.View style={searchBarStyle}>
        <Searchbar
          style={{
            ...styles.searchbar,
            backgroundColor: colors.tertiaryContainer,
          }}
          placeholder={t('SEARCH')!}
          onChangeText={onChangeQuery}
          value={query.query}
        />
      </Animated.View>
      {query.query ? (
        <Animated.FlatList
          scrollEventThrottle={5}
          data={books}
          renderItem={({ item }) => (
            <BookCard
              book={item}
              onPress={book => {
                setOpenedBook(book);
              }}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={3}
          ListEmptyComponent={
            <View style={styles.container}>
              <ActivityIndicator />
            </View>
          }
          contentContainerStyle={styles.flatList}
          onScroll={scrollHandler}
        />
      ) : (
        <Animated.FlatList
          scrollEventThrottle={5}
          data={bestSellers}
          renderItem={({ item, index }) => (
            <BestSellersCard
              bestSeller={item}
              onPress={book => {
                setOpenedBook(book);
              }}
            />
          )}
          ListEmptyComponent={
            <View style={styles.container}>
              <ActivityIndicator />
            </View>
          }
          keyExtractor={item => item.book_details[0].primary_isbn13}
          numColumns={3}
          contentContainerStyle={styles.flatList}
          onScroll={scrollHandler}
        />
      )}
      {openedBook ? (
        <BookBottomSheetModal
          bottomSheetModalRef={bottomSheetModalRef}
          bookData={openedBook}
          onDismiss={() => setOpenedBook(null)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

//Styles
const styles = StyleSheet.create({
  searchbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scaffold: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 10,
  },
});

export default SearchScreen;
