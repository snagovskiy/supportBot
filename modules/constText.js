export const welcomeText =
  ", <b>привет!</b> 😀️ \n\n🤖️ Меня зовут Виталик. \n\n⛑️ Я помогу тебе настроить доступ к интернету и телевидению, а также диагностировать неисправности, ответить на часто задаваемые вопросы. \n\n📋️ Перейти в меню /menu";

// Статья проверка скорости

export const speedtest =
  "⚠️ Чтобы замер скорости был корректным подключаем кабель напрямую к компьютеру без участия маршрутизатора. \n\n🤖️ Далее, _нам нужно убедиться, что на ПК отключены все просмотры потокового видео, загрузки, к примеру в таких программах как torrent, steam и т.п и VPN-соединения_. Для замера используем популярный сервис speedtest.net. Зайдя на сайт, нужно сменить сервер до которого будет произведен тест. Нажимаем кнопку “Change Server” и в поиске набираем “*Alchevsk.net*”. \n\n🤖️ Выбираем данный сервер и нажимаем кнопку “GO”, ждем результат. Если результат не соответствует тарифу, запишите показатели замера и обратитесь в техническую поддержку по короткому номеру телефона ☎️ *502*.";

// Ping

export const ping =
  "❕ *Команда ping* — один из базовых инструментов для работы с сетью. С помощью ping можно проверить сервер и его доступность с любого компьютера, а также соединение между устройствами. \n\n🤖️ Для того что бы проверить если проблема  внутри сети воспользуемся командой “ping”, через нее мы сможем понять если обрыв подключения по линии до нашего узлового оборудования. \n\n🤖️ Подключаем кабель интернета напрямую к компьютеру. Открываем командную строку сочетанием клавиш “Win +R ” и в окне “Выполнить” пишем “cmd” нажимаем “ОК”. \n\n🤖️ В открывшемся окне пишем команду “_ping 100.104.192.4 -l 1470 -n 100_”. \n\n⚠️ Где 100.104.192.4 Шлюз из настроек в сетевой карте. \n\n🤖️ Ждем “Статистику”. \n\n🤖️ Если в статистике написано, что 0% потерь, по линии все в порядке, если больше 5% потерь нужно обратиться в техническую поддержку по номеру телефона ☎️ *502*. Допустимый процент потерь в сети до 5%.";

// Трасерт

export const tracert =
  "❕ *Команда tracert* – самый популярный инструмент сетевой диагностики. С помощью tracert можно проверить путь запроса к серверу и выявить проблемы, связанные с доступностью удаленного сервера. \n\n🤖️ Подключаем кабель интернета напрямую к компьютеру. Открываем командную строку сочетанием клавиш “Win +R” и в окне “Выполнить” пишем “cmd” нажимаем “ОК”. \n\n🤖️ В открывшемся окне пишем команду “tracert 8.8.8.8”. \n\n🤖️ 8.8.8.8 - это ip адрес Google DNS, вместо него указываете интересующий вас ip или адрес сайте к примеру yandex.ru. \n\n🤖️ Как видно из скриншота маршрут полностью прошел до сервера. Крайний шлюз провайдера  185.248.27.33 это обычно 2 или 3й прыжок как в данном случае т.к. действие производилось через роутер, если маршрут выходит за шлюз и уходит в мир, значит проблема находиться за покрытием провайдера.";

// Настройка интернет соединения IPoE

export const internetSettingIpoe =
  "🤖️ _При подключению по IPoE пользователю не нужно вводить логин и пароль при подключении к интернету_: DHCP-сервер динамически назначает IP-адреса и другую связанную информацию о конфигурации сетевым устройствам. \n\n🤖️ Сведения об IP и MAC при этом прописываются на коммутаторе автоматически. Это позволяет сэкономить ограниченное пространство IP-адресов. При использовании протокола IPoE информационные фреймы не содержат кодировочной информации, поэтому обрабатываются в разы быстрее. \n\n🤖️ IPoE позволяет абонентам перемещаться в любую точку сети и автоматически получать IP-адрес при повторном подключении. *С помощью технологии можно подключать к интернету все устройства в доме: телевизоры, игровые приставки, SmartTV и пр.*\n\n‼️ _Чтобы узнать какой тип подключения используется по вашему адресу позвоните по короткому номеру телефона ☎️ 502_";

// Настройка интрнета на Windows 10

export const internetSettingPppoeWin10 =
  "1️⃣ Нажмите кнопку “Пуск”, перейдите в пункт “Параметры”. \n\n2️⃣ Выбираем пункт “Сеть и Интернет”. \n\n3️⃣ В левом столбце перейдите (� “Набор номера”. \n\n4️⃣ Нажмите на кнопку <Настройка нового подключения>. \n\n5️⃣ Выберите пункт “Подключение к Интернету”, нажмите кнопку <Далее> \n\n6️⃣ Выберите “Высокоскоростное (с PPPoE)” \n\n7️⃣ Система запросит Ваши учётные данные. _Введите логин и пароль, указанные в договоре._ “Имя подключения” можете выставить произвольное. После того как всё введено, нажмите кнопку <Подключить> \n\n8️⃣ Ожидайте, пока пройдет проверка. \n\n9️⃣ Настройка завершена!";

// Настройка интрнета на Windows 7

export const internetSettingPppoeWin7 =
  '1️⃣ Вменю "Пуск" и выберите "Панель управления". \n\n2️⃣ В окне "Настройка параметров компьютера" выберите категорию"Сеть и Интернет". \n\n3️⃣ Далее в открывшемся окне выберите "Центр управления сетM�ми и общим доступом". \n\n4️⃣ Перейдите по ссылки "Настройка нового подключения или сети". \n\n5️⃣ В открывшемся окне выберите вариант "Подключение к Интернету" и нажмите кнопку <Далее>. \n\n6️⃣ В окне "Как выполнить подключение?" выберите тип подключения "Высокоскоростное (с PPPoE)". \n\n7️⃣ Система запросит Ваши учётные данные. _Введите логин и пароль, указанные в договоре._ "Имя подключения" можете выставить произвольное. После того как всё введено, нажмите кнопку <Подключить> \n\n8️⃣ При успешной проверки система уведомит о создании нового подключения. Теперь можно нажать кнопку <Закрыть>. \n\n9️⃣ Настройка завершена!';

// Настрока роутеров

export const routerSettings =
  "🤖️ _Настройка PPPoE на распространеных моделях приведена ниже. Логин и пароль вводить указаный в договоре._\n\n🤖️ Настройка для фирмы [TP-Link](https://avk-wellcom.ru/abonentam/instrukczii/nastrojka-routera-tp-link-tl-wr841n.html) \n\n🤖️ Настройка для фирмы [D-Link](https://penza.dom.ru/service/knowledgebase/instruktsii-po-oborudovaniyu/router__DLink_White_003?utm_referrer=https%3a%2f%2fwww.google.com%2f) \n\n🤖️ Настройка для фирмы [Keenetic](https://help.keenetic.com/hc/ru/articles/360000466959-%D0%9F%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BA-%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82%D1%83-%D0%BF%D0%BE-%D0%BF%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB%D1%83-PPPoE) \n\n🤖️ Настройка для фирмы [Xiaomi](https://help-wifi.com/xiaomi/podklyuchenie-i-nastrojka-xiaomi-mi-wi-fi-router-3/) \n\n🤖️ Настройка для фирмы [Huawei](https://natanet.ru/nastrojka-podklyucheniya-na-routerax-huawei)";

// Настройка АТВ

export const atv =
  "🤖️ *Аналоговое вещание* — это устаревающий, но всё еще распространенный тип телевещания. \n\n🤖️ _Чтобы найти аналоговые каналы:_\n\n  1️⃣ Подключите к телевизору кабель от ТВ-антенны.\n\n  2️⃣ На домашнем экране телевизора нажмите и выберите ⚙️ Настройки устройства → Каналы.\n\n  3️⃣ Откройте Сканировать каналы → Аналоговые и нажмите Автосканирование.\n\n  4️⃣ Телевизор начнёт искать и сохранять аналоговые каналы. Дождитесь завершения сканирования.";

// Настройка DTV

export const dtv =
  "🤖️ *Цифровое ТВ* – это телевидение нового поколения. Оно обеспечивает максимально доступное на сегодня качество сигнала и звука.\n\n🤖️ _Чтобы найти цифровые каналы:_\n\n   1️⃣ На домашнем экране телевизора нажмите и выберите ⚙️ Настройки устройства → Каналы.\n\n    2️⃣ Нажмите Сканировать каналы → Кабельные.\n\n    3️⃣ Выберите способ сканирования:\n\n    🔸 Автосканирование. Телевизор сам переберёт все частоты и найдёт доступные кабельные каналы. Этот способ дольше, но надёжнее, чем ручной поиск.\n\n    🔸 Сканировать вручную. Телевизор просканирует только выбранную вами частоту — её нужно указать в поле Частота на предыдущем экране. Частоты, на которых транслируются кабельные телеканалы:\n\n    ⚙️ Modulation - 256QAM\n\n    ⚙️ Symbol rate - 6875\n\n📡 Частоты:\n\n   58MHz   90MHz   122MHz\n\n    66MHz   98MHz   130MHz\n\n    74MHz   106MHz  138MHz\n\n    82MHz   114MHz  146MHz";

// Настройка IPTV

export const iptv =
  '🤖️ Смотреть IPTV можно традиционно на телевизоре, а также на компьютере, смартфоне или планшете. Разберем настройку на телевизоре:\n\n🤖️ Впервую очередь нужно установить на телевизор плеер, если он у вас не установил производитель телевизора. С Google Play маркета или другого магазина в зависимости от фирмы телевизора устанавливаем плеер которЋй вам понравится.\n\n🤖️ Разберем на примере [IP-TV Player от Александра Софронова](http://iptvremote.blogspot.com/):\n\n    🔸 Запускаем плеер, находим в меню "+ Добавить URL".\n\n    🔸 В поле "Адрес плейлиста" пишим "http://10.10.200.200/playlist.m3u".\n\n   🔸 В "Имя" пишем "Alchevsk.net".\n\n    🔸 Нажимаем "ОК".\n\n🤖️ Скачать [плеер](http://iptvremote.ru/updates/iptv.7.1.5/free/), выберете нужную версию. Обычно подходит [iptv-7.1.5-armv7](http://iptvremote.ru/updates/iptv.7.1.5/free/iptv-7.1.5-armv7.apk)\n\n🤖️ Для абонентов с подключением PPPoE нужно активировать услугу по номеру ☎️ 502, ссылка с ТОКЕНОМ будет в личном кабинете.\n\n🤖️ _Услуга предоставляется БЕСПЛАТНО в тестовом режиме БЕЗ ГАРАНТИИ качества и бесперебойности трансляции!_';

// Раздел ЧаВо:

// ПСБ оплата

export const psbPay =
  '🤖️ Чтобы оплатить услуги интернета, вам потребуется лицевой счет абонента. Узнать можно по короткому номеру ☎️ 502\n\n    🔶 откройте приложение ПСБ\n\n    🔶 перейдите во вкладку “Платежи”\n\n    🔶 в поиске введите “Лугалинк”\n\n    🔶 выбираем появившийся результат Оплата услуг *ООО "Лугалинк" (ИНН 9406007003)*\n\n    🔶 в поле “идентификатор абонента” напишите номер лицевого счета\n\n    🔶 в поле “сумма платежа” ту сумму, которую собираетесь положить на счет\n\n    🔶 Нажимаем “далее” и дожидаетесь код подтверждения операции\n\n🤖️ Подробнее [посмотреть на сайте](https://alchevsk.net.ru/abonents/psbank.php)';

// Оплата через терминал

export const terminalPay =
  "🤖️ Чтобы оплатить услуги интернета, вам потребуется лицевой счет абонента. Узнать можно по короткому номеру ☎️ 502.\n\n   🔶 Для оплаты понадобится терминал Lugapay\n\n    🔶 Среди списка провайдеров находим “Лугалинк”\n\n    🔶 Вводим номер лицевого счета\n\n    🔶 Вносим нужную сумму\n\n⚠️ По возможности, сохраните чек до поступления средств на счет";

// Абоненские отделения

export const abon =
  "🏤 _г.Алчевск, улица Ленина, 86_\n\n\n    📈 График работы:\n\n        🕗 Понедельник-Суббота - с 8-00 до 17-00\n\n        📅 Воскресенье - выходной день\n\n\n  🏤 _г.Перевальск, улица Ленина, 35_\n\n\n      📈 График работы:\n\n        🕗 Понедельник-Пятница - с 9-00 до 17-00\n\n        📅 Суббота-Воскресенье - выходной день\n\n  🏤 _г.Брянка, улица Котовского, 1Б_\n\n\n      📈 График работы:\n\n        🕗 Понедельник-Пятница - с 8-00 до 15-00\n\n        📅 Суббота-Воскресенье - выходной день";

// Сроки выполнения заявок

export const zayavki =
  "🤖 Все заявки выполняются в порядке очереди:\n\n    🔶 на ремонт интернет и телевидения гг. Алчевск, Перевальск, Брянка, Стаханов, Алмазная в течение 72 часов;\n\n   🔶 на ремонт интернет удаленных поселков в течение недели;\n\n    🔶 на подключение новых абонентов к сети Интернет в течение 5 дней.";

// Блокировка/разблокировка тарифов

export const blocktarif =
  "🤖️ Блокировка/разблокировка тарифов возможна только по звонку в техническую поддержку (☎️ 502) с контактного номера телефона или после сверки паспортных данных владельца договора.\n\n🤖️ Вы можете разблокировать свой счет бесплатно один раз в месяц.\n\n🤖️ Срок неоплачиваемой блокировки - до 60-ти суток, позднее – восстановление услуг будет платным.";

// Услуга кредит

export const credit =
  "🤖️ Данная услуга дает возможность подключить интернет на три дня.\n\n🤖️ Услуга станет доступна повторно, после погашения кредита плюс оплаченный день";

//Восстановление услуг

export const vosstanov =
  '🤖 Если с момента последнего выхода в сеть прошло меньше года, для восстановления услуги абоненту нужно:\n\n✅ Подойти с паспортом в любой центр обслуживания абонентов и внести оплату за восстановление услуги в размере 250 рублей + оплата за полный месяц по выбранному тарифному пакету + оплата за услугу "Вызов мастера".\n\n🤖 Если с момента последнего выхода в сеть прошло более года, для восстановления услуги абоненту нужно:\n\n✅ Подойти с паспортом в любой центр обслуживания абонентов и внести оплату за восстановление услуги в размере 250 рублей + предоплата за 50 метров кабеля (в случае, если с кабелем все в порядке и замена не требуется, то все средства останутся на счету) + оплата за полный месяц по выбранному тарифному пакету + оплата за услугу "Вызов мастера".\n\n🤖 Восстановить услугу возможно в телефонном режиме, в случае, если абонент отключен программно! Для этого, абонент должен позвонить в Call-центр на номер 502.\n\n‼️ В случае физического отключения, мастер подойдет в течении 3-х суток с момента обращения и внесения средств.';

//Выделенный IP

export const vIp =
  "🤖 Стоимость услуги «Выделенный IP адрес» составляет 160 рублей и оплачивается дополнительно.\n\n🤖 Снятие средств происходит каждого первого числа месяца до момента отказа от услуги.\n\n🤖 Заказать «Выделенный IP адрес» можно по телефону ☎️ 502 или в Центрах обслуживания абонентов с документом, подтверждающим личность.";

// Оплата через Payberry

export const payberry =
  "🤖 Теперь Вы можете оплатить наши услуги с помощью платёжного сервиса Payberry.\n\n🤖 Это можно сделать в личном кабинете или перейдя на сайт [payberry.ru](https://payberry.ru/pay/6889).\n\n🤖 Оплата принимается с карточек любых банков, комиссия минимальная, а дополнительная регистрация не требуется.\n\n🤖 На сайте [payberry.ru](https://payberry.ru/pay/6889) достаточно ввести свой лицевой счет, сумму и e-⁠mail, а в личном кабинете -⁠ только сумму и e-⁠mail.";