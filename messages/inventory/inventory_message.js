import 'dotenv/config'
import { calculeteMyltiplier, calculeteRewardsForBox } from '../../functions.js'
export const inventoryMessage = async (lang, userReward) => {
	if (lang === 'ru') {
		return `💎Ваш инвентарь содержит:\n\n🎁Сундуки\n\n - Cтарый сундук (10-50 ${
			process.env.COIN_NAME
		}) : ${userReward.smallBox}\n - Роскошный сундук (60-250 ${
			process.env.COIN_NAME
		}) : ${userReward.midlelBox}\n - Cтарый сундук: (140-550 ${
			process.env.COIN_NAME
		})  ${
			userReward.largeBox
		}\n\n💎Суммарный доход с сундуков: ${await calculeteRewardsForBox(
			userReward
		)} ${process.env.COIN_NAME}\n\n🪡Талисманы\n\n - Бронзовый талисман: ${
			userReward.bronzeAmylet ? `активен: +5%` : `неактивен`
		}\n - Серебряный талисман: ${
			userReward.silverAmylet ? `активен: +10%` : `неактивен`
		}\n - Золотой талисман: ${
			userReward.goldAmylet ? `активен: +15%` : `неактивен`
		}\n - Бриллиантовый талисман: ${
			userReward.diamondAmylet ? `активен: +20%` : `неактивен`
		}\n\n💎Текущий множитель для ${process.env.COIN_NAME}: ${
			(await calculeteMyltiplier(userReward)) * 100
		}%`
	} else {
		return `💎Your inventory contains:\n\n🎁Chests\n\n - Old chest (10-50 ${
			process.env.COIN_NAME
		}) : ${userReward.smallBox}\n - Rusty chest (60-250 ${
			process.env.COIN_NAME
		}) : ${userReward.midlelBox}\n - Large chest (140-550 ${
			process.env.COIN_NAME
		})  ${
			userReward.largeBox
		}\n\n💎The total income from chests: ${await calculeteRewardsForBox(
			userReward
		)} ${process.env.COIN_NAME}\n\n🪡Amylets\n\n - Bronze amylet: ${
			userReward.bronzeAmylet ? `active: +5%` : `inactive`
		}\n - Silver amylet: ${
			userReward.silverAmylet ? `active: +10%` : `inactive`
		}\n - Gold amylet: ${
			userReward.goldAmylet ? `active: +15%` : `inactive`
		}\n - Diamond amylet: ${
			userReward.diamondAmylet ? `active: +20%` : `inactive`
		}\n\n💎Current multiplier for ${process.env.COIN_NAME}: ${
			(await calculeteMyltiplier(userReward)) * 100
		}%`
	}
}
