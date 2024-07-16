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
export const addMiddleBoxByUserId = async user => {
	await prisma.userReward.update({
		where: {
			userId: user.id,
		},
		data: {
			midlelBox: {
				increment: 1,
			},
		},
	})
	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			LUCK: user.LUCK - process.env.MIDDLE_BOX_LUCK,
		},
	})
}
export const addLargeBoxByUserId = async user => {
	await prisma.userReward.update({
		where: {
			userId: user.id,
		},
		data: {
			largeBox: {
				increment: 1,
			},
		},
	})
	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			LUCK: user.LUCK - process.env.LARGE_BOX_LUCK,
		},
	})
}

export const addBronzeAmyletByUserId = async user => {
	await prisma.userReward.update({
		where: {
			userId: user.id,
		},
		data: {
			bronzeAmylet: true,
		},
	})
}

export const addSilverAmyletByUserId = async user => {
	await prisma.userReward.update({
		where: {
			userId: user.id,
		},
		data: {
			silverAmylet: true,
		},
	})
}

export const addGoldAmyletByUserId = async user => {
	await prisma.userReward.update({
		where: {
			userId: user.id,
		},
		data: {
			goldAmylet: true,
		},
	})
}

export const addDiamondAmyletByUserId = async user => {
	await prisma.userReward.update({
		where: {
			userId: user.id,
		},
		data: {
			diamondAmylet: true,
		},
	})
}

export const updateDateGetReward = async id => {
	await prisma.userReward.update({
		where: {
			userId: id,
		},
		data: {
			getReward: new Date(),
		},
	})
}
