import prisma from "../../db.js";

export const findRewardInfoByUserID = async (id) => {
  try {
    return await prisma.userReward.findUnique({ where: { userId: id } });
  } catch (error) {
    console.log(error);
  }
};
