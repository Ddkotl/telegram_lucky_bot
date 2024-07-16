export const rewardAlreadeGetMessage = async lang => {
	if (lang === 'ru') {
		return `Сегодня ты уже открывал свои сундуки, приходи завтра`
	} else {
		return `You've already open your daily reward, come back tomorrow`
	}
}
