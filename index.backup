import { Bot, webhookCallback } from "grammy";
import { welcomeText } from "./modules/constText.js";
import { menu } from "./modules/menu.js";

const bot = new Bot(BOT_TOKEN, { botInfo: BOT_INFO });


bot.api.setMyCommands([
  { command: "start", description: "Перезапустить бот" },
  { command: "menu", description: "Главное меню" },
]);

// Отвечаем на команду /start
bot.command("start", async (ctx) => {
  await ctx.reply( `<b>${ctx.from?.first_name}</b>` + welcomeText, {
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

addEventListener("fetch", webhookCallback(bot, "cloudflare"));
