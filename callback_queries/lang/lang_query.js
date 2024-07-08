import { chooseLangEn } from './choose_lang_en.js'
import { chooseLangRu } from './choose_lang_ru.js'
import { editLangQuery } from './edit_lang_query.js'
export const langQuery = async (data, chatId, msg, user) => {
	if (data === '/lang') {
		return await editLangQuery(chatId, msg)
	}
	if (data === '/langEn') {
		return await chooseLangEn(msg, chatId, user)
	}
	if (data === '/langRu') {
		return await chooseLangRu(msg, chatId, user)
	}
}
