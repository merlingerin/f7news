import {About} from './components/pages/About';
import NewsView from './components/pages/NewsView';
import FavoritesView from './components/pages/FavoritesView';
import {Emergencies} from './components/pages/Emergencies';
import {World} from './components/pages/World';
import {Lol} from './components/pages/Lol';
import {Lifestyle} from './components/pages/Lifestyle';
import {Sport} from './components/pages/Sport';
import {Showbusiness} from './components/pages/Showbusiness';

export const routes = [{
    path: '/about/',
    component: About
}, {
    path: '/:idx/:postId/',
    component: NewsView
}, {
    path: '/favorites/',
    component: FavoritesView
}];