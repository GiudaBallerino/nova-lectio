// React
import {
    createContext,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import * as React from 'react';
import { SearchParameter, SearchResult } from '../../types/structs';
import { useLazySearchBooksQuery } from '../../api/googleBooksApi';
import { Book, BookData } from '../../types/entities';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../hooks/useAppSelector';
import BottomSheet, { BottomSheetMethods } from '../commons/BottomSheet';

type SearchContextProps = {
    query: SearchParameter;
    results: SearchResult;
    modalRef: RefObject<BottomSheetMethods>;
    setQueryParameter: (key: keyof SearchParameter, value: any) => void;
};

type ProviderProps = {
    initialValues: SearchParameter;
    children?: ReactNode;
};
//todo implement filters modal
export const SearchContext = createContext<SearchContextProps>({} as SearchContextProps);

function BookProvider(props: ProviderProps) {
    // Global State
    const books: BookData[] = useAppSelector(store => store.bookshelf.bookshelf);

    //Hooks
    const navigation = useNavigation();
    const [getBooks, result] = useLazySearchBooksQuery();

    // States
    const [state, setState] = useState<SearchParameter>(props.initialValues);

    // References
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    // Memos
    const searchResult = useMemo<(Book | BookData)[]>(
        () =>
            result.data
                ? result.data.map(book => {
                      const index = books.findIndex(b => b.book.id === book.id);
                      return index === -1 ? book : books[index];
                  })
                : [],
        [result, books]
    );

    // Callbacks
    const fetchData = useCallback(() => {
        if (state.query.length < 3) return;
        getBooks(state);
    }, [state]);

    // Methods
    const updateValue = (key: keyof SearchParameter, value: any) => {
        setState(prev => ({ ...prev, [key]: value }));
    };

    // Effects
    useEffect(() => {
        const timer = setTimeout(() => fetchData(), 500);

        return () => {
            clearTimeout(timer);
        };
    }, [state]);

    // Render
    return (
        <SearchContext.Provider
            value={{
                query: state,
                results: {
                    data: searchResult ?? [],
                    isUninitialized: result.isUninitialized,
                    isFetching: result.isFetching,
                    isError: result.isError,
                    isLoading: result.isLoading,
                    isSuccess: result.isSuccess
                },
                modalRef: bottomSheetRef,
                setQueryParameter: updateValue
            }}>
            <BottomSheet ref={bottomSheetRef} snapPoint='100%' title='search:filters'>
                <></>
            </BottomSheet>
            {props.children}
        </SearchContext.Provider>
    );
}

export default BookProvider;
