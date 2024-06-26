import { bot } from '../bot.js'
export const setMyCommands = () => {
	try {
		bot.setMyCommands([{ command: '/start', description: 'Главное меню' }])
	} catch (error) {
		console.log(error)
	}
}
