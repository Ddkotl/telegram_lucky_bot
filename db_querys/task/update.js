import prisma from "../../db.js";

export const completeTask1 = async (user) => {
  await prisma.userTask.update({
    where: {
      userId: user.id,
    },
    data: {
      task1: true,
    },
  });
  await prisma.user.update({
    where: { id:user.id },
    data: {
      LUCK: user.LUCK + Number(process.env.COIN_FOR_TASK),
    },
  });
};
