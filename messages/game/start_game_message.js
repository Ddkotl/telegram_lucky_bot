export const startGameMessage = async lang => {
	if (lang === 'ru') {
		return `🤔Я загадал цифру от 0 до 9, попробуй отгадать.`
	} else {
		return `🤔I've thought of a number from 0 to 9, try to guess it.`
	}
}
