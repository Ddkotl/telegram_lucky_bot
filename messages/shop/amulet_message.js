import 'dotenv/config'

export const amuletMessage = async lang => {
	if (lang === 'ru') {
		return `
			💎В данном разделе находятся талисманы.\n\n💎Талисманы дают множитель 5%, 10%, 15% или 20% на все полученные вами ${process.env.COIN_NAME}, дополнительных действий не требуется!\n\n1. Бронзовый талисман (необходимо ${process.env.REF_TO_BRONSE_AMULET} приглашенный)\nДает множитель 5% ко всем вашим полученным ${process.env.COIN_NAME}\n\n2. Серебряный талисман (необходимо ${process.env.REF_TO_SILVER_AMULET} приглашенных)\nДает множитель 10% ко всем вашим полученным ${process.env.COIN_NAME}\n\n3. Золотой талисман (необходимо ${process.env.REF_TO_GOLD_AMULET} приглашенных)\nДает множитель 15% ко всем вашим полученным ${process.env.COIN_NAME}\n\n4. Бриллиантовый талисман (необходимо ${process.env.REF_TO_DIAMOND_AMULET} приглашенных)\nДает множитель 20% ко всем вашим полученным ${process.env.COIN_NAME}`
	} else {
		return `
			💎Here are the amulets.\n\n💎Amulets give a multiplier of 5%, 10%, 15% or 20% on all the received ${process.env.COIN_NAME} you help with, no additional actions required!\n\n1. Bronze Amulet (required ${process.env.REF_TO_BRONSE_AMULET} referral)\nGives a multiplier of 5% to all your received ${process.env.COIN_NAME}\n\n2. Silver Amulet (required ${process.env.REF_TO_SILVER_AMULET} referrals)\nGives a multiplier of 10% to all your received ${process.env.COIN_NAME}\n\n3. Gold Amulet (required ${process.env.REF_TO_GOLD_AMULET} referrals)\nGives a multiplier of 15% to all your received ${process.env.COIN_NAME}\n\n4. Diamond Amulet (required ${process.env.REF_TO_DIAMOND_AMULET} referrals)\nGives a multiplier of 20% to all your received ${process.env.COIN_NAME}`
	}
}
