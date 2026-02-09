import { Bot, webhookCallback } from "grammy";
import { Menu } from "@grammyjs/menu";

// ============ D1 База данных (TextDatabase) ============
class TextDatabase {
  constructor(env) {
    this.db = env.DB;
  }

  async getText(key) {
    try {
      const stmt = this.db.prepare('SELECT content FROM texts WHERE key = ?');
      const result = await stmt.bind(key).first();
      return result ? result.content : null;
    } catch (error) {
      console.error('Error getting text from database:', error);
      return null;
    }
  }

  async getAllTexts() {
    try {
      const stmt = this.db.prepare('SELECT key, content FROM texts');
      const results = await stmt.all();
      
      const texts = {};
      if (results.results) {
        results.results.forEach(row => {
          texts[row.key] = row.content;
        });
      }
      return texts;
    } catch (error) {
      console.error('Error getting all texts from database:', error);
      return {};
    }
  }
}

// Кэш для текстов
let textsCache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 минут

async function getTextsWithCache(env) {
  const now = Date.now();
  
  if (!textsCache || (now - cacheTimestamp) > CACHE_TTL) {
    const db = new TextDatabase(env);
    textsCache = await db.getAllTexts();
    cacheTimestamp = now;
    console.log('Texts cache updated');
  }
  
  return textsCache;
}

// ============ Фабрика меню с динамической загрузкой текстов ============
function createMenu() {
  async function getTexts(ctx) {
    return await getTextsWithCache(ctx.env);
  }

  // Главное меню бота
  const menu = new Menu("root-menu")
    .submenu("🌐️ Интернет", "internet-menu-main")
    .row()
    .submenu("📺️ Телевиденье", "tv-menu-main")
    .row()
    .submenu("❓ ЧаВо", "questions-menu-main")
    .row()
    .url("➡️ Перейти на сайт", "https://alchevsk.net.ru")
    .row()
    .url("➡️ Личный кабинет", "https://stat.alchevsk.net.ru")
    .row();

  // Интернет меню
  const internet = new Menu("internet-menu-main")
    .submenu("⛑️ Диагностика", "diagnostics-internet-menu")
    .row()
    .submenu("🛠 Настройка", "internet-setting-menu")
    .row()
    .back("↩️ Назад");

  // Интернет саб-меню диагностика
  const diagnostics = new Menu("diagnostics-internet-menu")
    .text(
      "🚀️ Проверка скорости интернета",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto(
          "https://beehosting.pro/wp-content/uploads/2021/12/test-skorosti-interneta-v-linux.jpg",
          {
            caption: texts.speedtest || "⚠️ Чтобы замер скорости был корректным подключаем кабель напрямую к компьютеру без участия маршрутизатора.",
            parse_mode: "Markdown",
            reply_markup: speedtestPostBack,
          }
        );
      }
    )
    .row()
    .text(
      "🏓 Проверка на разрывы Ping",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto(
          "https://i.ibb.co/q56nkBX/2023-09-15-16-36-17.png",
          {
            caption: texts.ping || "❕ *Команда ping* — один из базовых инструментов для работы с сетью.",
            parse_mode: "Markdown",
            reply_markup: pingPostBack,
          }
        );
      }
    )
    .row()
    .text(
      "🛣 Трассировка маршрута",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto(
          "https://i.ibb.co/jhXmvx8/2023-09-15-20-35-43.png",
          {
            caption: texts.tracert || "❕ *Команда tracert* – самый популярный инструмент сетевой диагностики.",
            parse_mode: "Markdown",
            reply_markup: tracertPostBack,
          }
        );
      }
    )
    .row()
    .back("↩️ Назад");

  // Кнопки возврата с поста
  const speedtestPostBack = new Menu("speedtest-back").back("↩️ Назад");
  const pingPostBack = new Menu("ping-back").back("↩️ Назад");
  const tracertPostBack = new Menu("tracert-back").back("↩️ Назад");

  // Интернет саб-меню настройка
  const settingInternet = new Menu("internet-setting-menu")
    .text(
      "🛠 Настройка подключения IPoE",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto(
          "https://etype.ru/image/catalog/novosti/2022/kakvybrattarif/stoimostpodklucheniyainterneta.png",
          {
            caption: texts.internetSettingIpoe || "🤖️ _При подключению по IPoE пользователю не нужно вводить логин и пароль...",
            parse_mode: "Markdown",
            reply_markup: ipoePostBack,
          }
        );
      }
    )
    .row()
    .submenu("🛠 Настройка подключения PPPoE", "internet-setting-menu-pppoe")
    .row()
    .back("↩️ Назад");

  // Кнопки возврата с поста
  const ipoePostBack = new Menu("ipoe-post-back").back("↩️ Назад");

  // Настройка РРРоЕ соединения
  const settingInternetPppoe = new Menu("internet-setting-menu-pppoe")
    .text(
      "🛠 Настройка подключения на Windows 10/11",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto(
          "https://etype.ru/image/catalog/novosti/2022/kakvybrattarif/stoimostpodklucheniyainterneta.png",
          {
            caption: texts.internetSettingPppoeWin10 || "1️⃣ Нажмите кнопку 'Пуск', перейдите в пункт 'Параметры'...",
            parse_mode: "Markdown",
            reply_markup: pppoeWin10PostBack,
          }
        );
      }
    )
    .row()
    .text(
      "🛠 Настройка подключения на Windows 7",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto(
          "https://etype.ru/image/catalog/novosti/2022/kakvybrattarif/stoimostpodklucheniyainterneta.png",
          {
            caption: texts.internetSettingPppoeWin7 || "1️⃣ В меню 'Пуск' и выберите 'Панель управления'...",
            parse_mode: "Markdown",
            reply_markup: pppoeWin7PostBack,
          }
        );
      }
    )
    .row()
    .text(
      "🛠 Настройка подключения на маршрутизаторах",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto(
          "https://etype.ru/image/catalog/novosti/2022/kakvybrattarif/stoimostpodklucheniyainterneta.png",
          {
            caption: texts.routerSettings || "🤖️ _Настройка PPPoE на распространенных моделях приведена ниже...",
            parse_mode: "Markdown",
            reply_markup: pppoeRouterPostBack,
          }
        );
      }
    )
    .row()
    .back("↩️ Назад");

  // Кнопки возврата с поста
  const pppoeWin10PostBack = new Menu("win10-back").back("↩️ Назад");
  const pppoeWin7PostBack = new Menu("win7-back").back("↩️ Назад");
  const pppoeRouterPostBack = new Menu("router-back").back("↩️ Назад");

  // Телевиденье меню
  const tv = new Menu("tv-menu-main")
    .submenu("📺️ Кабельное ТВ", "tv-menu")
    .row()
    .text(
      "🖥 IPTV",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto("https://i.ibb.co/56kv7zQ/iptv.webp", {
          caption: texts.iptv || "🤖️ Смотреть IPTV можно традиционно на телевизоре...",
          parse_mode: "Markdown",
          reply_markup: iptvPostBack,
        });
      }
    )
    .row()
    .back("↩️ Назад");

  // Кнопки возврата с поста
  const iptvPostBack = new Menu("iptv-back").back("↩️ Назад");

  // Кабельное ТВ саб-меню
  const ktv = new Menu("tv-menu")
    .text(
      "🛠 Настройка аналогового ТВ",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto("https://i.ibb.co/dttvSg0/atv.jpg", {
          caption: texts.atv || "🤖️ *Аналоговое вещание* — это устаревающий...",
          parse_mode: "Markdown",
          reply_markup: atvPostBack,
        });
      }
    )
    .row()
    .text(
      "🛠 Настройка цифрового ТВ",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto("https://i.ibb.co/WsNS2XP/dtv.jpg", {
          caption: texts.dtv || "🤖️ *Цифровое ТВ* – это телевидение нового поколения...",
          parse_mode: "Markdown",
          reply_markup: dtvPostBack,
        });
      }
    )
    .row()
    .back("↩️ Назад");

  // Кнопки возврата с поста
  const atvPostBack = new Menu("atv-back").back("↩️ Назад");
  const dtvPostBack = new Menu("dtv-back").back("↩️ Назад");

  // Меню раздела ЧаВо
  const questions = new Menu("questions-menu-main")
    .text(
      "💳 Оплата через ПСБ",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto("https://i.ibb.co/S0vQfFn/psbpay.jpg", {
          caption: texts.psbPay || "🤖️ Чтобы оплатить услуги интернета...",
          parse_mode: "Markdown",
          reply_markup: psbPayPostBack,
        });
      }
    )
    .row()
    .text(
      "💳 Оплата через СБЕР",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto("https://raw.githubusercontent.com/snagovskiy/supportBot/refs/heads/main/img/sber.png", {
          caption: texts.sberPay || "🤖️ Чтобы оплатить услуги интернета...",
          parse_mode: "Markdown",
          reply_markup: sberPayPostBack,
        });
      }
    )
    .row()
    .text(
      "💳 Оплата через Payberry",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto("https://raw.githubusercontent.com/snagovskiy/supportBot/refs/heads/main/img/payberry.jpg", {
          caption: texts.payberry || "🤖 Теперь Вы можете оплатить наши услуги...",
          parse_mode: "Markdown",
          reply_markup: payberryPostBack,
        });
      }
    )
    .row()
    .text(
      "💳 Оплата через терминал",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto("https://i.ibb.co/L1rVPmQ/terminal.jpg", {
          caption: texts.terminalPay || "🤖️ Чтобы оплатить услуги интернета...",
          parse_mode: "Markdown",
          reply_markup: terminalPayPostBack,
        });
      }
    )
    .row()
    .text(
      "💳 Услуга кредит",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto("https://i.ibb.co/0jJgLrG/credit.jpg", {
          caption: texts.credit || "🤖️ Данная услуга дает возможность подключить интернет...",
          parse_mode: "Markdown",
          reply_markup: creditBack,
        });
      }
    )
    .row()
    .url(
      "➡️ Точки продажи ваучеров",
      "https://yandex.ru/maps/?from=mapframe&ll=38.706513%2C48.481763&mode=usermaps&source=mapframe&um=constructor%3A12d115190d66c60cd072a2029ec9088064e285845c4f8c154bb109e0f1c0868b&utm_source=mapframe&z=11"
    )
    .row()
    .text(
      "🏤 Адреса абонентских отделов",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto(
          "https://i.ibb.co/bPwFj57/IMG-20231013-145736-615-01.jpg",
          {
            caption: texts.abon || "🏤 _г.Алчевск, улица Ленина, 86_...",
            parse_mode: "Markdown",
            reply_markup: abonPostBack,
          }
        );
      }
    )
    .row()
    .text(
      "⏳ Сроки выполнения заявок",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto("https://i.ibb.co/qpV7DWc/remont.jpg", {
          caption: texts.zayavki || "🤖 Все заявки выполняются в порядке очереди...",
          parse_mode: "Markdown",
          reply_markup: zayavkiPostBack,
        });
      }
    )
    .row()
    .text(
      "🔒 Блокировка/разблокировка тарифов",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.replyWithPhoto("https://i.ibb.co/vVR2JFK/block.jpg", {
          caption: texts.blocktarif || "🤖️ Блокировка/разблокировка тарифов...",
          parse_mode: "Markdown",
          reply_markup: blocktarifPostBack,
        });
      }
    )
    .row()
    .text(
      "✅ Восстановление услуг",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.reply(texts.vosstanov || "🤖 Если с момента последнего выхода...", {
          parse_mode: "Markdown",
          reply_markup: vosstanovPostBack,
        });
      }
    )
    .row()
    .text(
      "📎 Выделенный IP адрес",
      async (ctx) => {
        const texts = await getTexts(ctx);
        await ctx.reply(texts.vIp || "🤖 Стоимость услуги «Выделенный IP адрес»...", {
          parse_mode: "Markdown",
          reply_markup: vIpPostBack,
        });
      }
    )
    .row()
    .url(
      "🔔 Оповещения по окончанию средств на счету",
      "https://alchevsk.net.ru/abonents/connect_tgbot_android.php"
    )
    .row()
    .url(
      "➡️ По Wi-Fi скорость интернета ниже. Почему?",
      "https://help-wifi.com/poleznoe-i-interesnoe/po-wi-fi-skorost-interneta-menshe-pochemu-router-rezhet-skorost/"
    )
    .row()
    .back("↩️ Назад");

  // Кнопки возврата с поста
  const psbPayPostBack = new Menu("psbpay-back").back("↩️ Назад");
  const sberPayPostBack = new Menu("sberpay-back").back("↩️ Назад");
  const payberryPostBack = new Menu("payberry-back").back("↩️ Назад");
  const terminalPayPostBack = new Menu("terminalpay-back").back("↩️ Назад");
  const creditBack = new Menu("credit-back").back("↩️ Назад");
  const abonPostBack = new Menu("abon-back").back("↩️ Назад");
  const zayavkiPostBack = new Menu("zayavki-back").back("↩️ Назад");
  const blocktarifPostBack = new Menu("blockterif-back").back("↩️ Назад");
  const vosstanovPostBack = new Menu("vosstanov-back").back("↩️ Назад");
  const vIpPostBack = new Menu("vIp-back").back("↩️ Назад");

  // Подключение саб-меню
  menu.register(internet);
  menu.register(tv);
  menu.register(ktv, "tv-menu-main");
  menu.register(diagnostics, "internet-menu-main");
  menu.register(speedtestPostBack, "diagnostics-internet-menu");
  menu.register(pingPostBack, "diagnostics-internet-menu");
  menu.register(tracertPostBack, "diagnostics-internet-menu");
  menu.register(ipoePostBack, "internet-setting-menu");
  menu.register(settingInternet, "internet-menu-main");
  menu.register(settingInternetPppoe, "internet-setting-menu");
  menu.register(pppoeWin10PostBack, "internet-setting-menu-pppoe");
  menu.register(pppoeWin7PostBack, "internet-setting-menu-pppoe");
  menu.register(pppoeRouterPostBack, "internet-setting-menu-pppoe");
  menu.register(iptvPostBack, "tv-menu-main");
  menu.register(atvPostBack, "tv-menu");
  menu.register(dtvPostBack, "tv-menu");
  menu.register(questions);
  menu.register(psbPayPostBack, "questions-menu-main");
  menu.register(sberPayPostBack, "questions-menu-main");
  menu.register(payberryPostBack, "questions-menu-main");
  menu.register(terminalPayPostBack, "questions-menu-main");
  menu.register(creditBack, "questions-menu-main");
  menu.register(abonPostBack, "questions-menu-main");
  menu.register(zayavkiPostBack, "questions-menu-main");
  menu.register(blocktarifPostBack, "questions-menu-main");
  menu.register(vosstanovPostBack, "questions-menu-main");
  menu.register(vIpPostBack, "questions-menu-main");

  return menu;
}

// ============ Основной код бота ============
const bot = new Bot(BOT_TOKEN, { botInfo: BOT_INFO });

// Добавляем команду статистики в меню бота
bot.api.setMyCommands([
  { command: "start", description: "Перезапустить бот" },
  { command: "menu", description: "Главное меню" },
  { command: "stat", description: "Статистика бота (только для админа)" },
]);

// Функция для получения данных из KV
async function getKVData(env) {
  try {
    const data = await env.BOT_STORAGE.get("user_data");
    return data ? JSON.parse(data) : { users: {}, totalCount: 0 };
  } catch (error) {
    console.error("Error getting data from KV:", error);
    return { users: {}, totalCount: 0 };
  }
}

// Функция для сохранения данных в KV
async function putKVData(env, data) {
  try {
    await env.BOT_STORAGE.put("user_data", JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error putting data to KV:", error);
    return false;
  }
}

// Отвечаем на команду /start
bot.command("start", async (ctx) => {
  const userId = ctx.from?.id;
  const env = ctx.env;
  
  if (userId) {
    try {
      // Получаем текущие данные из KV
      const userData = await getKVData(env);
      
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
        const success = await putKVData(env, userData);
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

// Команда для показа статистики
bot.command("stat", async (ctx) => {
  const env = ctx.env;
  
  // Проверяем, имеет ли пользователь доступ к статистике
  if (ctx.from?.id !== parseInt(env.ADMIN_ID)) {
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

// Команда для обновления кэша текстов (только для админа)
bot.command("clearcache", async (ctx) => {
  const env = ctx.env;
  
  if (ctx.from?.id !== parseInt(env.ADMIN_ID)) {
    await ctx.reply("У вас нет доступа к этой команде.");
    return;
  }
  
  textsCache = null;
  cacheTimestamp = 0;
  await ctx.reply("✅ Кэш текстов очищен. При следующем запросе данные будут загружены из базы.");
});

// Подключение меню
const menu = createMenu();
bot.use(menu);

bot.command("menu", async (ctx) => {
  // Отправляем меню.
  await ctx.reply("Выберите нужный пункт в меню:", { reply_markup: menu });
});

// Обработка ошибок
bot.catch((err) => {
  console.error('Error in bot:', err);
});

// Cloudflare Worker обработчик
export default {
  async fetch(request, env, ctx) {
    // Добавляем env в контекст бота
    bot.use(async (ctx, next) => {
      ctx.env = env;
      await next();
    });
    
    return await webhookCallback(bot, "cloudflare")(request);
  }
};