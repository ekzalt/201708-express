
English

About this project

I wrote this server on Node.js, and using the Express framework.
To stylize page layout, I used the Bootstrap framework.
For data storage, I used the MongoDB database + Mongoose.

Server Features:

1) /news
Upon request from the user, the server downloads and parses news from two sites - "Habrahabr" and "Geektimes".
Next, the server gives to client a list of news in a structured form (JSON).
Page layout is dynamically generated on the client side by javascript.
If the download of news comes from the site "TM Feed", the server processes the error.
Client javascript also knows how to handle query errors.

2) /todo
I wrote a ToDo application that returns a list of tasks.
The application allows the user to add, edit, delete a task.
The layout of this page is generated on the server side by the EJS template engine.
To store tasks, I connected the MongoDB database.
Working with the database is not directly, but through Mongoose schemas.

Future plans:
  - make a copy of this server with a relational database (SQL), which will work through the module Sequelize,
  - add registration and authorization (/signin, /login, /logout),
  - add support for user sessions,
  - /todo will be available only to registered users,
  - each user will have his own personal task list.

--------------------------------------------------------------------------

Russian

Об этом проекте

Я написал этот сервер на Node.js, и с помощью фреймворка Express.
Для стилизации разметки страниц я использовал фреймворк Bootstrap.
Для хранения данных я использовал базу даных MongoDB + Mongoose.

Возможности сервера:

1) /news
Сервер по запросу от пользователя загружает и парсит новости с двух сайтов - "Хабрахабр" и "Geektimes".
Далее сервер отдает клиенту список новостей в структурированном виде (JSON).
Разметка страницы динамически генерируется на клиенте с помощью javascript.
При загрузке новостей с сайта "TM Feed" сервер обрабатывает ошибку.
Клиент также умеет обрабатывать ошибки запросов.

2) /todo
Я написал ToDo приложение, которое возвращает список задач.
Приложение позволяет пользователю добавлять, редактировать, удалять задачу.
Разметка этой страницы генерируется на сервере с помощью шаблонизатора EJS.
Для хранения задач я подключил базу данных MongoDB.
Работа с базой данных происходит не напрямую, а через Mongoose.

Планы на будущее:
 - сделать копию этого сервера с реляционной базой данных (SQL), которая будет работать через модуль Sequelize,
 - добавить регистрацию и авторизацию (/signin, /login, /logout),
 - добавить поддержку сессий пользователей,
 - /todo будет доступна только зарегистрированным пользователям,
 - у каждого пользователя будет свой личный список задач.
