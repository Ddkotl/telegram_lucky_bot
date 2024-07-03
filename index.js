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

import { createUserActions } from './actions/user/index.js'
import { findRewardInfoByUserID } from './db_querys/reward/index.js'
import { completeTask1, findTaskInfoByUserID } from './db_querys/task/index.js'
import {
	findUserByChatId,
	updateUserLose,
	updateUserWin,
} from './db_querys/user/index.js'
import { boxOptions, shopOptions, startGameOptions } from './options.js'

export const chats = new Object()

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
			if (data === '/shop') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await bot.sendMessage(
					chatId,
					`💎В магазине вы можете приобретать предметы,увеличивающие прирост вашей удачи ${process.env.COIN_NAME}.\n\n💎В данный момент есть товары двух видов:\n\n🎁Ларцы - продаются за ${process.env.COIN_NAME} и дают случайное количество ${process.env.COIN_NAME} через определенное количество времени. Ларцов можно покупать неограниченное количество.\n\n🪡Талисманы - они дают случайное количество ${process.env.COIN_NAME} через определенное количество времени, а получить их можно только имея определенное количество рефералов.`,
					{
						parse_mode: 'HTML',
						...shopOptions,
					}
				)
			}
			if (data === '/box') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await bot.sendMessage(
					chatId,
					`💎В Магазине можно приобрести:\n\n1.Cтарый ларец (500 ${process.env.COIN_NAME})\nЕжедневно приносит от 10 до 50 ${process.env.COIN_NAME}\n\n2. Роскошный ларец (2500 ${process.env.COIN_NAME})\nЕжедневно приносит от 60 до 250 ${process.env.COIN_NAME}\n\n3. Таинственый ларец (5500 ${process.env.COIN_NAME})\nЕжедневно приносит от 140 до 550 ${process.env.COIN_NAME}\n\n💎Ваш баланс: ${user.LUCK} ${process.env.COIN_NAME}\n\n💎Карточки нужно активировать в инвентаре`,
					{
						parse_mode: 'HTML',
						...boxOptions,
					}
				)
			}
			if (data === '/smallBox') {
				if (user.LUCK < process.env.SMALL_BOX_LUCK) {
					return await bot.sendMessage(
						chatId,
						`❌Недостаточно ${process.env.COIN_NAME} для покупки!`
					)
				} else {
					await bot.deleteMessage(chatId, msg.message.message_id)
					await addSmallBoxByUserId(user)
					return await bot.sendMessage(
						chatId,
						`✅ Вы успешно приобрели 1 Cтарый ларец! Всего: ${
							userReward.smallBox + 1
						}`,
						{ parse_mode: 'HTML', ...backToBoxOptions }
					)
				}
			}
			if (data === '/middleBox') {
				if (user.LUCK < process.env.MIDDLE_BOX_LUCK) {
					return await bot.sendMessage(
						chatId,
						`❌Недостаточно ${process.env.COIN_NAME} для покупки!`
					)
				} else {
					await bot.deleteMessage(chatId, msg.message.message_id)
					await addMiddleBoxByUserId(user)
					return await bot.sendMessage(
						chatId,
						`✅ Вы успешно приобрели 1 Роскошный ларец! Всего: ${
							userReward.midlelBox + 1
						}`,
						{ parse_mode: 'HTML', ...backToBoxOptions }
					)
				}
			}
			if (data === '/largeBox') {
				if (user.LUCK < process.env.LARGE_BOX_LUCK) {
					return await bot.sendMessage(
						chatId,
						`❌Недостаточно ${process.env.COIN_NAME} для покупки!`
					)
				} else {
					await bot.deleteMessage(chatId, msg.message.message_id)
					await addLargeBoxByUserId(user)
					return await bot.sendMessage(
						chatId,
						`✅ Вы успешно приобрели 1 Таинственный ларец! Всего: ${
							userReward.largeBox + 1
						}`,
						{ parse_mode: 'HTML', ...backToBoxOptions }
					)
				}
			}
			if (data === '/amulet') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await bot.sendMessage(
					chatId,
					`
					💎В данном разделе находятся талисманы.\n\n💎Талисманы приносят каждые 24 часа определенное количество ${process.env.COIN_NAME}, дополнительных действий не требуется!\n\n1. Бронзовый талисман\nЕжедневно приносит 10 ${process.env.COIN_NAME}\n\n2. Серебряный талисман\nЕжедневно приносит 20 ${process.env.COIN_NAME}\n\n3. Золотой талисман\nЕжедневно приносит 30 ${process.env.COIN_NAME}\n\n4. Бриллиантовый талисман\nЕжедневно приносит 10 ${process.env.COIN_NAME}`,
					{
						parse_mode: 'HTML',
						...amuletOptions,
					}
				)
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
			if (data === '/goToMainMenu') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return await startCommand(chatId, user)
			}
			if (data === '/game') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return gameCommand(chatId)
			}
			if (data == chats[chatId]) {
				await updateUserWin(user)
				await bot.editMessageText(
					`🥳Вы выбрали ${data}, поздравляю, вы угадали!\nВы получили ${
						process.env.WIN_COIN
					} ${process.env.COIN_NAME}, осталось ${
						Number(user.LUCK) + Number(process.env.WIN_COIN)
					} ${process.env.COIN_NAME}
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
					await updateUserLose(user)
					await bot.editMessageText(
						`🥺Вы выбрали ${data}, вы не угадали, было загадано число ${chats[chatId]}.\nОсталось ${user.LUCK} ${process.env.COIN_NAME}, казино и ставки явно не ваша тема
						`,
						{
							chat_id: chatId,
							message_id: msg.message.message_id,
						},
						{ parse_mode: 'HTML' }
					)
				} else {
					await updateUserLose(user)
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
