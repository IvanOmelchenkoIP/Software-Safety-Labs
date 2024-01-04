# Лабораторна робота 3

## Тема

Засвоювання базових навичок OAuth2 авторизаційного протокола.

## Завдання

1) Використовуючи наведені налаштування з лабораторної роботи 2 зробити запит на отримання user token (попередньо створенного в лабораторній работі 2) https://auth0.com/docs/api/authentication?javascript#resource-owner-password 
	
	POST https://YOUR_DOMAIN/oauth/token Content-Type: application/x-www-form-urlencoded audience=API_IDENTIFIER&grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET
	
2) Отримати оновлений токен використовуючи refresh-token grant type https://auth0.com/docs/api/authentication?javascript#refresh-token. Надати скріншоти та отримані токени.

Для отримання додаткового балу: зробити запит до API для зміни пароля https://auth0.com/docs/authenticate/database-connections/password-change#directly-set-the-new-password. Токен має бути використаний з прикладу client_credential grant прикладу