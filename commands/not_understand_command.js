import { bot } from '../bot.js'

export const notUnderstandCommand = async (chatId, firstname, username) => {
	try {
		return await bot.sendMessage(
			chatId,
			`${firstname} ${username}, я тебя не понимаю, попробуй ввести запрос из меню `
		)
	} catch (error) {
		console.log(error)
	}
}
