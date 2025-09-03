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
async function getKVData() {
  try {
    const data = await BOT_STORAGE.get("user_data");
    return data ? JSON.parse(data) : { users: {}, totalCount: 0 };
  } catch (error) {
    console.error("Error getting data from KV:", error);
    return { users: {}, totalCount: 0 };
  }
}

// Функция для сохранения данных в KV
async function putKVData(data) {
  try {
    await BOT_STORAGE.put("user_data", JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error putting data to KV:", error);
    return false;
  }
}

// Функция для проверки чувствительных путей
function isSensitivePath(pathname) {
  const sensitivePaths = [
    '/.aws/', '/.env', '/config', '/admin', 
    '/wp-admin', '/.git', '/.well-known'
  ];
  return sensitivePaths.some(path => pathname.includes(path));
}

// Функция fetch с таймаутом
const fetchWithTimeout = (url, options, timeout = 5000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
};

// Обработка всех входящих запросов
async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Блокировка доступа к чувствительным путям
  if (isSensitivePath(url.pathname)) {
    return new Response('Not Found', { status: 404 });
  }

  // Обработка только POST запросов для Telegram webhook
  if (request.method !== 'POST' && url.pathname === '/') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Обработка несуществующих маршрутов
  if (url.pathname !== '/') {
    return new Response('Not Found', { status: 404 });
  }

  try {
    // Обработка вебхука Telegram
    return await webhookCallback(bot, "cloudflare")(request);
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Отвечаем на команду /start
bot.command("start", async (ctx) => {
  const userId = ctx.from?.id;
  
  if (userId) {
    try {
      // Получаем текущие данные из KV
      const userData = await getKVData();
      
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
        const success = await putKVData(userData);
        if (!success) {
          console.error("Failed to save user data to KV");
        }
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
  // Проверяем, имеет ли пользователь доступ к статистике
  if (ctx.from?.id !== parseInt(ADMIN_ID)) {
    await ctx.reply("У вас нет доступа к этой команде.");
    return;
  }
  
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

// Обработчик fetch событий
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
