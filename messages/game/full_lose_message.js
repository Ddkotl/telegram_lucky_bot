import 'dotenv/config'
export const fullLoseMessage = async (data, chats, chatId, user) => {
	if (user.lang === 'ru') {
		return `🥺Вы выбрали ${data}, вы не угадали, было загадано число ${chats[chatId]}.\nОсталось ${user.LUCK} ${process.env.COIN_NAME}, казино и ставки явно не ваша тема
				`
	} else {
		return `🥺You chose ${data}, you did not guess, the number was drawn ${chats[chatId]}.\nYou have ${user.LUCK} ${process.env.COIN_NAME}, casino and bets are not your thing
				`
	}
}
