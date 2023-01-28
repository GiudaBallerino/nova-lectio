// Description: This file contains the routes of the app

// define the Route type
interface Route {
  key: string;
  focusedIcon: string;
}

// define the routes
const routes: Route[] = [
  { key: 'gallery', focusedIcon: 'library-shelves' },
  { key: 'search', focusedIcon: 'book-search' },
  { key: 'profile', focusedIcon: 'account-box' },
];

export default routes;
