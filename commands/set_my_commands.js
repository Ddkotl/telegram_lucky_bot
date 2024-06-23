import { bot } from '../bot.js'
export const setMyCommands = () => {
	try {
		bot.setMyCommands([
			{ command: '/start', description: 'Приветствие | Главное меню' },
			{ command: '/info', description: 'Информация | Статистика' },
			{ command: '/game', description: 'Сыграть в игру на удачу' },
			{ command: '/ref', description: 'Реферальная ссылка' },
		])
	} catch (error) {
		console.log(error)
	}
}
