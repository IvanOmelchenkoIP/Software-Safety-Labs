# Лабораторна робота 2

## Тема

Засвоювання базових навичок OAuth2 авторизаційного протокола.

## Завдання

1) Використовуючи наведені налаштування, створити запит на отримання токену через client_credential grant https://auth0.com/docs/api/authentication#client-credentials-flow 

	curl --request POST \ 
	--url 'https://YOUR_DOMAIN/oauth/token' \ 
	--header 'content-type: application/x-www-form-urlencoded' \ 
	--data 'audience=API_IDENTIFIER&grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET'
	
	**Domain:** kpi.eu.auth0.com
	**ClientID:** JIvCO5c2IBHlAe2patn6l6q5H35qxti0
	**Client Secret:** ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB
	**Audience:** https://kpi.eu.auth0.com/api/v2
	
2) Створити юзера з власним email в системі використовуючи метод https://auth0.com/docs/api/management/v2#!/Users/post_users та отриманий токен

Для отримання додаткового балу – зробити власний акаунт в auth0 https://auth0.com/. Створити application та запити описані вище вже використовуючи власні налаштування. Детальну інформацію розбирали на практичному завданні.