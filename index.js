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
import { findUserRewardsByChatId } from './db_querys/user/find_one.js'
import { createUser, findUserByChatId } from './db_querys/user/index.js'
import {
	connectWalletOptions,
	shopOptions,
	startGameOptions,
} from './options.js'

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
				await createUser(chatId, username, firstname, text)
				return await bot.sendMessage(
					chatId,
					'🥳Вы успешно зарегистрировались,нажмите /start для начала 🫡'
				)
			}

			if (text === '/start') {
				if (user) {
					return await startCommand(chatId, user, msg)
				}
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
			if (data === '/info') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await infoCommand(chatId, user)
			}
			if (data === '/ref') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await refCommand(chatId, user)
			}
			if (data === '/tasks') {
				return await bot.sendMessage(chatId, 'Tasks')
			}
			if (data === '/shop') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await bot.sendMessage(
					chatId,
					`💎В магазине вы можете приобретать предметы,увеличивающие прирост вашей удачи ${process.env.COIN_NAME}.\n\n💎В данный момент есть товары двух видов:\n\n🎁Ларцы - продаются за ${process.env.COIN_NAME} и дают случайное количество ${process.env.COIN_NAME} через определенное количество времени. Ларцов можно покупать неограниченное количество.\n\n🪡Амулеты - они дают случайное количество ${process.env.COIN_NAME} через определенное количество времени, а получить их можно только имея определенное количество рефералов.`,
					{
						parse_mode: 'HTML',
						...shopOptions,
					}
				)
			}
			if (data === '/inventory') {
				const revard = await findUserRewardsByChatId(chatId)
				console.log(revard)
				return await bot.sendMessage(chatId, 'inventory')
			}
			if (data === '/connectWallet') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await bot.sendMessage(
					chatId,
					`💎Введите номер вашего кошелька в сети $TON:`,
					{ parse_mode: 'HTML', ...connectWalletOptions }
				)
			}
			if (data === '/wallet') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await bot.sendMessage(
					chatId,
					`💎Привяжите свой кошелек в сети $TON, на него будут отправляться награды и будущий аирдроп.\n\n 💎В данный момент кошелек не привязан`,
					{ parse_mode: 'HTML', ...connectWalletOptions }
				)
			}
			if (data === '/goToMainMenu') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await startCommand(chatId, user)
			}
			if (data === '/game') {
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
					`🥳Вы выбрали ${data}, поздравляю, вы угадали!\nВы получили ${
						process.env.WIN_COIN
					} ${process.env.COIN_NAME}, осталось ${user.LUCK + winCoin} ${
						process.env.COIN_NAME
					}
					`,
					{
						chat_id: chatId,
						message_id: msg.message.message_id,
					},
					{ parse_mode: 'HTML' }
				)
				return await bot.sendMessage(
					chatId,
					'Xотите сыграть еще?',
					startGameOptions
				)
			} else {
				if (user.LUCK <= 0) {
					await prisma.user.update({
						where: { chatId: chatId },
						data: { wrong: user.wrong + 1 },
					})
					await bot.editMessageText(
						`🥺Вы выбрали ${data}, вы не угадали, было загадано число ${chats[chatId]}.\nОсталось ${user.LUCK} ${process.env.COIN_NAME}
						`,
						{
							chat_id: chatId,
							message_id: msg.message.message_id,
						},
						{ parse_mode: 'HTML' }
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
						`🥺Вы выбрали ${data}, вы не угадали, было загадано число ${
							chats[chatId]
						}.\nК сожалению, вы потеряли ${process.env.LOSE_COIN} ${
							process.env.COIN_NAME
						}, осталось ${user.LUCK - process.env.LOSE_COIN} ${
							process.env.COIN_NAME
						}
						`,
						{
							chat_id: chatId,
							message_id: msg.message.message_id,
						},
						{ parse_mode: 'HTML' }
					)
				}

				return await bot.sendMessage(
					chatId,
					'Xотите сыграть еще?',
					startGameOptions
				)
			}
		} catch (error) {
			console.log(error)
		}
	})
}

startApp()
