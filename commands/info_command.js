import { bot } from '../bot.js'

export const infoCommand = async (chatId, user) => {
	try {
		return await bot.sendMessage(
			chatId,
			`${user.first_name} ${user.username},вот ваша статистика!
			 Всего игр ${user.wrong + user.right}.
			 Побед ${user.right}.
			 Неудач ${user.wrong}.`
		)
	} catch (error) {
		console.log(error)
	}
}
