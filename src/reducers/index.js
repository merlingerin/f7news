import { combineReducers } from 'redux'
import News from './News';
import Options from './Options';
import Vocabulary from './Vocabulary';
import Favorites from './Favorites';

export default combineReducers({
    News,
    Options,
    Favorites,
    Vocabulary    
});