# 201708-express (English)

## About this project

I wrote this server on [Node.js](https://nodejs.org/en/), and using the [Express](http://expressjs.com/) framework.
To stylize page layout, I used the [Bootstrap](https://getbootstrap.com/docs/3.3/) framework.
To add authorization to the site and user sessions, I used [express-session](https://github.com/expressjs/session) + [Passport](http://passportjs.org/).

For data storage, I used 2 databases:
  - [MongoDB](https://www.mongodb.com/) + [Mongoose](http://mongoosejs.com/),
  - [MySQL](https://dev.mysql.com/) + [Sequelize](http://docs.sequelizejs.com/).
You can easily switch between them.

## Server Features

  - Registration and authorization added!
  - Support user sessions!
  - ToDo is available only to registered users!
  - Each user has his own personal task list!

### /news

Upon request from the user, the server downloads and parses news from two sites: [Habrahabr](https://habrahabr.ru/) and [Geektimes](https://geektimes.ru/).
Next, the server gives to client a list of news in a structured form (JSON).
Page layout is dynamically generated on the client side by javascript.
If the download of news comes from the site [TM Feed](https://tmfeed.ru/popular/day/), the server processes the error.
Client javascript also knows how to handle query errors.

### /todo

I wrote a ToDo application that returns a list of tasks.
The application allows the user to add, edit, delete a task.
The layout of this page is generated on the server side by the [EJS](https://www.npmjs.com/package/ejs) template engine.

--------------------------------------------------------------------------

# 201708-express (Russian)

## Об этом проекте

Я написал этот сервер на [Node.js](https://nodejs.org/en/), и с помощью фреймворка [Express](http://expressjs.com/).
Для стилизации разметки страниц я использовал фреймворк [Bootstrap](https://getbootstrap.com/docs/3.3/).
Для добавления авторизации на сайте и сессий пользователей я использовал [express-session](https://github.com/expressjs/session) + [Passport](http://passportjs.org/)

Для хранения данных я использовал 2 базы даных:
  - [MongoDB](https://www.mongodb.com/) + [Mongoose](http://mongoosejs.com/),
  - [MySQL](https://dev.mysql.com/) + [Sequelize](http://docs.sequelizejs.com/).
Вы можете легко переключаться между ними.

## Особенности сервера

  - Добавлена регистрация и авторизация!
  - Добавлены сессии пользователей!
  - ToDo доступна только зарегистрированным пользователям!
  - У каждого пользователя свой личный список задач!

### /news

Сервер по запросу от пользователя загружает и парсит новости с двух сайтов: [Habrahabr](https://habrahabr.ru/) и [Geektimes](https://geektimes.ru/).
Далее сервер отдает клиенту список новостей в структурированном виде (JSON).
Разметка страницы динамически генерируется на клиенте с помощью javascript.
При загрузке новостей с сайта [TM Feed](https://tmfeed.ru/popular/day/) сервер обрабатывает ошибку.
Клиент также умеет обрабатывать ошибки запросов.

### /todo

Я написал ToDo приложение, которое возвращает список задач.
Приложение позволяет пользователю добавлять, редактировать, удалять задачу.
Разметка этой страницы генерируется на сервере с помощью шаблонизатора [EJS](https://www.npmjs.com/package/ejs).
