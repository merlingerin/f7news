const initialState = {
    UA_uk: {
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
    RU_ru: {
        data: {
            today: 'Сегодня',
            yesterday: 'Вчера'
        },
        menu: {
            news: 'Новости',
            ukraine: 'Украина',
            emergencies: 'Чрезвычайные ситуации',
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

export default function Options(state = initialState, action) {
	switch(action.type) {
		case 'CHANGE_LANGUAGE':
			return {
				language: action.payload
			};
			break;
		default:
			return state.UA_uk;
	}
}