import { Bot, webhookCallback } from "grammy";
import { welcomeText } from "./modules/constText.js";
import { menu } from "./modules/menu.js";

const bot = new Bot(BOT_TOKEN, { botInfo: BOT_INFO });

// Добавляем команду статистики в меню бота
bot.api.setMyCommands([
  { command: "start", description: "Перезапустить бот" },
  { command: "menu", description: "Главное меню" },
]);

// Функция для получения данных из KV
async function getKVData(key) {
  return await BOT_STORAGE.get(key, { type: 'json' });
}

// Функция для сохранения данных в KV
async function putKVData(key, value) {
  return await BOT_STORAGE.put(key, JSON.stringify(value));
}

// Отвечаем на команду /start
bot.command("start", async (ctx) => {
  const userId = ctx.from?.id;
  
  if (userId) {
    // Получаем текущие данные из KV
    let userData = await getKVData('user_data') || { users: {}, totalCount: 0 };
    
    // Добавляем нового пользователя если его еще нет
    if (!userData.users[userId]) {
      userData.users[userId] = {
        id: userId,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        username: ctx.from.username,
        joined: new Date().toISOString()
      };
      userData.totalCount += 1;
      
      // Сохраняем обновленные данные
      await putKVData('user_data', userData);
    }
  }
  
  await ctx.reply(`<b>${ctx.from?.first_name}</b>` + welcomeText, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
});

// Команда для показа статистики
bot.command("stat", async (ctx) => {
  try {
    const userData = await getKVData('user_data');
    
    if (!userData || userData.totalCount === 0) {
      await ctx.reply('Пока нет зарегистрированных пользователей');
      return;
    }

    // Получаем последних 5 пользователей
    const userKeys = Object.keys(userData.users);
    const lastUsers = userKeys.slice(-5).map(key => userData.users[key]);

    await ctx.reply(
      `📊 <b>Статистика бота</b>\n` +
      `👥 Всего пользователей: <b>${userData.totalCount}</b>\n\n` +
      `<b>Последние 5 зарегистрированных:</b>\n` +
      lastUsers.map(u => `• ${u.first_name}${u.username ? ` (@${u.username})` : ''}`).join('\n'),
      { parse_mode: "HTML" }
    );
  } catch (error) {
    console.error('Error reading KV storage:', error);
    await ctx.reply('Произошла ошибка при получении статистики');
  }
});

// Подключение меню root-menu
bot.use(menu);

bot.command("menu", async (ctx) => {
  // Отправляем меню.
  await ctx.reply("Выберите нужный пункт в меню:", { reply_markup: menu });
});

// Обработка ошибок
bot.catch((err) => {
  console.error('Error in bot:', err);
});

addEventListener("fetch", webhookCallback(bot, "cloudflare"));
