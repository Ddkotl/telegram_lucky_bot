import 'dotenv/config'
import { bot } from '../bot.js'
import { mainMenuOptions } from '../options.js'

export async function startCommand(chatId, user) {
	try {
		return await bot.sendMessage(
			chatId,
			`
			💎<b>Привет ${user.first_name} ${user.username}, проверь свою удачу🍀!</b>💎\n\n💎Ожидается большой аирдроп 🚀 ${process.env.COIN_NAME}\n\n💎${process.env.COIN_NAME} — это новый токен на TON с реальным применением. Монета станет главным игровым ресурсом в будущей экосистеме LUCK, а добывать ее можно уже сейчас.\n\n💎Хотите получить еще больше ${process.env.COIN_NAME}? Просто поделитесь этим ботом со своими друзьями! Как только друг присоединится,вы и он получите приветственный бонус - 500 монет ${process.env.COIN_NAME}!\n\n💎Ваш баланс: ${user.LUCK} ${process.env.COIN_NAME}💰\n\n💎Количество рефералов: ${user.referals}\n\n💎Увеличить удачу можно разными способами:\n✅Сыграть в игру\n✅Выполнить задания\n✅Купить ларцы и амулеты в магазине\n✅Приглашать друзей
			`,
			{ parse_mode: 'HTML', ...mainMenuOptions }
		)
	} catch (error) {
		console.log(error)
	}
}
