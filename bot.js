import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import { getRamdomNumber } from './functions.js'
import { againOptions, gameOptions } from './options.js'

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true })
bot.on('polling_error', err => {
	console.log(err.data.err.message)
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

const start = () => {
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

			if (text === '/start') {
				await bot.sendSticker(
					chatId,
					'https://tlgrm.ru/_/stickers/c70/8c4/c708c4e4-425e-43c1-893f-6478eae07d62/2.webp'
				)
				return await bot.sendMessage(
					chatId,
					'Привет ' + firstname + ' ' + username + ', проверь свою удачу!',
					againOptions
				)
			}
			if (text === '/info') {
				await bot.sendSticker(
					chatId,
					'https://tlgrm.ru/_/stickers/ef5/8e1/ef58e15f-94a2-3d56-a365-ca06e1339d08/4.webp'
				)
				return await bot.sendMessage(
					chatId,
					'300 наносекунд в день отдыхает разработчик этого бота'
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
			if (data === '/again') {
				return createGame(chatId)
			}
			if (data == chats[chatId]) {
				await bot.editMessageText(
					`Вы выбрали ${data}, поздравляю, вы угадали`,
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
				await bot.editMessageText(
					`Вы выбрали ${data}, вы не угадали, правильное число ${chats[chatId]}`,
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
			}
		} catch (error) {
			console.log(error)
		}
	})
}

start()
