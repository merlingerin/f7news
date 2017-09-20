import {About} from './components/pages/About';
import {Form} from './components/pages/Form';
import {Ukraine} from './components/pages/Ukraine';
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
    path: '/:category/:postId',
    component: Form
}, {
    path: '/ukraine/',
    component: Ukraine
}, {
    path: '/emergencies/',
    component: Emergencies
}, {
    path: '/world/',
    component: World
}, {
    path: '/lol/',
    component: Lol
}, {
    path: '/lifestyle/',
    component: Lifestyle
}, {
    path: '/sport/',
    component: Sport
}, {
    path: '/showbusiness/',
    component: Showbusiness
}, {
    path: '/form/',
    component: Form
}];