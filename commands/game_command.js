import { bot } from '../bot.js'
import { getRamdomNumber } from '../functions.js'
import { chats } from '../index.js'
import { gameOptions } from '../options.js'
export const gameCommand = async chatId => {
	try {
		await bot.sendMessage(
			chatId,
			'🤔Я загадал цифру от 0 до 9, попробуй отгадать.',
			gameOptions
		)
		chats[chatId] = getRamdomNumber()
	} catch (error) {
		console.log(error)
	}
}
