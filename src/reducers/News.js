export default function News(state = {}, action) {
	switch(action.type) {
		case 'FETCH_NEWS':
			return {
				...state,
				...action.payload
			};
			break;
		case 'ADD_NEWS':
			return {
				...state,
				...action.payload
			}
		default:
			return state;
	}
}