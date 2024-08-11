export const taskSuccessMessage = async (lang)=>{
    if(lang === 'ru'){
        return `✅Вы уже выполнили эту задачу`
    }else{
        return `✅You have already completed this task`
    }
}