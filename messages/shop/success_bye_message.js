import 'dotenv/config'
export const successByeMessage = async lang => {
	if (lang === 'ru') {
		return `✅ Успешно приобретено!`
	} else {
		return `✅ Successfully purchased!`
	}
}
