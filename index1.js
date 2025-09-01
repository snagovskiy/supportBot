import { Bot, webhookCallback } from "grammy";
import { welcomeText } from "./modules/constText.js";
import { menu } from "./modules/menu.js";

// Создаем экземпляр бота
const bot = new Bot(BOT_TOKEN, { botInfo: BOT_INFO });

// Добавляем команду статистики в меню бота
bot.api.setMyCommands([
  { command: "start", description: "Перезапустить бот" },
  { command: "menu", description: "Главное меню" },
]);

// Обработчик команды /start
bot.command("start", async (ctx) => {
  const userId = ctx.from?.id;
  
  if (userId) {
    try {
      // Получаем текущие данные из KV
      let userData = { users: {}, totalCount: 0 };
      const storedData = await BOT_STORAGE.get("user_data");
      
      if (storedData) {
        userData = JSON.parse(storedData);
      }
      
      // Добавляем нового пользователя если его еще нет
      if (!userData.users[userId]) {
        userData.users[userId] = {
          id: userId,
          first_name: ctx.from.first_name,
          last_name: ctx.from.last_name || "",
          username: ctx.from.username || "",
          joined: new Date().toISOString()
        };
        userData.totalCount += 1;
        
        // Сохраняем обновленные данные
        await BOT_STORAGE.put("user_data", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error in start command:", error);
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
    let userData = { users: {}, totalCount: 0 };
    const storedData = await BOT_STORAGE.get("user_data");
    
    if (storedData) {
      userData = JSON.parse(storedData);
    }
    
    if (userData.totalCount === 0) {
      await ctx.reply('Пока нет зарегистрированных пользователей');
      return;
    }

    // Преобразуем объект пользователей в массив и сортируем по дате присоединения
    const usersArray = Object.values(userData.users);
    usersArray.sort((a, b) => new Date(b.joined) - new Date(a.joined));
    
    // Берем последних 5 пользователей
    const lastUsers = usersArray.slice(0, 5);

    await ctx.reply(
      `📊 <b>Статистика бота</b>\n` +
      `👥 Всего пользователей: <b>${userData.totalCount}</b>\n\n` +
      `<b>Последние 5 зарегистрированных:</b>\n` +
      lastUsers.map(u => `• ${u.first_name}${u.last_name ? ` ${u.last_name}` : ''}${u.username ? ` (@${u.username})` : ''}`).join('\n'),
      { parse_mode: "HTML" }
    );
  } catch (error) {
    console.error('Error in stat command:', error);
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

// Обработчик fetch-событий
addEventListener("fetch", (event) => {
  // Получаем env из события
  const env = event.env;
  
  // Устанавливаем BOT_STORAGE из env
  globalThis.BOT_STORAGE = env.BOT_STORAGE;
  
  const handleRequest = webhookCallback(bot, "cloudflare");
  event.respondWith(handleRequest(event.request));
});
