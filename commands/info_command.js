import { bot } from '../bot.js'
import { goToMainMenuOptions } from '../options.js'

export const infoCommand = async (chatId, user) => {
	try {
		return await bot.sendMessage(
			chatId,
			`
			Cтатистика:\n\n💎Имя: ${user.first_name} ${user.username}\n💎Всего игр: ${
				user.wrong + user.right
			}\n💎Побед: ${user.right}\n💎Неудач ${user.wrong}\n💎Баланс : ${
				user.LUCK
			} ${process.env.COIN_NAME}`,
			{ parse_mode: 'HTML', ...goToMainMenuOptions }
		)
	} catch (error) {
		console.log(error)
	}
}
