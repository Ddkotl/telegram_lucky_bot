import 'dotenv/config'
import { bot } from '../bot.js'
import { mainMenuOptions } from '../options.js'
export async function startCommand(chatId, user) {
	try {
		await bot.sendSticker(
			chatId,
			'https://tlgrm.ru/_/stickers/c70/8c4/c708c4e4-425e-43c1-893f-6478eae07d62/2.webp'
		)
		return await bot.sendMessage(
			chatId,
			`
				Привет ${user.first_name} ${user.username}, проверь свою удачу!
	
			${process.env.COIN_NAME} Ожидается большой аирдроп 🚀 
	
			${process.env.COIN_NAME} — это новый токен на TON с реальным применением. Монета станет главным игровым ресурсом в будущей экосистеме LUCK, а добывать ее можно уже сейчас.
	
			Хотите получить еще больше ${process.env.COIN_NAME}? Просто поделитесь этим ботом со своими друзьями! Как только друг присоединится,вы и он получите приветственный бонус - 500 монет ${process.env.COIN_NAME}!
	
			Ваш баланс: ${user.LUCK} ${process.env.COIN_NAME}💰
	
			👨‍👩‍👧‍👦 Количество рефералов: ${user.referals} 
			`,
			mainMenuOptions
		)
	} catch (error) {
		console.log(error)
	}
}
