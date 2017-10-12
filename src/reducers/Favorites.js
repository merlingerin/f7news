let initialState = Object.keys(localStorage).map((item, idx) => {
    return localStorage[item];
})
export default function Favorites(state = initialState, action) {
    switch(action.type) {
        case 'ADD_FAVORITES':
            localStorage[action.payload.id] = JSON.stringify(action.payload);
            let fromStorage = Object.keys(localStorage).map((item, idx) => {
                return localStorage[item];
            })
            return fromStorage;
            break;
        case 'REMOVE_FAVORITES':
            const newState = state.filter((item, idx) => {
                return item.id !== action.payload
            });
            localStorage.setItem('favorites', [
                ...newState
            ]);
            return [
                ...newState
            ]
            break;
        default:
            return state;
    }
}