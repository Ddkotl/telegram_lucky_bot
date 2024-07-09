import 'dotenv/config'

export const shopMessage = async lang => {
	if (lang === 'ru') {
		return `💎В магазине вы можете приобретать предметы,увеличивающие прирост вашей удачи ${process.env.COIN_NAME}.\n\n💎В данный момент есть товары двух видов:\n\n🎁Сундуки - продаются за ${process.env.COIN_NAME} и дают случайное количество ${process.env.COIN_NAME} через определенное количество времени. Сундуков можно покупать неограниченное количество.\n\n🪡Талисманы - они дают случайное количество ${process.env.COIN_NAME} через определенное количество времени, а получить их можно только имея определенное количество рефералов.`
	} else {
		return `💎In the shop you can buy items that increase your luck ${process.env.COIN_NAME}.\n\n💎Currently there are two types of charms:\n\n🎁Chest - they sell for ${process.env.COIN_NAME} and give a random amount of ${process.env.COIN_NAME} after a certain period of time. You can buy as many chests as you want.\n\n🪡Talisman - they give a random amount of ${process.env.COIN_NAME} after a certain period of time, and you can only obtain them by having a certain number of referrals.`
	}
}
