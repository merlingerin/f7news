import { combineReducers } from 'redux'
import News from './News';
import Options from './Options';
import vocabulary from './vocabulary';
import Favorites from './Favorites';

export default combineReducers({
    News,
    Options,
    // vocabulary,
    Favorites
});