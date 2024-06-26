import 'dotenv/config'
import prisma from '../../db.js'
import { findUserById } from './find_one.js'

export const updateUserWin = async () => {}
export const updateUserLose = async () => {}

export const updateRefererUser = async id => {
	const user = await findUserById(id)
	await prisma.user.update({
		where: { id: id },
		data: {
			referals: user.referals + 1,
			LUCK: user.LUCK + Number(process.env.COIN_FOR_REFERAL),
		},
	})
}

export const updateReferedUser = async user => {
	await prisma.user.update({
		where: { id: user.id },
		data: {
			refered: true,
			LUCK: user.LUCK + Number(process.env.COIN_FOR_REFERAL),
		},
	})
}
