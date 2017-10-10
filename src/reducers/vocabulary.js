const initialState = {
    UAuk: {
        data: {
            today: 'Сьогоднi',
            yesterday: 'Вчора'
        },
        menu: {
            news: 'Новини',
            ukraine: 'Украна',
            emergencies: 'надзвичайні події',
            lol: 'Lol',
            world: 'Світ',
            lifstyle: 'Lifstyle',
            sport: 'Спорт',
            showbiz: 'Шоу-бізнес',
            favorites: 'Збережені',
            aboutUs: 'Про нас'
        },
        favorites: {
            favorites: 'Збережені'
        }
    },
    RUru: {}
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