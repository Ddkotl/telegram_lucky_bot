import prisma from "../../db.js";

export const findTaskInfoByUserID = async (id) => {
  try {
    return await prisma.userTask.findUnique({ where: { userId: id } });
  } catch (error) {
    console.log(error);
  }
};
