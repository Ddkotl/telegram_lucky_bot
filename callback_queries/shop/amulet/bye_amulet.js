import 'dotenv/config'
import { bot } from '../../../bot.js'
import {
	addBronzeAmyletByUserId,
	addDiamondAmyletByUserId,
	addGoldAmyletByUserId,
	addSilverAmyletByUserId,
} from '../../../db_querys/reward/index.js'
import {
	amuletAlreadyRecievedMessage,
	failGetAmuletMessage,
	successByeMessage,
} from '../../../messages/shop/index.js'
import { backToAmuletOptions } from '../../../options/shop/index.js'
export const byeAmulet = async (data, msg, chatId, user, userReward) => {
	const canUserGetBronseAmulet =
		user.referals >= process.env.REF_TO_BRONSE_AMULET
	const canUserGetSilverAmulet =
		user.referals >= process.env.REF_TO_SILVER_AMULET
	const canUserGetGoldAmulet = user.referals >= process.env.REF_TO_GOLD_AMULET
	const canUserGetDiamondAmulet =
		user.referals >= process.env.REF_TO_DIAMOND_AMULET

	if (data === '/bronzeAmulet') {
		if (!canUserGetBronseAmulet) {
			await bot.deleteMessage(chatId, msg.message.message_id)
			return await bot.sendMessage(
				chatId,
				await failGetAmuletMessage(user.lang),
				{
					parse_mode: 'HTML',
					...(await backToAmuletOptions(user.lang)),
				}
			)
		} else {
			await bot.deleteMessage(chatId, msg.message.message_id)
			await addBronzeAmyletByUserId(user)
			return await bot.sendMessage(
				chatId,
				userReward.bronzeAmylet === true
					? await amuletAlreadyRecievedMessage(user.lang)
					: await successByeMessage(user.lang),
				{
					parse_mode: 'HTML',
					...(await backToAmuletOptions(user.lang)),
				}
			)
		}
	}
	if (data === '/silverAmulet') {
		if (!canUserGetSilverAmulet) {
			await bot.deleteMessage(chatId, msg.message.message_id)
			return await bot.sendMessage(
				chatId,
				await failGetAmuletMessage(user.lang),
				{
					parse_mode: 'HTML',
					...(await backToAmuletOptions(user.lang)),
				}
			)
		} else {
			await bot.deleteMessage(chatId, msg.message.message_id)
			await addSilverAmyletByUserId(user)
			return await bot.sendMessage(
				chatId,
				userReward.silverAmylet === true
					? await amuletAlreadyRecievedMessage(user.lang)
					: await successByeMessage(user.lang),
				{
					parse_mode: 'HTML',
					...(await backToAmuletOptions(user.lang)),
				}
			)
		}
	}
	if (data === '/goldAmulet') {
		if (!canUserGetGoldAmulet) {
			await bot.deleteMessage(chatId, msg.message.message_id)
			return await bot.sendMessage(
				chatId,
				await failGetAmuletMessage(user.lang),
				{
					parse_mode: 'HTML',
					...(await backToAmuletOptions(user.lang)),
				}
			)
		} else {
			await bot.deleteMessage(chatId, msg.message.message_id)
			await addGoldAmyletByUserId(user)
			return await bot.sendMessage(
				chatId,
				userReward.goldAmylet === true
					? await amuletAlreadyRecievedMessage(user.lang)
					: await successByeMessage(user.lang),
				{
					parse_mode: 'HTML',
					...(await backToAmuletOptions(user.lang)),
				}
			)
		}
	}
	if (data === '/diamondAmulet') {
		if (!canUserGetDiamondAmulet) {
			await bot.deleteMessage(chatId, msg.message.message_id)
			return await bot.sendMessage(
				chatId,
				await failGetAmuletMessage(user.lang),
				{
					parse_mode: 'HTML',
					...(await backToAmuletOptions(user.lang)),
				}
			)
		} else {
			await bot.deleteMessage(chatId, msg.message.message_id)
			await addDiamondAmyletByUserId(user)
			return await bot.sendMessage(
				chatId,
				userReward.diamondAmylet === true
					? await amuletAlreadyRecievedMessage(user.lang)
					: await successByeMessage(user.lang),
				{
					parse_mode: 'HTML',
					...(await backToAmuletOptions(user.lang)),
				}
			)
		}
	}
}
