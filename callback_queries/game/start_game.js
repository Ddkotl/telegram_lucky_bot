import { bot } from '../../bot.js'
import { getRamdomNumber } from '../../functions.js'
import { startGameMessage } from '../../messages/game/index.js'
import { gameOptions } from '../../options/game/index.js'
export const startGame = async (chatId, chats, user) => {
	try {
		await bot.sendMessage(
			chatId,
			await startGameMessage(user.lang),
			await gameOptions(user.lang)
		)
		chats[chatId] = getRamdomNumber()
	} catch (error) {
		console.log(error)
	}
}
