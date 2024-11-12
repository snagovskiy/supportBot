import { Menu } from "@grammyjs/menu";

//Главное меню бота
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
    async (ctx) =>
      await ctx.replyWithPhoto(
        "https://beehosting.pro/wp-content/uploads/2021/12/test-skorosti-interneta-v-linux.jpg",
        {
          caption: "⚠️ Чтобы замер скорости был корректным подключаем кабель напрямую к компьютеру без участия маршрутизатора. \n\n🤖️ Далее, _нам нужно убедиться, что на ПК отключены все просмотры потокового видео, загрузки, к примеру в таких программах как torrent, steam и т.п и VPN-соединения_. Для замера используем популярный сервис speedtest.net. Зайдя на сайт, нужно сменить сервер до которого будет произведен тест. Нажимаем кнопку “Change Server” и в поиске набираем “*Alchevsk.net*”. \n\n🤖️ Выбираем данный сервер и нажимаем кнопку “GO”, ждем результат. Если результат не соответствует тарифу, запишите показатели замера и обратитесь в техническую поддержку по короткому номеру телефона ☎️ *502*.",
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
          caption: "❕ *Команда ping* — один из базовых инструментов для работы с сетью. С помощью ping можно проверить сервер и его доступность с любого компьютера, а также соединение между устройствами. \n\n🤖️ Для того что бы проверить если проблема  внутри сети воспользуемся командой “ping”, через нее мы сможем понять если обрыв подключения по линии до нашего узлового оборудования. \n\n🤖️ Подключаем кабель интернета напрямую к компьютеру. Открываем командную строку сочетанием клавиш “Win +R ” и в окне “Выполнить” пишем “cmd” нажимаем “ОК”. \n\n🤖️ В открывшемся окне пишем команду “_ping 100.104.192.4 -l 1470 -n 100_”. \n\n⚠️ Где 100.104.192.4 Шлюз из настроек в сетевой карте. \n\n🤖️ Ждем “Статистику”. \n\n🤖️ Если в статистике написано, что 0% потерь, по линии все в порядке, если больше 5% потерь нужно обратиться в техническую поддержку по номеру телефона ☎️ *502*. Допустимый процент потерь в сети до 5%.",
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
          caption: "❕ *Команда tracert* – самый популярный инструмент сетевой диагностики. С помощью tracert можно проверить путь запроса к серверу и выявить проблемы, связанные с доступностью удаленного сервера. \n\n🤖️ Подключаем кабель интернета напрямую к компьютеру. Открываем командную строку сочетанием клавиш “Win +R” и в окне “Выполнить” пишем “cmd” нажимаем “ОК”. \n\n🤖️ В открывшемся окне пишем команду “tracert 8.8.8.8”. \n\n🤖️ 8.8.8.8 - это ip адрес Google DNS, вместо него указываете интересующий вас ip или адрес сайте к примеру yandex.ru. \n\n🤖️ Как видно из скриншота маршрут полностью прошел до сервера. Крайний шлюз провайдера  185.248.27.33 это обычно 2 или 3й прыжок как в данном случае т.к. действие производилось через роутер, если маршрут выходит за шлюз и уходит в мир, значит проблема находиться за покрытием провайдера.",
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
          caption: "🤖️ _При подключению по IPoE пользователю не нужно вводить логин и пароль при подключении к интернету_: DHCP-сервер динамически назначает IP-адреса и другую связанную информацию о конфигурации сетевым устройствам. \n\n🤖️ Сведения об IP и MAC при этом прописываются на коммутаторе автоматически. Это позволяет сэкономить ограниченное пространство IP-адресов. При использовании протокола IPoE информационные фреймы не содержат кодировочной информации, поэтому обрабатываются в разы быстрее. \n\n🤖️ IPoE позволяет абонентам перемещаться в любую точку сети и автоматически получать IP-адрес при повторном подключении. *С помощью технологии можно подключать к интернету все устройства в доме: телевизоры, игровые приставки, SmartTV и пр.*\n\n‼️ _Чтобы узнать какой тип подключения используется по вашему адресу позвоните по короткому номеру телефона ☎️ 502_",
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
          caption: "1️⃣ Нажмите кнопку “Пуск”, перейдите в пункт “Параметры”. \n\n2️⃣ Выбираем пункт “Сеть и Интернет”. \n\n3️⃣ В левом столбце перейдите в “Набор номера”. \n\n4️⃣ Нажмите на кнопку <Настройка нового подключения>. \n\n5️⃣ Выберите пункт “Подключение к Интернету”, нажмите кнопку <Далее> \n\n6️⃣ Выберите “Высокоскоростное (с PPPoE)” \n\n7️⃣ Система запросит Ваши учётные данные. _Введите логин и пароль, указанные в договоре._ “Имя подключения” можете выставить произвольное. После того как всё введено, нажмите кнопку <Подключить> \n\n8️⃣ Ожидайте, пока пройдет проверка. \n\n9️⃣ Настройка завершена!",
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
          caption: '1️⃣ Вменю "Пуск" и выберите "Панель управления". \n\n2️⃣ В окне "Настройка параметров компьютера" выберите категорию"Сеть и Интернет". \n\n3️⃣ Далее в открывшемся окне выберите "Центр управления сетями и общим доступом". \n\n4️⃣ Перейдите по ссылки "Настройка нового подключения или сети". \n\n5️⃣ В открывшемся окне выберите вариант "Подключение к Интернету" и нажмите кнопку <Далее>. \n\n6️⃣ В окне "Как выполнить подключение?" выберите тип подключения "Высокоскоростное (с PPPoE)". \n\n7️⃣ Система запросит Ваши учётные данные. _Введите логин и пароль, указанные в договоре._ "Имя подключения" можете выставить произвольное. После того как всё введено, нажмите кнопку <Подключить> \n\n8️⃣ При успешной проверки система уведомит о создании нового подключения. Теперь можно нажать кнопку <Закрыть>. \n\n9️⃣ Настройка завершена!',
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
          caption: '🤖️ _Настройка PPPoE на распространеных моделях приведена ниже. Логин и пароль вводить указаный в договоре._\n\n🤖️ Настройка для фирмы [TP-Link](https://avk-wellcom.ru/abonentam/instrukczii/nastrojka-routera-tp-link-tl-wr841n.html) \n\n🤖️ Настройка для фирмы [D-Link](https://penza.dom.ru/service/knowledgebase/instruktsii-po-oborudovaniyu/router__DLink_White_003?utm_referrer=https%3a%2f%2fwww.google.com%2f) \n\n🤖️ Настройка для фирмы [Keenetic](https://help.keenetic.com/hc/ru/articles/360000466959-%D0%9F%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BA-%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82%D1%83-%D0%BF%D0%BE-%D0%BF%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB%D1%83-PPPoE) \n\n🤖️ Настройка для фирмы [Xiaomi](https://help-wifi.com/xiaomi/podklyuchenie-i-nastrojka-xiaomi-mi-wi-fi-router-3/) \n\n🤖️ Настройка для фирмы [Huawei](https://natanet.ru/nastrojka-podklyucheniya-na-routerax-huawei)',
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
        caption: '🤖️ Смотреть IPTV можно традиционно на телевизоре, а также на компьютере, смартфоне или планшете. Разберем настройку на телевизоре:\n\n🤖️ Впервую очередь нужно установить на телевизор плеер, если он у вас не установил производитель телевизора. С Google Play маркета или другого магазина в зависимости от фирмы телевизора устанавливаем плеер который вам понравится.\n\n🤖️ Разберем на примере [IP-TV Player от Александра Софронова](http://iptvremote.blogspot.com/):\n\n    🔸 Запускаем плеер, находим в меню "+ Добавить URL".\n\n    🔸 В поле "Адрес плейлиста" пишим "http://10.10.200.200/playlist.m3u".\n\n   🔸 В "Имя" пишем "Alchevsk.net".\n\n    🔸 Нажимаем "ОК".\n\n🤖️ Скачать [плеер](http://iptvremote.ru/updates/iptv.7.1.5/free/), выберете нужную версию. Обычно подходит [iptv-7.1.5-armv7](http://iptvremote.ru/updates/iptv.7.1.5/free/iptv-7.1.5-armv7.apk)\n\n🤖️ Для абонентов с подключением PPPoE нужно активировать услугу по номеру ☎️ 502, ссылка с ТОКЕНОМ будет в личном кабинете.\n\n🤖️ _Услуга предоставляется БЕСПЛАТНО в тестовом режиме БЕЗ ГАРАНТИИ качества и бесперебойности трансляции!_',
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
        caption: '🤖️ *Аналоговое вещание* — это устаревающий, но всё еще распространенный тип телевещания. \n\n🤖️ _Чтобы найти аналоговые каналы:_\n\n  1️⃣ Подключите к телевизору кабель от ТВ-антенны.\n\n  2️⃣ На домашнем экране телевизора нажмите и выберите ⚙️ Настройки устройства → Каналы.\n\n  3️⃣ Откройте Сканировать каналы → Аналоговые и нажмите Автосканирование.\n\n  4️⃣ Телевизор начнёт искать и сохранять аналоговые каналы. Дождитесь завершения сканирования.',
        parse_mode: "Markdown",
        reply_markup: atvPostBack,
      }),
  )
  .row()
  .text(
    "🛠 Настройка цифрового ТВ",
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/WsNS2XP/dtv.jpg", {
        caption: '🤖️ *Цифровое ТВ* – это телевидение нового поколения. Оно обеспечивает максимально доступное на сегодня качество сигнала и звука.\n\n🤖️ _Чтобы найти цифровые каналы:_\n\n   1️⃣ На домашнем экране телевизора нажмите и выберите ⚙️ Настройки устройства → Каналы.\n\n    2️⃣ Нажмите Сканировать каналы → Кабельные.\n\n    3️⃣ Выберите способ сканирования:\n\n    🔸 Автосканирование. Телевизор сам переберёт все частоты и найдёт доступные кабельные каналы. Этот способ дольше, но надёжнее, чем ручной поиск.\n\n    🔸 Сканировать вручную. Телевизор просканирует только выбранную вами частоту — её нужно указать в поле Частота на предыдущем экране. Частоты, на которых транслируются кабельные телеканалы:\n\n    ⚙️ Modulation - 256QAM\n\n    ⚙️ Symbol rate - 6875\n\n📡 Частоты:\n\n   58MHz   90MHz   122MHz\n\n    66MHz   98MHz   130MHz\n\n    74MHz   106MHz  138MHz\n\n    82MHz   114MHz  146MHz',
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
        caption: '🤖️ Чтобы оплатить услуги интернета, вам потребуется лицевой счет абонента. Узнать можно по короткому номеру ☎️ 502\n\n    🔶 откройте приложение ПСБ\n\n    🔶 перейдите во вкладку “Платежи”\n\n    🔶 в поиске введите “Лугалинк”\n\n    🔶 выбираем появившийся результат Оплата услуг *ООО "Лугалинк" (ИНН 9406007003)*\n\n    🔶 в поле “идентификатор абонента” напишите номер лицевого счета\n\n    🔶 в поле “сумма платежа” ту сумму, которую собираетесь положить на счет\n\n    🔶 Нажимаем “далее” и дожидаетесь код подтверждения операции\n\n🤖️ Подробнее [посмотреть на сайте](https://alchevsk.net.ru/abonents/psbank.php)',
        parse_mode: "Markdown",
        reply_markup: psbPayPostBack,
      }),
  )
  .row()
  .text(
    "💳 Оплата через терминал",
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/L1rVPmQ/terminal.jpg", {
        caption: '🤖️ Чтобы оплатить услуги интернета, вам потребуется лицевой счет абонента. Узнать можно по короткому номеру ☎️ 502.\n\n   🔶 Для оплаты понадобится терминал Lugapay\n\n    🔶 Среди списка провайдеров находим “Лугалинк”\n\n    🔶 Вводим номер лицевого счета\n\n    🔶 Вносим нужную сумму\n\n⚠️ По возможности, сохраните чек до поступления средств на счет',
        parse_mode: "Markdown",
        reply_markup: terminalPayPostBack,
      }),
  )
  .row()
  .text(
    "💳 Услуга кредит",
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/0jJgLrG/credit.jpg", {
        caption: '🤖️ Данная услуга дает возможность подключить интернет на три дня.\n\n🤖️ Услуга станет доступна повторно, после погашения кредита плюс оплаченный день',
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
          caption: '🏤 _г.Алчевск, улица Ленина, 86_\n\n\n    📈 График работы:\n\n        🕗 Понедельник-Суббота - с 8-00 до 17-00\n\n        📅 Воскресенье - выходной день\n\n\n  🏤 _г.Перевальск, улица Ленина, 35_\n\n\n      📈 График работы:\n\n        🕗 Понедельник-Пятница - с 9-00 до 17-00\n\n        📅 Суббота-Воскресенье - выходной день\n\n  🏤 _г.Брянка, улица Котовского, 1Б_\n\n\n      📈 График работы:\n\n        🕗 Понедельник-Пятница - с 8-00 до 15-00\n\n        📅 Суббота-Воскресенье - выходной день',
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
        caption: '🤖 Все заявки выполняются в порядке очереди:\n\n    🔶 на ремонт интернет и телевидения гг. Алчевск, Перевальск, Брянка, Стаханов, Алмазная в течение 72 часов;\n\n   🔶 на ремонт интернет удаленных поселков в течение недели;\n\n    🔶 на подключение новых абонентов к сети Интернет в течение 5 дней.',
        parse_mode: "Markdown",
        reply_markup: zayavkiPostBack,
      }),
  )
  .row()
  .text(
    "🔒 Блокировка/разблокировка тарифов",
    async (ctx) =>
      await ctx.replyWithPhoto("https://i.ibb.co/vVR2JFK/block.jpg", {
        caption: '🤖️ Блокировка/разблокировка тарифов возможна только по звонку в техническую поддержку (☎️ 502) с контактного номера телефона или после сверки паспортных данных владельца договора.\n\n🤖️ Вы можете разблокировать свой счет бесплатно один раз в месяц.\n\n🤖️ Срок неоплачиваемой блокировки - до 60-ти суток, позднее – восстановление услуг будет платным.',
        parse_mode: "Markdown",
        reply_markup: blocktarifPostBack,
      }),
  )
  .row()
  .text(
    "✅ Восстановление услуг",
    async (ctx) =>
      await ctx.reply('🤖 Если с момента последнего выхода в сеть прошло меньше года, для восстановления услуги абоненту нужно:\n\n✅ Подойти с паспортом в любой центр обслуживания абонентов и внести оплату за восстановление услуги в размере 250 рублей + оплата за полный месяц по выбранному тарифному пакету + оплата за услугу "Вызов мастера".\n\n🤖 Если с момента последнего выхода в сеть прошло более года, для восстановления услуги абоненту нужно:\n\n✅ Подойти с паспортом в любой центр обслуживания абонентов и внести оплату за восстановление услуги в размере 250 рублей + предоплата за 50 метров кабеля (в случае, если с кабелем все в порядке и замена не требуется, то все средства останутся на счету) + оплата за полный месяц по выбранному тарифному пакету + оплата за услугу "Вызов мастера".\n\n🤖 Восстановить услугу возможно в телефонном режиме, в случае, если абонент отключен программно! Для этого, абонент должен позвонить в Call-центр на номер 502.\n\n‼️ В случае физического отключения, мастер подойдет в течении 3-х суток с момента обращения и внесения средств.', {
        parse_mode: "Markdown",
        reply_markup: vosstanovPostBack,
      }),
  )
  .row()
  .text(
    "📎 Выделенный IP адрес",
    async (ctx) =>
      await ctx.reply('🤖 Стоимость услуги «Выделенный IP адрес» составляет 160 рублей и оплачивается дополнительно.\n\n🤖 Снятие средств происходит каждого первого числа месяца до момента отказа от услуги.\n\n🤖 Заказать «Выделенный IP адрес» можно по телефону ☎️ 502 или в Центрах обслуживания абонентов с документом, подтверждающим личность.', {
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

module.exports.menu = menu;
