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
export const mainMenuOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{ text: '▶️Начать игру', callback_data: '/game' }],
			[{ text: '📢Задания', callback_data: '/tasks' }],
			[
				{ text: '🛒Магазин', callback_data: '/shop' },
				{ text: '🎁Инвентарь', callback_data: '/inventory' },
			],
			[
				{ text: '📝Статистика', callback_data: '/info' },
				{ text: '🫡Рефералы', callback_data: '/ref' },
			],
			[{ text: '💸Кошелек', callback_data: '/wallet' }],
		],
	}),
}

export const goToMainMenuOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{ text: '♻️В главное меню', callback_data: '/goToMainMenu' }],
		],
	}),
}

export const tasksOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{ text: 'Подпишись на канал', callback_data: '/SubTo' }],
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
			[
				{ text: 'старый ларец с удачей', callback_data: '/smallBox' },
				{ text: 'роскошный ларец с удачей', callback_data: '/middleBox' },
				{ text: 'таинственый ларец с удачей', callback_data: '/largeBox' },
			],
			[
				{ text: 'Бронзовый талисман', callback_data: '/bronzeAmulet' },
				{ text: 'Серебряный талисман', callback_data: '/silverAmulet' },
				{ text: 'Золотой талисман', callback_data: '/goldAmulet' },
				{ text: 'Бриллиантовый талисман', callback_data: '/diamondAmulet' },
			],
		],
	}),
}
