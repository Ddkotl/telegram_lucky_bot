import prisma from '../../db.js'

export const findUserByChatId = async chatId => {
	return await prisma.user.findUnique({
		where: { chatId: chatId },
	})
}
export const findUserById = async Id => {
	return await prisma.user.findUnique({
		where: { id: Id },
	})
}
