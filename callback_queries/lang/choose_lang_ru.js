import { bot } from '../../bot.js'
import { updateUserLang } from '../../db_querys/user/index.js'
import { goToMainMenuOptions } from '../../options/menu/index.js'

export const chooseLangRu = async (msg, chatId, user) => {
	try {
		const lang = 'ru'
		await updateUserLang(user.id, lang)
		await bot.deleteMessage(chatId, msg.message.message_id)
		return await bot.sendMessage(chatId, `Язык изменен на русский`, {
			parse_mode: 'HTML',
			...(await goToMainMenuOptions(user.lang)),
		})
	} catch (error) {
		console.log(error)
	}
}
