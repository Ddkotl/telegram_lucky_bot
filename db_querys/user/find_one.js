import prisma from '../../db.js'

export const findUserByChatId = async chatId => {
	return await prisma.user.findUnique({
		where: { chatId: chatId },
	})
}
