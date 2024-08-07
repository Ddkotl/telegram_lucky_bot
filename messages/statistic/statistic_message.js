export const StatisticMessage = async (user) => {
  if (user.lang === "ru") {
    return `💎Cтатистика:\n\n💎Имя: ${user.first_name} ${user.username}\n💎Всего игр: ${
      user.wrong + user.right
    }\n💎Побед: ${user.right}\n💎Неудач ${user.wrong}\n💎Баланс : ${
      user.LUCK
    } ${process.env.COIN_NAME}`;
  } else {
    return `💎Statistics:\n\n💎Name: ${user.first_name} ${user.username}\n💎Total games: ${
      user.wrong + user.right
    }\n💎Win: ${user.right}\n💎Fail ${user.wrong}\n💎Balance: ${
      user.LUCK
    } ${process.env.COIN_NAME}`;
  }
};
