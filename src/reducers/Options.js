const initialState = {
	bigFont: false,
	category: 'all'
}

export default function Options(state = initialState, action) {
	switch(action.type) {
		case 'CHANGE_FONT':
			return {
				...state,				
				bigFont: action.payload
			};
			break;
		case 'CHANGE_CATEGORY':
			return {
				...state,
				category: action.payload
			}
			break;
		default:
			return state;
	}
}