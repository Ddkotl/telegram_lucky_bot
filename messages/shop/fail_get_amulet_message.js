import 'dotenv/config'
export const failGetAmuletMessage = async lang => {
	if (lang === 'ru') {
		return `❌Недостаточно рефералов для получения талисмана!`
	} else {
		return `❌Not enough referrals to get the amulet!`
	}
}
