import { Menu } from "@grammyjs/menu";
import { getTextsWithCache } from "./database.js";

// Вспомогательная функция для получения текстов
async function getTexts(ctx) {
  return await getTextsWithCache(ctx.env);
}

// Фабрика для создания меню с динамической загрузкой текстов
export function createMenu() {
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
            caption: texts.speedtest || "Текст скоро будет загружен...",
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
            caption: texts.ping || "Текст скоро будет загружен...",
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
            caption: texts.tracert || "Текст скоро будет загружен...",
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
            caption: texts.internetSettingIpoe || "Текст скоро будет загружен...",
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
            caption: texts.internetSettingPppoeWin10 || "Текст скоро будет загружен...",
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
            caption: texts.internetSettingPppoeWin7 || "Текст скоро будет загружен...",
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
            caption: texts.routerSettings || "Текст скоро будет загружен...",
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
          caption: texts.iptv || "Текст скоро будет загружен...",
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
          caption: texts.atv || "Текст скоро будет загружен...",
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
          caption: texts.dtv || "Текст скоро будет загружен...",
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
          caption: texts.psbPay || "Текст скоро будет загружен...",
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
          caption: texts.sberPay || "Текст скоро будет загружен...",
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
          caption: texts.payberry || "Текст скоро будет загружен...",
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
          caption: texts.terminalPay || "Текст скоро будет загружен...",
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
          caption: texts.credit || "Текст скоро будет загружен...",
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
            caption: texts.abon || "Текст скоро будет загружен...",
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
          caption: texts.zayavki || "Текст скоро будет загружен...",
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
          caption: texts.blocktarif || "Текст скоро будет загружен...",
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
        await ctx.reply(texts.vosstanov || "Текст скоро будет загружен...", {
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
        await ctx.reply(texts.vIp || "Текст скоро будет загружен...", {
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

// Экспортируем фабрику для создания меню
export const menu = createMenu();