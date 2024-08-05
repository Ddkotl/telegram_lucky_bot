import "dotenv/config";
export const winnerMessage = async (user, data) => {
  if (user.lang === "ru") {
    return `🥳Вы выбрали ${data}, поздравляю, вы угадали!\nВы получили ${
      process.env.WIN_COIN
    } ${process.env.COIN_NAME}, осталось ${
      Number(user.LUCK) + Number(process.env.WIN_COIN)
    } ${process.env.COIN_NAME}`;
  } else {
    return `🥳You have chosen ${data}, congratulations, you guessed it!\nYou received ${
      process.env.WIN_COIN
    } ${process.env.COIN_NAME}, left ${
      Number(user.LUCK) + Number(process.env.WIN_COIN)
    } ${process.env.COIN_NAME}`;
  }
};
