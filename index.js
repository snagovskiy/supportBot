import { Bot, Context, webhookCallback } from "grammy";
const { welcomeText } = require("./modules/constText");
const { menu } = require("./modules/menu");

export default {
  async fetch(request, env, ctx) { 
const bot = new Bot(env.BOT_TOKEN, { botInfo: JSON.parse(env.BOT_INFO) });    

bot.api.setMyCommands([
  { command: "start", description: "Перезапустить бот" },
  { command: "menu", description: "Главное меню" },
]);

// Отвечаем на команду  /start
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

  return webhookCallback(bot, "cloudflare-mod")(request);
    
  },
};
