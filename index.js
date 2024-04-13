const TelegramBot = require("node-telegram-bot-api");
const token = "7104044966:AAECyOy4ul6i8j0aktN5iIj5xjsdlbbMz3k"; // Add your bot token from @botfather for this to work

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

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const txt = msg.text;
  if (txt === "/start") {
    const mms = "Bot Successfully Started. Now select any choice.";
    bot.sendMessage(chatId, mms);
    operation(chatId); // Pass chatId to the operation function
  }
});

async function operation(chatId) {
  const qNo = Math.floor(Math.random() * 600).toString();
  const url = "https://wouldurather.io/api/question?id=" + qNo;

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
          "You chose option " +
            choice +
            ".\n" +
            data1 +
            " people voted with a percentage of " +
            Math.floor(prcnt) +
            "%",
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
            " people voted with a percentage of " +
            Math.floor(prcnt) +
            "%",
        );
      }
      operation(chatId);
    });
  } catch (error) {
    console.error("Error fetching question:", error);
  }
}
