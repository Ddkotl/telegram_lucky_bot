import { bot } from '../bot.js'
export const setMyCommands = () => {
	try {
		bot.setMyCommands([{ command: '/start', description: 'Start' }])
	} catch (error) {
		console.log(error)
	}
}
