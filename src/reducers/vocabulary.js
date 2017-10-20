const initialState = {
    uk_UA: {
        data: {
            today: 'Сьогоднi',
            yesterday: 'Вчора'
        },
        menu: {
            news: 'Новини',
            ukraine: 'Україна',
            emergencies: 'Надзвичайні події',
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
    ru_RU: {
        data: {
            today: 'Сегодня',
            yesterday: 'Вчера'
        },
        menu: {
            news: 'Новости',
            ukraine: 'Украина',
            emergencies: 'Происшествия',
            lol: 'Lol',
            world: 'Мир',
            lifstyle: 'Lifstyle',
            sport: 'Спорт',
            showbiz: 'Шоу-бизнес',
            favorites: 'Сохранённые',
            aboutUs: 'Про нас'
        },
        favorites: {
            favorites: 'Сохранённые'
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