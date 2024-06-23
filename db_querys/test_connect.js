import prisma from '../db.js'
export const testConnect = async () => {
	try {
		await prisma.$connect().then(() => {
			return console.log('Database connected')
		})
	} catch (error) {
		console.log('Error connecting to database', error)
	}
}
