import About from './components/pages/About';
import NewsView from './components/pages/NewsView';
import FavoritesView from './components/pages/FavoritesView';

export const routes = [{
    path: '/favorites/',
    component: FavoritesView
},{
    path: '/about/',
    component: About
}, {
    path: '/news/:category/:postId/',
    component: NewsView
}, {
    path: '/news/:postId/',
    component: NewsView
}];