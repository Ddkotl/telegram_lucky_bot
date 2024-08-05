import prisma from "../../db.js";

export const createUser = async (chatId, username, firstname, lang) => {
  const user = await prisma.user.create({
    data: {
      chatId: chatId,
      username: username,
      first_name: firstname,
      lang: lang,
    },
  });
  return user;
};
