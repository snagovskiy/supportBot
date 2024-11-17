import { Menu } from "@grammyjs/menu";
import {
  speedtest,
  ping,
  tracert,
  internetSettingIpoe,
  internetSettingPppoeWin10,
  internetSettingPppoeWin7,
  routerSettings,
  atv,
  dtv,
  iptv,
  psbPay,
  terminalPay,
  abon,
  zayavki,
  blocktarif,
  credit,
  vosstanov,
  vIp
} from "./constText.js";

//Главное меню бота
export const menu = new Menu("root-menu")
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
    async (ctx) =>
      await ctx.replyWithPhoto(
        "https://beehosting.pro/wp-content/uploads/2021/12/test-skorosti-interneta-v-linux.jpg",
        {
          caption: speedtest,
          parse_mode: "Markdown",
          reply_markup: speedtestPostBack,
        },
      ),
  )
  .row()
  .text(
    "🏓 Проверка на разрывы Ping",
    async (ctx) =>
      await ctx.replyWithPhoto(
        "https://i.ibb.co/q56nkBX/2023-09-15-16-36-17.png",
        {
          caption: ping,
          parse_mode: "Markdown",
          reply_markup: pingPostBack,
        },
      ),
  )
  .row()
  .text(
    "🛣 Трассировка маршрута",
    async (ctx) =>
      await ctx.replyWithPhoto(
        "https://i.ibb.co/jhXmvx8/2023-09-15-20-35-43.png",
        {
          caption: tracert,
          parse_mode: "Markdown",
          reply_markup: tracertPostBack,
        },
      ),
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
    async (ctx) =>
      await ctx.replyWithPhoto(
        "https://etype.ru/image/catalog/novosti/2022/kakvybrattarif/stoimostpodklucheniyainterneta.png",
        {
          caption: internetSettingIpoe,
          parse_mode: "Markdown",
          reply_markup: ipoePostBack,
        },
      ),
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
    async (ctx) =>
      await ctx.replyWithPhoto(
        "https://etype.ru/image/catalog/novosti/2022/kakvybrattarif/stoimostpodklucheniyainterneta.png",
        {
          caption: internetSettingPppoeWin10,
          parse_mode: "Markdown",
          reply_markup: pppoeWin10PostBack,
        },
      ),
  )
  .row()
  .text(
    "🛠 Настройка подключения на Windows 7",
    async (ctx) =>
      await ctx.replyWithPhoto(
        "https://etype.ru/image/catalog/novosti/2022/kakvybrattarif/stoimostpodklucheniyainterneta.png",
        {
          caption: internetSettingPppoeWin7,
          parse_mode: "Markdown",
          reply_markup: pppoeWin7PostBack,
        },
      ),
  )
  .row()
  .text(
    "🛠 Настройка подключения на маршрутизатарах",
    async (ctx) =>
      await ctx.replyWithPhoto(
        "https://etype.ru/image/catalog/novosti/2022/kakvybrattarif/stoimostpodklucheniyainterneta.png",
        {
          caption: routerSettings,
          parse_mode: "Markdown",
          reply_markup: pppoeRouterPostBack,
        },
      ),
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
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/56kv7zQ/iptv.webp", {
        caption: iptv,
        parse_mode: "Markdown",
        reply_markup: iptvPostBack,
      }),
  )
  .row()
  .back("↩️ Назад");

// Кнопки возврата с поста
const iptvPostBack = new Menu("iptv-back").back("↩️ Назад");

// Кабельное ТВ саб-меню
const ktv = new Menu("tv-menu")
  .text(
    "🛠 Настройка аналового ТВ",
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/dttvSg0/atv.jpg", {
        caption: atv,
        parse_mode: "Markdown",
        reply_markup: atvPostBack,
      }),
  )
  .row()
  .text(
    "🛠 Настройка цифрового ТВ",
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/WsNS2XP/dtv.jpg", {
        caption: dtv,
        parse_mode: "Markdown",
        reply_markup: dtvPostBack,
      }),
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
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/S0vQfFn/psbpay.jpg", {
        caption: psbPay,
        parse_mode: "Markdown",
        reply_markup: psbPayPostBack,
      }),
  )
  .row()
  .text(
    "💳 Оплата через терминал",
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/L1rVPmQ/terminal.jpg", {
        caption: terminalPay,
        parse_mode: "Markdown",
        reply_markup: terminalPayPostBack,
      }),
  )
  .row()
  .text(
    "💳 Услуга кредит",
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/0jJgLrG/credit.jpg", {
        caption: credit,
        parse_mode: "Markdown",
        reply_markup: creditBack,
      }),
  )
  .row()
  .url(
    "➡️ Точки продажи ваучеров",
    "https://yandex.ru/maps/?from=mapframe&ll=38.706513%2C48.481763&mode=usermaps&source=mapframe&um=constructor%3A12d115190d66c60cd072a2029ec9088064e285845c4f8c154bb109e0f1c0868b&utm_source=mapframe&z=11",
  )
  .row()
  .text(
    "🏤 Адреса абонентских отделов",
    async (ctx) =>
      await ctx.replyWithPhoto(
        "https://i.ibb.co/bPwFj57/IMG-20231013-145736-615-01.jpg",
        {
          caption: abon,
          parse_mode: "Markdown",
          reply_markup: abonPostBack,
        },
      ),
  )
  .row()
  .text(
    "⏳ Сроки выполнения заявок",
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/qpV7DWc/remont.jpg", {
        caption: zayavki,
        parse_mode: "Markdown",
        reply_markup: zayavkiPostBack,
      }),
  )
  .row()
  .text(
    "🔒 Блокировка/разблокировка тарифов",
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/vVR2JFK/block.jpg", {
        caption: blocktarif,
        parse_mode: "Markdown",
        reply_markup: blocktarifPostBack,
      }),
  )
  .row()
  .text(
    "✅ Восстановление услуг",
    async (ctx) =>
      await ctx.reply(vosstanov, {
        parse_mode: "Markdown",
        reply_markup: vosstanovPostBack,
      }),
  )
  .row()
  .text(
    "📎 Выделенный IP адрес",
    async (ctx) =>
      await ctx.reply(vIp, {
        parse_mode: "Markdown",
        reply_markup: vIpPostBack,
      }),
  )
  .row()
  .url(
    "🔔 Оповещения по окончанию средств на счету",
    "https://alchevsk.net.ru/abonents/connect_tgbot_android.php",
  )
  .row()
  .url(
    "➡️ По Wi-Fi скорость интернета ниже. Почему?",
    "https://help-wifi.com/poleznoe-i-interesnoe/po-wi-fi-skorost-interneta-menshe-pochemu-router-rezhet-skorost/",
  )
  .row()
  .back("↩️ Назад");

// Кнопки возврата с поста
const psbPayPostBack = new Menu("psbpay-back").back("↩️ Назад");
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
menu.register(terminalPayPostBack, "questions-menu-main");
menu.register(creditBack, "questions-menu-main");
menu.register(abonPostBack, "questions-menu-main");
menu.register(zayavkiPostBack, "questions-menu-main");
menu.register(blocktarifPostBack, "questions-menu-main");
menu.register(vosstanovPostBack, "questions-menu-main");
menu.register(vIpPostBack, "questions-menu-main");