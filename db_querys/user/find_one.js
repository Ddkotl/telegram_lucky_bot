import prisma from "../../db.js";

export const findUserByChatId = async (chatId) => {
  try {
    return await prisma.user.findUnique({
      where: { chatId: chatId },
    });
  } catch (error) {
    console.log(error);
  }
};
export const findUserById = async (Id) => {
  return await prisma.user.findUnique({
    where: { id: Id },
  });
};
export const findUserRewardsByChatId = async (chatId) => {
  return await prisma.user.findUnique({
    where: { chatId: chatId },
    include: { userRevard: true },
  });
};
