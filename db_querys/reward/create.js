import prisma from "../../db.js";

export const createUserReward = async (id) => {
  await prisma.userReward.create({
    data: {
      userId: id,
      getReward: new Date(2000),
    },
  });
};
