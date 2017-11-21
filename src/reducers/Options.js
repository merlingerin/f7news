const initialState = {
	bigFont: false,
	category: 'all',
	currentNews: {},
	currentLang: 'ru_RU',
	open: false
}

export default function Options(state = initialState, action) {
	switch(action.type) {
		case 'CHANGE_FONT':
			return {
				...state,				
				bigFont: action.payload
			};
			break;
		case 'SET_CURRENT_NEWS':
			return  {
				...state,
				currentNews: action.payload
			}
		case 'CHANGE_CATEGORY':
			return {
				...state,
				category: action.payload
			}
			break;
		case 'SET_CURRENT_LANG':
			localStorage.setItem('lang', action.payload);
			return {
				...state,
				currentLang: action.payload
			}
		case 'OPEN_MENU':
			return {
				...state,
				open: action.payload
			}
		default:
			return state;
	}
}