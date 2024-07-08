import 'dotenv/config'
export const loseMessage = async (data, chats, chatId, user) => {
	if (user.lang === 'ru') {
		return `🥺Вы выбрали ${data}, вы не угадали, было загадано число ${
			chats[chatId]
		}.\nК сожалению, вы потеряли ${process.env.LOSE_COIN} ${
			process.env.COIN_NAME
		}, осталось ${user.LUCK - process.env.LOSE_COIN} ${process.env.COIN_NAME}
				`
	} else {
		return `🥺You chose ${data}, you did not guess, the number was drawn ${
			chats[chatId]
		}.\nUnfortunately, you lost ${process.env.LOSE_COIN} ${
			process.env.COIN_NAME
		}, you have ${user.LUCK - process.env.LOSE_COIN} ${process.env.COIN_NAME}
				`
	}
}
