const initialState = {
    uk_UA: {
        data: {
            today: 'Сьогоднi',
            yesterday: 'Вчора',
            url: 'ua'
        },
        menu: {
            news: 'Новини',
            ukraine: 'Україна',
            emergencies: 'Надзвичайні події',
            lol: 'Lol',
            world: 'Світ',
            lifestyle: 'Lifstyle',
            sport: 'Спорт',
            showbiz: 'Шоу-бізнес',
            favorites: 'Збережені',
            aboutUs: 'Про нас'
        },
        favoritesView: {
            favorites: 'Збережені'
        },
        aboutUsView: {
            aboutUs: 'ПРО НАС'
        }
    },
    ru_RU: {
        data: {
            today: 'Сегодня',
            yesterday: 'Вчера',
            url: 'ru'            
        },
        menu: {
            news: 'Новости',
            ukraine: 'Украина',
            emergencies: 'Происшествия',
            lol: 'Lol',
            world: 'Мир',
            lifestyle: 'Lifstyle',
            sport: 'Спорт',
            showbiz: 'Шоу-бизнес',
            favorites: 'Сохранённые',
            aboutUs: 'Про нас'
        },
        favoritesView: {
            favorites: 'Сохранённые'
        },
        aboutUsView: {
            aboutUs: 'ПРО НАС'
        }
    }
}

export default function Vocabulary(state = initialState, action) {
	switch(action.type) {
		case 'CHANGE_LANGUAGE':
			return {
				language: action.payload
			};
			break;
		default:
			return state;
	}
}