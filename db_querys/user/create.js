import prisma from '../../db.js'
import { createUserReward } from '../reward/index.js'
import { updateReferedUser, updateRefererUser } from './update.js'

export const createUser = async (chatId, username, firstname, text) => {
	const user = await prisma.user.create({
		data: { chatId: chatId, username: username, first_name: firstname },
	})
	if (text.startsWith('/start') && text.length > 6 && user.refered === false) {
		const refID = text.slice(7)
		await updateRefererUser(refID)
		await updateReferedUser(user)
	}
	await createUserReward(user.id)
}
