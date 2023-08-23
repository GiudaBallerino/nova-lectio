import { createSlice } from '@reduxjs/toolkit';
import { BookData } from '../../types/entities';

type InitialState = {
    bookshelf: BookData[];
    folders: string[];
};

const initialState: InitialState = {
    bookshelf: [],
    folders: []
};

//todo add recentlySearched state
//todo add filters for bookshelf

// Slice
export const bookshelfSlice = createSlice({
    name: 'bookshelf',
    initialState,
    reducers: {
        addBook: (state, action) => {
            const folders =
                action.payload.folders.length > 0 ? action.payload.folders : ['Default'];
            const index = state.bookshelf.findIndex(b => b.book.id === action.payload.book.id);
            if (index === -1) {
                const bookData: BookData = {
                    book: action.payload.book,
                    favorite: false,
                    removed: false,
                    currentPage: 0,
                    folders: folders
                };
                state.bookshelf.push(bookData);
            } else {
                state.bookshelf[index].folders = folders;
            }
        },
        updateBook: (state, action) => {
            const index = state.bookshelf.findIndex(b => b.book.id === action.payload.book.id);
            state.bookshelf[index] = action.payload;
        },
        addFolder: (state, action) => {
            if (
                state.folders.includes(action.payload.new) ||
                !action.payload.new ||
                action.payload.new === action.payload.initial
            ) {
                return;
            }
            const index = state.folders.findIndex(f => f === action.payload.initial);
            if (action.payload.initial && index !== -1) {
                state.folders[index] = action.payload.new;
            } else {
                state.folders.push(action.payload.new);
            }
            state.bookshelf.forEach(b => {
                if (b.folders.includes(action.payload.initial)) {
                    const bookIndex = state.bookshelf.findIndex(book => book.book.id === b.book.id);
                    const folderIndex = state.bookshelf[bookIndex].folders.findIndex(
                        folder => folder === action.payload.initial
                    );
                    state.bookshelf[bookIndex].folders[folderIndex] = action.payload.new;
                }
            });
        },
        deleteFolder: (state, action) => {
            state.bookshelf.forEach(b => {
                if (b.folders.includes(action.payload)) {
                    const index = state.bookshelf.findIndex(bo => bo.book.id === b.book.id);
                    if (state.bookshelf[index].folders.length === 1) {
                        state.bookshelf[index].folders = ['Default'];
                    } else {
                        state.bookshelf[index].folders = state.bookshelf[index].folders.filter(
                            f => f !== action.payload
                        );
                    }
                }
            });
            state.folders = state.folders.filter(f => f !== action.payload);
        }
    }
});

export const { addBook, updateBook, addFolder, deleteFolder } = bookshelfSlice.actions;
export default bookshelfSlice.reducer;
