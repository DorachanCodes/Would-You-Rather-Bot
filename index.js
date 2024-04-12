const TelegramBot = require('node-telegram-bot-api');
const axios =require('axios');
const token="ADD YOUR BOT TOKEN"; //add your bot token from @botfather for this to work
const bot = new TelegramBot(token, {polling: true});
bot.on("message",async(msg)=>{

 
    const chatId=msg.chat.id;
    const txt=msg.text;
    if(txt=="/start")
    {
        const mms="Bot Successfully Started , Now Enter 1 0r 2 to begin";
    bot.sendMessage(chatId,mms);
Operation();

    }})

    function Operation()
    {
        bot.on("message",async(msg)=>{

    var qNo=Math.floor(Math.random()*600).toString();
   const url ="https://wouldurather.io/api/question?id="+qNo;
   
    const ques= await axios.get("https://wouldurather.io/api/question?id="+qNo);
    console.log(JSON.stringify(ques));
    const res1=ques.data.option1;
    const res2=ques.data.option2;
    bot.sendMessage(chatId,"Would You Rather 1."+res1+"           or          2."+res2+"               Answer with 1 or 2");

    const data1=parseInt(ques.data.option1Votes);
    const data2=parseInt(ques.data.option2Votes);
    

 
txt=msg.text;

var prcnt;
    if(txt=="1")
    {
        prcnt=data1/(data1+data2)*100;    
        bot.sendMessage(chatId,"You chose option  "+txt+". "+data1+"with percentage vote of "+prcnt);
        Operation();
}
else if (txt=="2")
{
    prcnt=data2/(data1+data2)*100;    
    bot.sendMessage(chatId,"You chose option  "+txt+". "+data2+"with percentage vote of "+prcnt);
    Operation();
}
});


}