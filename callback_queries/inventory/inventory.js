import { bot } from '../../bot.js'
import { inventoryMessage } from '../../messages/inventory/index.js'
import { inventoryOptions } from '../../options/inventory/index.js'

export const inventory = async (data, user, chatId, msg, userReward) => {
	if (data === '/inventory') {
		await bot.deleteMessage(chatId, msg.message.message_id)
		return await bot.sendMessage(
			chatId,
			await inventoryMessage(user.lang, userReward),
			{
				parse_mode: 'HTML',
				...(await inventoryOptions(user.lang)),
			}
		)
	}
}
