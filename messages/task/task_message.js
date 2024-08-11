import 'dotenv/config'
export const taskMessage = async (lang)=>{
    if(lang === 'ru'){
        return  `❇️ Активные задания\n✅ Выполненные задания\n\nВыполняйте задания - зарабатывайте ${process.env.COIN_NAME}!\nВсё очень просто.\nВы получите по ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME} за выполнение задания`
    }else{
        return `❇️ Active tasks\n✅ Completed tasks\n\nComplete tasks - earn ${process.env.COIN_NAME}!\nIt's very simple.\nYou will receive ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME} for completing the task`
    }
}