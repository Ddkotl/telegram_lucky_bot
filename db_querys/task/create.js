import prisma from '../../db.js'

export const createUserTask = async id => {
	await prisma.userTask.create({
		data: {
			userId: id,
		},
	})
}
