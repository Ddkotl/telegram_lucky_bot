import prisma from '../../db.js'

export const addSmallBoxByUserId = async user => {
	await prisma.userReward.update({
		where: {
			userId: user.id,
		},
		data: {
			smallBox: {
				increment: 1,
			},
		},
	})
	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			LUCK: user.LUCK - process.env.SMALL_BOX_LUCK,
		},
	})
}
export const addMiddleBoxByUserId = async id => {
	await prisma.userReward.update({
		where: {
			userId: id,
		},
		data: {
			midlelBox: midlelBox + 1,
		},
	})
}
export const addLargeBoxByUserId = async id => {
	await prisma.userReward.update({
		where: {
			userId: id,
		},
		data: {
			largeBox: largeBox + 1,
		},
	})
}
