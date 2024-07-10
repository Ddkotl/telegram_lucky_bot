import { bot } from '../../../bot.js'
import { amuletMessage } from '../../../messages/shop/index.js'
import { amuletOptions } from '../../../options/shop/index.js'

export const amulet = async (data, msg, chatId, user) => {
	if (data === '/amulet') {
		await bot.deleteMessage(chatId, msg.message.message_id)
		return await bot.sendMessage(chatId, await amuletMessage(user.lang), {
			parse_mode: 'HTML',
			...(await amuletOptions(user.lang)),
		})
	}
}
