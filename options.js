export const gameOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: '1️⃣', callback_data: '1' },
				{ text: '2️⃣', callback_data: '2' },
				{ text: '3️⃣', callback_data: '3' },
			],
			[
				{ text: '4️⃣', callback_data: '4' },
				{ text: '5️⃣', callback_data: '5' },
				{ text: '6️⃣', callback_data: '6' },
			],
			[
				{ text: '7️⃣', callback_data: '7' },
				{ text: '8️⃣', callback_data: '8' },
				{ text: '9️⃣', callback_data: '9' },
			],
			[{ text: '0️⃣', callback_data: '0' }],
			[{ text: '♻️В главное меню', callback_data: '/goToMainMenu' }],
		],
	}),
}
export const startGameOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{ text: '▶️Начать игру', callback_data: '/game' }],
			[{ text: '♻️В главное меню', callback_data: '/goToMainMenu' }],
		],
	}),
}

export const connectWalletOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Подключить кошелек', callback_data: '/connectWallet' },
				{ text: '♻️В главное меню', callback_data: '/goToMainMenu' },
			],
		],
	}),
}
export const saveWalletOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Сохранить', callback_data: '/saveWallet' },
				{ text: '♻️В главное меню', callback_data: '/goToMainMenu' },
			],
		],
	}),
}

export const shopOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Ларцы с удачей', callback_data: '/box' },
				{ text: 'Волшебные талисманы', callback_data: '/amulet' },
			],

			[{ text: '♻️В главное меню', callback_data: '/goToMainMenu' }],
		],
	}),
}
export const boxOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{ text: 'Купить старый ларец', callback_data: '/smallBox' }],
			[{ text: 'Купить роскошный ларец', callback_data: '/middleBox' }],
			[{ text: 'Купить таинственый ларец', callback_data: '/largeBox' }],

			[
				{ text: 'Назад', callback_data: '/shop' },
				{ text: '♻️В главное меню', callback_data: '/goToMainMenu' },
			],
		],
	}),
}
export const backToBoxOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Назад', callback_data: '/box' },
				{ text: '♻️В главное меню', callback_data: '/goToMainMenu' },
			],
		],
	}),
}
export const amuletOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{ text: 'Бронзовый талисман', callback_data: '/bronzeAmulet' }],
			[{ text: 'Серебряный талисман', callback_data: '/silverAmulet' }],
			[{ text: 'Золотой талисман', callback_data: '/goldAmulet' }],
			[{ text: 'Бриллиантовый талисман', callback_data: '/diamondAmulet' }],
			[
				{ text: 'Назад', callback_data: '/shop' },
				{ text: '♻️В главное меню', callback_data: '/goToMainMenu' },
			],
		],
	}),
}

export const backToAmuletOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Назад', callback_data: '/amulet' },
				{ text: '♻️В главное меню', callback_data: '/goToMainMenu' },
			],
		],
	}),
}
