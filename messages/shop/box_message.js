import "dotenv/config";

export const boxMessage = async (user) => {
  if (user.lang === "ru") {
    return `💎В Магазине можно приобрести:\n\n1.Cтарый сундук (${process.env.SMALL_BOX_LUCK} ${process.env.COIN_NAME})\nЕжедневно приносит от 10 до 50 ${process.env.COIN_NAME}\n\n2. Роскошный сундук (${process.env.MIDDLE_BOX_LUCK} ${process.env.COIN_NAME})\nЕжедневно приносит от 60 до 250 ${process.env.COIN_NAME}\n\n3. Таинственый сундук (${process.env.LARGE_BOX_LUCK} ${process.env.COIN_NAME})\nЕжедневно приносит от 140 до 550 ${process.env.COIN_NAME}\n\n💎Ваш баланс: ${user.LUCK} ${process.env.COIN_NAME}\n\n💎Карточки нужно активировать в инвентаре`;
  } else {
    return `💎In the shop you can buy:\n\n1. Old Larch (${process.env.SMALL_BOX_LUCK} ${process.env.COIN_NAME})\nDaily gain: from 10 to 50 ${process.env.COIN_NAME}\n\n2. Lucky Larch (${process.env.MIDDLE_BOX_LUCK} ${process.env.COIN_NAME})\nDaily gain: from 60 to 250 ${process.env.COIN_NAME}\n\n3. Magical Larch (${process.env.LARGE_BOX_LUCK} ${process.env.COIN_NAME})\nDaily gain: from 140 to 550 ${process.env.COIN_NAME}\n\n💎Your balance: ${user.LUCK} ${process.env.COIN_NAME}\n\n💎Cards need to be activated in the inventory`;
  }
};
