# Курсы про ИИ

Сайт курсы-про-ии.рф: главная, курсы, программа ChatGPT для работы, конструктор занятий и страница автора.

Исходники: https://github.com/haih-net/kursy-pro-ii.rf. Основа website-template от `be942bb`, история сохранена, обновления доступны через upstream.

## Разработка

Node.js 22.22.3, зависимости закреплены в package-lock.json.

```bash
npm ci --no-audit --no-fund
npm run dev
```

Локальный адрес: http://localhost:3201. Проверки: `npm run types`, `npm test`, `npm run lint`. Production: `npm run build`, затем `PORT=3202 npm start`.

Собственные страницы и оформление находятся в app/Custom, маршруты — app/routes. Четыре публичные страницы включены в sitemap и открыты для индексации. Страница владельца и ошибки остаются noindex.

## Публикация

Сервер 159.194.244.220, каталог /www/kursy-pro-ii/repo. Общие Traefik, Varnish и мониторинг; отдельный контейнер app из production-образа, собранного вне сервера. Конфигурации, версия, проверки и возврат ведутся в Wiki marketing: servers/ии-поддержка-сайта.рф/sites/kursy-pro-ii и странице deployment этого сервера.

Форма отправляет заявки на n.lanets@freecode.academy. Для доставки поддерживаются серверные COURSE_SMTP_HOST, COURSE_SMTP_PORT, COURSE_SMTP_USER, COURSE_SMTP_PASSWORD и COURSE_MAIL_FROM. Успешная доставка через production SMTP пока не подтверждена. Секреты передаются через внешний app.env и не включаются в образ.
