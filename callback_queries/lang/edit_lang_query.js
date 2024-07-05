import { bot } from '../../bot.js'

export const editLangQuery = async (chatId, msg) => {
	await bot.deleteMessage(chatId, msg.message.message_id)
	return await bot.sendMessage(chatId, `🏴‍☠️Выберите язык`, {
		parse_mode: 'HTML',
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[
					{ text: 'Русский', callback_data: '/langRu' },
					{ text: 'English', callback_data: '/langEn' },
				],
			],
		}),
	})
}
