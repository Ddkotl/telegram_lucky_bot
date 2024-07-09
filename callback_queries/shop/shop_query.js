import { bot } from '../../bot.js'
import { box } from './box/box.js'
import { byeBox } from './box/bye_box.js'
import { shop } from './shop.js'

export const shopQuery = async (data, msg, chatId, user) => {
	await shop(data, msg, chatId, user)
	await box(data, msg, chatId, user)
	await byeBox(data, msg, chatId, user)

	if (data === '/amulet') {
		await bot.deleteMessage(chatId, msg.message.message_id)
		return await bot.sendMessage(
			chatId,
			`
			💎В данном разделе находятся талисманы.\n\n💎Талисманы приносят каждые 24 часа определенное количество ${process.env.COIN_NAME}, дополнительных действий не требуется!\n\n1. Бронзовый талисман\nЕжедневно приносит 10 ${process.env.COIN_NAME}\n\n2. Серебряный талисман\nЕжедневно приносит 20 ${process.env.COIN_NAME}\n\n3. Золотой талисман\nЕжедневно приносит 30 ${process.env.COIN_NAME}\n\n4. Бриллиантовый талисман\nЕжедневно приносит 10 ${process.env.COIN_NAME}`,
			{
				parse_mode: 'HTML',
				...amuletOptions,
			}
		)
	}
}
