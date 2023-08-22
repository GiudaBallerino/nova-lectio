// React
import {
    createContext,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import { BookData } from '../../types/entities';
import * as React from 'react';
import ReadModal from '../modals/ReadModal';
import { updateBook } from '../../store/slices/bookshelfSlice';
import useAppDispatch from '../../hooks/useAppDispath';
import useAppSelector from '../../hooks/useAppSelector';
import BottomSheet, { BottomSheetMethods } from '../commons/BottomSheet';

type BookContextProps = {
    book: BookData | undefined;
    modalRef: RefObject<BottomSheetMethods>;
    open: (book: BookData) => void;
    close: () => void;
};

type ProviderProps = {
    children?: ReactNode;
};

export const BookContext = createContext<BookContextProps>({} as BookContextProps);

function BookProvider(props: ProviderProps) {
    // Hooks
    const dispatch = useAppDispatch();

    // States
    const bookshelf = useAppSelector(store => store.bookshelf.bookshelf);
    const [state, setState] = useState<BookData | undefined>();

    // References
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    // Callbacks
    const handleOnUpdatePage = useCallback(
        (page: number) => {
            dispatch(updateBook({ ...state!, currentPage: page }));
        },
        [state]
    );

    // Methods
    const openBook = (book: BookData) => {
        setState(bookshelf.find(b => b.book.id === book.book.id));
    };

    const closeBook = () => {
        setState(undefined);
    };

    useEffect(() => {
        if (state) bottomSheetRef.current?.present();
        else bottomSheetRef.current?.close();
    }, [state]);

    useEffect(
        () => setState(prev => bookshelf.find(b => b.book.id === prev?.book.id)),
        [bookshelf]
    );

    // Render
    return (
        <BookContext.Provider
            value={{
                book: state,
                modalRef: bottomSheetRef,
                open: openBook,
                close: closeBook
            }}>
            <BottomSheet ref={bottomSheetRef} snapPoint={'30%'} title='Cerca' onDismiss={closeBook}>
                <ReadModal
                    currentPages={state?.currentPage}
                    totalPages={state?.book.volumeInfo?.pageCount}
                    setPages={handleOnUpdatePage}
                />
            </BottomSheet>
            {props.children}
        </BookContext.Provider>
    );
}

export default BookProvider;
