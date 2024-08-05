export const successGetRewardMessage = async (lang, boxesReward) => {
  if (lang === "ru") {
    return `Вы успешно получили награду! ${boxesReward} ${process.env.COIN_NAME}`;
  } else {
    return `You have successfully received a reward ${boxesReward} ${process.env.COIN_NAME}!`;
  }
};
