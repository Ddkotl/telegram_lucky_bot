import 'dotenv/config'
import prisma from '../../db.js'
import { findUserById } from './find_one.js'

export const updateUserWin = async user => {
	const winCoin = Number(process.env.WIN_COIN)
	await prisma.user.update({
		where: { id: user.id },
		data: {
			right: user.right + 1,
			LUCK: user.LUCK + winCoin,
		},
	})
}
export const updateUserLose = async user => {
	if (user.LUCK <= 0) {
		await prisma.user.update({
			where: { id: user.id },
			data: { wrong: user.wrong + 1 },
		})
	} else {
		await prisma.user.update({
			where: { id: user.id },
			data: {
				wrong: user.wrong + 1,
				LUCK: user.LUCK - process.env.LOSE_COIN,
			},
		})
	}
}
export const updateRefererUser = async id => {
	try {
		const user = await findUserById(id)
		if (user) {
			await prisma.user.update({
				where: { id: id },
				data: {
					referals: user.referals + 1,
					LUCK: user.LUCK + Number(process.env.COIN_FOR_REFERAL),
				},
			})
			return true
		} else {
			return false
		}
	} catch (error) {
		console.log(error)
	}
}

export const updateReferedUser = async user => {
	try {
		await prisma.user.update({
			where: { id: user.id },
			data: {
				refered: true,
				LUCK: user.LUCK + Number(process.env.COIN_FOR_REFERAL),
			},
		})
	} catch (error) {
		console.log(error)
	}
}

export const updateUserLang = async (userId, lang) => {
	try {
		await prisma.user.update({
			where: { id: userId },
			data: { lang: lang },
		})
	} catch (error) {
		console.log(error)
	}
}
