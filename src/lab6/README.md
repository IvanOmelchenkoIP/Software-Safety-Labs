# Лабораторна робота 46

## Оригінальний репозиторій

https://github.com/Kreolwolf1/auth_examples/tree/main/token_auth

## Тема

Засвоювання базових навичок роботи з OAuth2 протоколом

## Завдання

Розширити Лабораторну роботу 4, змінивши логін сторінку на стандартну від SSO провайдера, для цього, треба зробити редірект на API_DOMAIN https://kpi.eu.auth0.com/authorize та додатково додати параметри Вашого аплікейшена client_id, redirect_uri, response_type=code, response_mode=query https://kpi.eu.auth0.com/authorize?client_id=JIvCO5c2IBHlAe2patn6l6q5H35qxti0&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&response_mode=query. Надати код рішення.

Для отримання додаткового балу: додатково розшири аплікайшен обробкою редіректа та отриманням юзер токена за допомогою code grant type. https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow