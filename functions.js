export function getRamdomNumber() {
	const randomNumber = Math.floor(Math.random() * 10)
	return randomNumber
}

export const calculeteMyltiplier = async userReward => {
	let myltiplier = 1
	if (userReward.bronzeAmylet) {
		myltiplier = myltiplier + 0.05
	}
	if (userReward.silverAmylet) {
		myltiplier = myltiplier + 0.1
	}
	if (userReward.goldAmylet) {
		myltiplier = myltiplier + 0.15
	}
	if (userReward.diamondAmylet) {
		myltiplier = myltiplier + 0.2
	}
	return myltiplier
}

export const calculeteRewardsForBox = async userReward => {
	let minReward =
		(await userReward.smallBox) * 10 +
		(await userReward.midlelBox) * 60 +
		(await userReward.largeBox) * 140
	let maxReward =
		(await userReward.smallBox) * 50 +
		(await userReward.midlelBox) * 250 +
		(await userReward.largeBox) * 550

	return `${minReward} - ${maxReward}`
}
