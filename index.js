import { Bot, webhookCallback } from "grammy";
import { welcomeText } from "./modules/constText.js";
import { menu } from "./modules/menu.js";

const bot = new Bot(BOT_TOKEN, { botInfo: BOT_INFO });

// Интерфейс для хранения данных пользователя
interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
}

// Интерфейс для структуры хранилища
interface StorageData {
    users: { [key: string]: UserData };
    totalCount: number;
}

// Инициализируем хранилище
const storage = freeStorage<StorageData>(bot.token);

bot.api.setMyCommands([
  { command: "start", description: "Перезапустить бот" },
  { command: "menu", description: "Главное меню" },
]);

// Отвечаем на команду /start
bot.command("start", async (ctx) => {


    const userId = ctx.from?.id;
    if (!userId) return;

    // Получаем текущие данные из хранилища
    const data = await storage.read() || { users: {}, totalCount: 0 };

    // Добавляем нового пользователя если его еще нет
    if (!data.users[userId]) {
        data.users[userId] = {
            id: userId,
            first_name: ctx.from.first_name,
            last_name: ctx.from.last_name,
            username: ctx.from.username
        };
        data.totalCount += 1;

        // Сохраняем обновленные данные
        await storage.write(data);
    }

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


// Обработчик команды /stat
bot.command('stat', async (ctx) => {
    try {
        const data = await storage.read();
        
        if (!data || data.totalCount === 0) {
            await ctx.reply('Пока нет зарегистрированных пользователей');
            return;
        }

        await ctx.reply(
            `📊 Статистика бота:\n` +
            `👥 Всего пользователей: ${data.totalCount}\n\n` +
            `Последние 5 зарегистрированных:\n` +
            Object.values(data.users)
                .slice(-5)
                .map(u => `• ${u.first_name}${u.username ? ` (@${u.username})` : ''}`)
                .join('\n')
        );
    } catch (error) {
        console.error('Error reading storage:', error);
        await ctx.reply('Произошла ошибка при получении статистики');
    }
});

addEventListener("fetch", webhookCallback(bot, "cloudflare"));
