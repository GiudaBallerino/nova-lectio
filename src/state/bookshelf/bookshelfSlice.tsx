import { createSlice } from '@reduxjs/toolkit';
import { Book } from '../../api/googleBooksApi/models/book';
import { BookData } from '../../utils/models/bookData';

//-- Interface for initial state
interface InitialState {
  bookshelf: BookData[];
}

//-- Initial state
const initialState: InitialState = {
  bookshelf: [],
};

// create slice
export const bookshelfSlice = createSlice({
  name: 'bookshelf',
  initialState,
  reducers: {
    /**
     *  Adds book to bookshelf
     * @param {Book} book - book to add
     * @returns {void}
     */
    addBook: (state, actions) => {
      const index = state.bookshelf.findIndex(
        b => b.book.id === actions.payload.book.id,
      );
      if (index === -1) {
        state.bookshelf.push({
          book: actions.payload.book,
          currentPage: 0,
          favorite: false,
          removed: false,
        });
      } else {
        state.bookshelf[index].removed = false;
      }
    },
    /**
     *  Removes book from bookshelf
     * @param id - id of book to remove
     * @returns {void}
     */
    removeBook: (state, actions) => {
      const index = state.bookshelf.findIndex(
        b => b.book.id === actions.payload.id,
      );
      state.bookshelf[index].removed = true;
    },
    /**
     * Sets book as favorite
     * @param index - index of book in bookshelf
     * @returns {void}
     */
    setRemoved: (state, actions) => {
      state.bookshelf[actions.payload.index].removed =
        !state.bookshelf[actions.payload.index].removed;
    },
    /**
     * Sets book as favorite
     * @param index - index of book in bookshelf
     * @returns {void}
     */
    setFavorite: (state, actions) => {
      state.bookshelf[actions.payload.index].favorite =
        !state.bookshelf[actions.payload.index].favorite;
    },
    /**
     * Updates current page of book
     * @param index - index of book in bookshelf
     * @param page - page to set as current page
     * @returns {void}
     */
    updateCurrentPage: (state, actions) => {
      state.bookshelf[actions.payload.index].currentPage = actions.payload.page;
    },
  },
});

export const {
  addBook,
  removeBook,
  setFavorite,
  updateCurrentPage,
  setRemoved,
} = bookshelfSlice.actions;
export default bookshelfSlice.reducer;
