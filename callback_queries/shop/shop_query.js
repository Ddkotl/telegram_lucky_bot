import { amulet } from './amulet/amulet.js'
import { byeAmulet } from './amulet/bye_amulet.js'
import { box } from './box/box.js'
import { byeBox } from './box/bye_box.js'
import { shop } from './shop.js'

export const shopQuery = async (data, msg, chatId, user, userReward) => {
	await shop(data, msg, chatId, user)
	await box(data, msg, chatId, user)
	await byeBox(data, msg, chatId, user)
	await amulet(data, msg, chatId, user)
	await byeAmulet(data, msg, chatId, user, userReward)
}
