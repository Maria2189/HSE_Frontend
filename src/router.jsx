import { createBrowserRouter } from 'react-router';
import App from './containers/App/App';
import Movies from './containers/Pages/Movies/Movies';
import Users from './containers/Pages/Users/Users';
import Posts from './containers/Pages/Posts/Posts';
import Profile from './containers/Pages/Profile/Profile';
import Favorites from './containers/Pages/Favorites/Favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Movies,
      },
      {
        path: 'users',
        Component: Users,
      },
      {
        path: 'posts',
        Component: Posts,
      },
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'favorites',
        Component: Favorites,
      },
    ],
  },
]);