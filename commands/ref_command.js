import 'dotenv/config'
import { bot } from '../bot.js'

export const refCommand = async (chatId, user) => {
	const bonus = user.referals * process.env.COIN_FOR_REFERAL
	await bot.sendMessage(
		chatId,
		`
		Вы пригласили: ${user.referals} человек.
		Получено удачи за приглашенных: ${bonus} ${process.env.COIN_NAME}
		Ваша реферальная ссылка: ${process.env.URL_TO_BOT}?start=${user.id}`
	)
}
