if(!localStorage.getItem('favorites')) {
    localStorage.setItem('favorites', '[]');
}
let initialState = JSON.parse(localStorage['favorites']).map((item, idx) => {
    return item;
})

export default function Favorites(state = initialState, action) {
    switch(action.type) {
        case 'ADD_FAVORITES':
            let favorites = JSON.parse(localStorage['favorites']);
            favorites.push(action.payload);
            localStorage['favorites'] = JSON.stringify(favorites);
            
            let fromStorage = JSON.parse(localStorage['favorites']).map((item, idx) => {
                return item;
            })
            return fromStorage;
            break;
        case 'REMOVE_FAVORITES':
            const newState = state.filter((item, idx) => {
                return item.id !== action.payload
            });
            const newLocalStorage = JSON.parse(localStorage['favorites']).filter((item, idx) => {
                return item.id !== action.payload
            })
            localStorage['favorites'] = JSON.stringify(newLocalStorage);
            return [...newState];
            break;
        default:
            return state;
    }
}