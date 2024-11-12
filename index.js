const { Bot, BotError, GrammyError, HttpError, webhookCallback } = require("grammy");
const { welcomeText } = require("./modules/constText");
const { menu } = require("./modules/menu");

const express = require("express");
const app = express();

const bot = new Bot(env.BOT_TOKEN, { botInfo: JSON.parse(env.BOT_INFO) });

bot.api.setMyCommands([
  { command: "start", description: "Перезапустить бот" },
  { command: "menu", description: "Главное меню" },
]);

// Отвечаем на команду /start
bot.command("start", async (ctx) => {
  await ctx.reply(`<b>${ctx.from?.first_name}</b>` + welcomeText, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
});

// Подключение меню root-menu
bot.use(menu);

bot.command("menu", async (ctx) => {
  // Отправляем меню.
  await ctx.reply("Выберите нужный пункт в меню:", { reply_markup: menu });
});

// Отлов ошибок
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(
    `Ошибка во время обработки обновлений ${ctx.update.update_id}:`,
  );
  const e = err.error;
  if (e instanceof BotError) {
    winston.error("Ошибка в боте: ", e.ctx);
  } else if (e instanceof GrammyError) {
    console.error("Ошибка в запросе:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Не удалось соединиться с Telegram:", e);
  } else {
    console.error("Неизвестная ошибка:", e);
  }
});

app.use(webhookCallback(bot, "express"));
