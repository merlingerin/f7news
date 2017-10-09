const initialState = {
    bigFont: false
}

export default function Options(state = initialState, action) {
	switch(action.type) {
		case 'CHANGE_FONT':
			return {
				bigFont: action.payload
			};
			break;
		default:
			return state;
	}
}