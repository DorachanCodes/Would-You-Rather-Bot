const TelegramBot = require("node-telegram-bot-api");
const token = process.env['MY_SECRET']; // Add your bot token from @botfather for this to work


const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const txt = msg.text;

    
  
const qNo=random();
  const url = "https://wouldurather.io/api/question?id=" + qNo;
  if(txt==="/0"||txt=='/start'||txt=="/0@wouldurather_bot")

  try {
    const response = await fetch(url);
    const ques = await response.json();

    const res1 = ques.option1;
    const res2 = ques.option2;
    

    bot.sendMessage(chatId, "\nWould You Rather", {
      reply_markup: {
        inline_keyboard: [
          [{ text: res1, callback_data: "1" }],
          [{ text: res2, callback_data: "2" }],
        ],
      },
    });

    bot.once("callback_query", (query) => {
      const choice = query.data;
      let prcnt;
      if (choice === "1") {

        const data1 = parseInt(ques.option1Votes);
        prcnt = (data1 / (data1 + parseInt(ques.option2Votes))) * 100;
       
        bot.sendMessage(
          chatId,
          " You chose option "
          +
            choice +
            ".\n" +
            data1 +
            " People  Out of \n "+(data1+parseInt(ques.option2Votes))+"   People Chose This Option with a percentage of " +
           
     Math.floor(prcnt) +
            "%"+
            ".\n" +
            "Send /0 for Next Question",
        );
        
      } else if (choice === "2") {
        const data2 = parseInt(ques.option2Votes);
        prcnt = (data2 / (parseInt(ques.option1Votes) + data2)) * 100;
        
        
        bot.sendMessage(
          chatId,
          "You chose option " +
            choice +
            ".\n" +
            data2 +
            " People  Out of  \n "+(parseInt(ques.option1Votes) + data2)+"   People Chose this Option with a percentage of " +
           
     Math.floor(prcnt) +
            "%"+
            ".\n" +
            "Send /0 for Next Question",
        );
        
       
      }
      

    });
  } catch (error) {
    console.error("Error fetching question:", error);
  }
})
function random()
{
    return Math.floor(Math.random() * 600).toString();
}
function stat(perc)
{
  if(prcent>50)
       return "Congrats !!  You are among the Majority";
      else
      return "OOPS !! Your are among Minority";
}
