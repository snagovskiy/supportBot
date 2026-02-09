import { Bot, webhookCallback } from "grammy";
import { createMenu } from "./modules/menu1.js";
import { getTextsWithCache, clearTextsCache } from "./modules/database.js";

// Экспортируем обработчик как ES Module
export default {
  async fetch(request, env, ctx) {
    try {
      // Проверяем наличие необходимых переменных
      if (!env.BOT_TOKEN) {
        console.error("BOT_TOKEN is not defined");
        return new Response("BOT_TOKEN is not defined", { status: 500 });
      }

      // Инициализируем бота
      const bot = new Bot(env.BOT_TOKEN);
      
      // Добавляем команды в меню бота
      await bot.api.setMyCommands([
        { command: "start", description: "Перезапустить бот" },
        { command: "menu", description: "Главное меню" },
        { command: "stat", description: "Статистика бота (только для админа)" },
        { command: "clearcache", description: "Очистить кэш (админ)" }
      ]);

      // Создаем middleware для передачи env в контекст
      bot.use(async (ctx, next) => {
        ctx.env = env;
        await next();
      });

      // Создаем меню
      const menu = createMenu();
      
      // Подключаем меню к боту
      bot.use(menu);

      // Функция для получения данных из KV
      async function getKVData() {
        try {
          const data = await env.BOT_STORAGE.get("user_data");
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
          return true;
        } catch (error) {
          console.error("Error putting data to KV:", error);
          return false;
        }
      }

      // Команда /start
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
        
        await ctx.reply(`<b>${ctx.from?.first_name}</b>, <b>привет!</b> 😀️ \n\n🤖️ Меня зовут Виталик. \n\n⛑️ Я помогу тебе настроить доступ к интернету и телевидению, а также диагностировать неисправности, ответить на часто задаваемые вопросы. \n\n📋️ Перейти в меню /menu`, {
          parse_mode: "HTML",
          disable_web_page_preview: true,
        });
      });

      // Команда /stat
      bot.command("stat", async (ctx) => {
        // Проверяем, имеет ли пользователь доступ к статистике
        if (!env.ADMIN_ID || ctx.from?.id !== parseInt(env.ADMIN_ID)) {
          await ctx.reply("У вас нет доступа к этой команде.");
          return;
        }
        
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
        } catch (error) {
          console.error('Error in stat command:', error);
          await ctx.reply('Произошла ошибка при получении статистики');
        }
      });

      // Команда /menu
      bot.command("menu", async (ctx) => {
        await ctx.reply("Выберите нужный пункт в меню:", { reply_markup: menu });
      });

      // Команда /clearcache (только для админа)
      bot.command("clearcache", async (ctx) => {
        if (!env.ADMIN_ID || ctx.from?.id !== parseInt(env.ADMIN_ID)) {
          await ctx.reply("У вас нет доступа к этой команде.");
          return;
        }
        
        // Очищаем кэш
        clearTextsCache();
        await ctx.reply("✅ Кэш текстов очищен. При следующем запросе данные будут загружены из базы.");
      });

      // Обработка ошибок
      bot.catch((err) => {
        console.error('Error in bot:', err);
      });

      // Возвращаем обработчик вебхука
      return webhookCallback(bot, "cloudflare")(request);
      
    } catch (error) {
      console.error("Error initializing bot:", error);
      return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
    }
  }
};