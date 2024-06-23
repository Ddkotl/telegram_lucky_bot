import 'dotenv/config'
import { bot } from './bot.js'
import {
	gameCommand,
	infoCommand,
	notUnderstandCommand,
	refCommand,
	setMyCommands,
	startCommand,
} from './commands/index.js'
import prisma from './db.js'

import { testConnect } from './db_querys/index.js'
import { createUser, findUserByChatId } from './db_querys/user/index.js'
import { againOptions } from './options.js'

export const chats = new Object()

const startApp = async () => {
	testConnect()
	setMyCommands()
	bot.on('message', async msg => {
		try {
			const chatId = msg.chat.id
			const username = msg.chat.username
			const firstname = msg.chat.first_name
			const text = msg.text
			const user = await findUserByChatId(chatId)
			if (!user) {
				createUser(chatId, username, firstname)
			}

			if (text.startsWith('/start')) {
				return await startCommand(chatId, user, msg)
			}
			if (text === '/info') {
				return await infoCommand(chatId, user)
			}
			if (text === '/game') {
				return await gameCommand(chatId)
			}
			if (text === '/ref') {
				return await refCommand(chatId, user)
			}
			return await notUnderstandCommand(chatId, firstname, username)
		} catch (error) {
			console.log(error)
		}
	})
	bot.on('callback_query', async msg => {
		try {
			const data = msg.data
			const chatId = msg.message.chat.id
			const user = await findUserByChatId(chatId)
			if (data === '/again') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return gameCommand(chatId)
			}
			if (data == chats[chatId]) {
				const winCoin = Number(process.env.WIN_COIN)
				await prisma.user.update({
					where: { chatId: chatId },
					data: {
						right: user.right + 1,
						LUCK: user.LUCK + winCoin,
					},
				})
				await bot.editMessageText(
					`Вы выбрали ${data}, поздравляю, вы угадали!
					Вы получили ${process.env.WIN_COIN} ${process.env.COIN_NAME}, осталось ${
						user.LUCK + winCoin
					} ${process.env.COIN_NAME}
					`,
					{
						chat_id: chatId,
						message_id: msg.message.message_id,
					}
				)
				return await bot.sendMessage(
					chatId,
					'Xотите сыграть еще?',
					againOptions
				)
			} else {
				if (user.LUCK <= 0) {
					await prisma.user.update({
						where: { chatId: chatId },
						data: { wrong: user.wrong + 1 },
					})
					await bot.editMessageText(
						`Вы выбрали ${data}, вы не угадали, было загадано число ${chats[chatId]}
						Осталось ${user.LUCK} ${process.env.COIN_NAME}
						`,
						{
							chat_id: chatId,
							message_id: msg.message.message_id,
						}
					)
				} else {
					await prisma.user.update({
						where: { chatId: chatId },
						data: {
							wrong: user.wrong + 1,
							LUCK: user.LUCK - process.env.LOSE_COIN,
						},
					})
					await bot.editMessageText(
						`Вы выбрали ${data}, вы не угадали, было загадано число ${
							chats[chatId]
						}
						К сожалению, вы потеряли ${process.env.LOSE_COIN} ${
							process.env.COIN_NAME
						}, осталось ${user.LUCK - process.env.LOSE_COIN} ${
							process.env.COIN_NAME
						}
						`,
						{
							chat_id: chatId,
							message_id: msg.message.message_id,
						}
					)
				}

				return await bot.sendMessage(
					chatId,
					'Xотите сыграть еще?',
					againOptions
				)
			}
		} catch (error) {
			console.log(error)
		}
	})
}

startApp()
