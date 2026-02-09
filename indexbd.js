import { Bot } from "grammy";
import { createMenu } from "./modules/menu1.js";
import { getTextsWithCache, clearTextsCache } from "./modules/database.js";

// Экспортируем обработчик как ES Module
export default {
  async fetch(request, env, ctx) {
    console.log('=== BOT STARTED ===');
    console.log('Request method:', request.method);
    console.log('Request URL:', request.url);
    
    try {
      // Проверяем наличие необходимых переменных
      if (!env.BOT_TOKEN) {
        console.error("ERROR: BOT_TOKEN is not defined");
        return new Response("BOT_TOKEN is not defined", { status: 500 });
      }
      
      console.log('Environment variables check passed');

      // Инициализируем бота
      const bot = new Bot(env.BOT_TOKEN);
      console.log('Bot initialized');
      
      // Добавляем команды в меню бота
      try {
        await bot.api.setMyCommands([
          { command: "start", description: "Перезапустить бот" },
          { command: "menu", description: "Главное меню" },
          { command: "stat", description: "Статистика бота (только для админа)" },
          { command: "clearcache", description: "Очистить кэш (админ)" }
        ]);
        console.log('Bot commands set');
      } catch (error) {
        console.error('Error setting bot commands:', error);
      }

      // Создаем middleware для передачи env в контекст
      bot.use(async (ctx, next) => {
        ctx.env = env;
        console.log(`Update received from user: ${ctx.from?.id}, message: ${ctx.message?.text}`);
        await next();
      });

      // Создаем меню
      const menu = createMenu();
      console.log('Menu created');
      
      // Подключаем меню к боту
      bot.use(menu);
      console.log('Menu registered');

      // Функция для получения данных из KV
      async function getKVData() {
        try {
          const data = await env.BOT_STORAGE.get("user_data");
          console.log('KV data retrieved:', data ? 'exists' : 'empty');
          return data ? JSON.parse(data) : { users: {}, totalCount: 0 };
        } catch (error) {
          console.error("Error getting data from KV:", error);
          return { users: {}, totalCount: 0 };
        }
      }

      // Функция для сохранения данных в KV
      async function putKVData(data) {
        try {
          await env.BOT_STORAGE.put("user_data", JSON.stringify(data));
          console.log('KV data saved');
          return true;
        } catch (error) {
          console.error("Error putting data to KV:", error);
          return false;
        }
      }

      // Команда /start
      bot.command("start", async (ctx) => {
        console.log(`/start command from user: ${ctx.from?.id}`);
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
              
              console.log(`New user registered: ${userId}, total: ${userData.totalCount}`);
              
              // Сохраняем обновленные данные
              const success = await putKVData(userData);
              if (!success) {
                console.error("Failed to save user data to KV");
              }
            } else {
              console.log(`Existing user: ${userId}`);
            }
          } catch (error) {
            console.error("Error in start command:", error);
          }
        }
        
        try {
          await ctx.reply(`<b>${ctx.from?.first_name}</b>, <b>привет!</b> 😀️ \n\n🤖️ Меня зовут Виталик. \n\n⛑️ Я помогу тебе настроить доступ к интернету и телевидению, а также диагностировать неисправности, ответить на часто задаваемые вопросы. \n\n📋️ Перейти в меню /menu`, {
            parse_mode: "HTML",
            disable_web_page_preview: true,
          });
          console.log('Start message sent');
        } catch (error) {
          console.error('Error sending start message:', error);
        }
      });

      // Команда /stat
      bot.command("stat", async (ctx) => {
        console.log(`/stat command from user: ${ctx.from?.id}`);
        
        // Проверяем, имеет ли пользователь доступ к статистике
        if (!env.ADMIN_ID || ctx.from?.id !== parseInt(env.ADMIN_ID)) {
          console.log(`User ${ctx.from?.id} not authorized for /stat`);
          await ctx.reply("У вас нет доступа к этой команде.");
          return;
        }
        
        console.log('Admin authorized for /stat');
        
        try {
          let userData = { users: {}, totalCount: 0 };
          const storedData = await env.BOT_STORAGE.get("user_data");
          
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
          console.log('Stat message sent');
        } catch (error) {
          console.error('Error in stat command:', error);
          await ctx.reply('Произошла ошибка при получении статистики');
        }
      });

      // Команда /menu
      bot.command("menu", async (ctx) => {
        console.log(`/menu command from user: ${ctx.from?.id}`);
        try {
          await ctx.reply("Выберите нужный пункт в меню:", { reply_markup: menu });
          console.log('Menu message sent');
        } catch (error) {
          console.error('Error sending menu:', error);
        }
      });

      // Команда /clearcache (только для админа)
      bot.command("clearcache", async (ctx) => {
        console.log(`/clearcache command from user: ${ctx.from?.id}`);
        
        if (!env.ADMIN_ID || ctx.from?.id !== parseInt(env.ADMIN_ID)) {
          console.log(`User ${ctx.from?.id} not authorized for /clearcache`);
          await ctx.reply("У вас нет доступа к этой команде.");
          return;
        }
        
        // Очищаем кэш
        clearTextsCache();
        console.log('Texts cache cleared');
        await ctx.reply("✅ Кэш текстов очищен. При следующем запросе данные будут загружены из базы.");
      });

      // Обработка ошибок
      bot.catch((err) => {
        console.error('=== BOT ERROR ===');
        console.error('Error in bot:', err);
        console.error('Error stack:', err.stack);
      });

      // Обработка вебхука Telegram
      if (request.method === "POST") {
        try {
          // Получаем данные от Telegram
          const update = await request.json();
          console.log('Telegram update received:', JSON.stringify(update).substring(0, 200));
          
          // Обрабатываем обновление
          await bot.handleUpdate(update);
          
          // Отправляем успешный ответ
          return new Response("OK", { status: 200 });
        } catch (error) {
          console.error('Error handling update:', error);
          return new Response(`Error: ${error.message}`, { status: 500 });
        }
      } else {
        // Для GET запросов показываем информацию
        return new Response(`
          <h1>🤖 Telegram Bot</h1>
          <p>Этот Worker обрабатывает Telegram вебхуки.</p>
          <p>Бот работает в фоновом режиме.</p>
          <p>Для настройки отправьте команду /start в Telegram.</p>
        `, {
          headers: { 'Content-Type': 'text/html' },
          status: 200
        });
      }
      
    } catch (error) {
      console.error("=== FATAL ERROR ===");
      console.error("Error initializing bot:", error);
      console.error("Error stack:", error.stack);
      return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
    }
  }
};