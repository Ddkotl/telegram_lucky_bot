import 'dotenv/config'
import { bot } from './bot.js'
import {
	infoCommand,
	notUnderstandCommand,
	refCommand,
	setMyCommands,
	startCommand,
} from './commands/index.js'

import { createUserActions } from './actions/user/index.js'
import { game, langQuery, shopQuery } from './callback_queries/index.js'
import { findRewardInfoByUserID } from './db_querys/reward/index.js'
import { completeTask1, findTaskInfoByUserID } from './db_querys/task/index.js'
import { findUserByChatId } from './db_querys/user/index.js'
import { connectWalletOptions } from './options.js'

const startApp = async () => {
	setMyCommands()
	bot.on('message', async msg => {
		try {
			const chatId = msg.chat.id
			const username = msg.chat.username
			const firstname = msg.chat.first_name
			const text = msg.text
			const lang = msg.from.language_code
			const user = await findUserByChatId(chatId)
			if (!user) {
				return await createUserActions(chatId, username, firstname, lang, text)
			}
			if (text === '/start') {
				return await startCommand(chatId, user)
			}
			return await notUnderstandCommand(chatId, user)
		} catch (error) {
			console.log(error)
		}
	})
	bot.on('callback_query', async msg => {
		try {
			const data = msg.data
			const chatId = msg.message.chat.id
			const user = await findUserByChatId(chatId)
			const userReward = await findRewardInfoByUserID(user.id)
			const userTask = await findTaskInfoByUserID(user.id)

			await game(data, msg, chatId, user)
			await shopQuery(data, msg, chatId, user)
			await langQuery(data, chatId, msg, user)

			if (data === '/goToMainMenu') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await startCommand(chatId, user)
			}
			if (data === '/info') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await infoCommand(chatId, user)
			}
			if (data === '/ref') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await refCommand(chatId, user)
			}
			if (data === '/tasks') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await bot.sendMessage(
					chatId,
					`❇️ Активные задания\n✅ Выполненные заданияю\n\nВыполняйте задания - зарабатывайте ${process.env.COIN_NAME}!\nВсё очень просто.\nВы получите по ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME} за выполнение задания`,
					{
						parse_mode: 'HTML',
						reply_markup: JSON.stringify({
							inline_keyboard: [
								[
									{
										text: `${
											userTask.task1 ? '✅' : '❇️'
										}Подпишись на канал проекта ${process.env.COIN_NAME}`,
										callback_data: '/task1',
									},
								],
							],
						}),
					}
				)
			}
			if (data === '/task1') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				if (userTask.task1) {
					return await bot.sendMessage(
						chatId,
						`✅Вы уже выполнили эту задачу`,
						{
							parse_mode: 'HTML',
							reply_markup: JSON.stringify({
								inline_keyboard: [
									[
										{ text: 'Назад', callback_data: '/tasks' },
										{
											text: '♻️В главное меню',
											callback_data: '/goToMainMenu',
										},
									],
								],
							}),
						}
					)
				} else {
					return await bot.sendMessage(
						chatId,
						`Подпишись на канал ${process.env.TASK1}.\nНажми на кнопку проверить.\nВ случае успешной проверки на подписку ты получишь ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME}`,
						{
							parse_mode: 'HTML',
							reply_markup: JSON.stringify({
								inline_keyboard: [
									[{ text: 'Перейти', url: process.env.TASK1 }],
									[{ text: 'Проверить', callback_data: '/checkTask1' }],
									[
										{ text: 'Назад', callback_data: '/tasks' },
										{
											text: '♻️В главное меню',
											callback_data: '/goToMainMenu',
										},
									],
								],
							}),
						}
					)
				}
			}
			if (data === '/checkTask1') {
				const pass = await bot.getChatMember('@luck_drop', chatId)
				if (pass.status === 'left') {
					return await bot.sendMessage(
						chatId,
						'❌Вы не подписались на канал проекта'
					)
				} else {
					await completeTask1(user)
					return await bot.sendMessage(
						chatId,
						`✅Вы успешно получили ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME}`
					)
				}
			}

			if (data === '/inventory') {
				return await bot.sendMessage(chatId, 'inventory')
			}
			if (data === '/connectWallet') {
				await bot.deleteMessage(chatId, msg.message.message_id)

				return await bot.sendMessage(
					chatId,
					`💎Введите номер вашего кошелька в сети $TON и нажмите сохранить:`,
					{ parse_mode: 'HTML', ...saveWalletOptions }
				)
			}
			if (data === '/saveWallet') {
				console.log(msg)
				return await bot.sendMessage(
					chatId,
					`��Кошелек успешно сохранен, теперь вы можете начать получать ${process.env.COIN_NAME}!`,
					{ parse_mode: 'HTML', ...goToMainMenuOptions }
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
		} catch (error) {
			console.log(error)
		}
	})
}

startApp()
