import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import prisma from './db.js'
import { getRamdomNumber } from './functions.js'
import { againOptions, gameOptions } from './options.js'

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true })
bot.on('polling_error', err => {
	console.log(err.data.message)
})

const chats = new Object()

const createGame = async chatId => {
	try {
		await bot.sendMessage(
			chatId,
			'Я загадал цифру от 0 до 9, попробуй отгадать.',
			gameOptions
		)
		chats[chatId] = getRamdomNumber()
	} catch (error) {
		console.log(error)
	}
}

const start = async () => {
	try {
		await prisma.$connect().then(() => {
			return console.log('Database connected')
		})
	} catch (error) {
		console.log('Error connecting to database', error)
	}

	try {
		bot.setMyCommands([
			{ command: '/start', description: 'Приветствие' },
			{ command: '/info', description: 'Информация' },
			{ command: '/game', description: 'Игра' },
		])
	} catch (error) {
		console.log(error)
	}

	bot.on('message', async msg => {
		try {
			const chatId = msg.chat.id
			const username = msg.chat.username
			const firstname = msg.chat.first_name
			const text = msg.text
			const user = await prisma.user.findUnique({
				where: { chatId: chatId },
			})
			console.log(msg)
			if (!user) {
				await prisma.user.create({
					data: { chatId: chatId, username: username, first_name: firstname },
				})
			}

			if (text === '/start') {
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
					againOptions
				)
			}
			if (text === '/info') {
				const user = await prisma.user.findUnique({
					where: { chatId: chatId },
				})
				return await bot.sendMessage(
					chatId,
					`${user.first_name} ${user.username},вот ваша статистика!
					 Всего игр ${user.wrong + user.right}.
					 Побед ${user.right}.
					 Неудач ${user.wrong}.`
				)
			}
			if (text === '/game') {
				return createGame(chatId)
			}
			return await bot.sendMessage(
				chatId,
				'Я тебя не понимаю, ' +
					firstname +
					' ' +
					username +
					', попробуй еще раз!'
			)
		} catch (error) {
			console.log(error)
		}
	})
	bot.on('callback_query', async msg => {
		try {
			const data = msg.data
			const chatId = msg.message.chat.id
			const user = await prisma.user.findUnique({
				where: { chatId: chatId },
			})
			if (data === '/again') {
				await bot.deleteMessage(chatId, msg.message.message_id)
				return createGame(chatId)
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

start()
