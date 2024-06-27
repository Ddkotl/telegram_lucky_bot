import prisma from '../../db.js'

export const findRewardInfoByUserID = async id => {
	await prisma.userReward.findUnique({ where: { userId: id } })
}
