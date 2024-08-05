import "dotenv/config";
export const failByeMessage = async (lang) => {
  if (lang === "ru") {
    return `❌Недостаточно ${process.env.COIN_NAME} для покупки!`;
  } else {
    return `❌Not enough ${process.env.COIN_NAME} to buy!`;
  }
};
