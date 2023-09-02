## Создание https-сервера

1. Открыть папку ./json-server в GITBash (т.к. на windows не всегда установлены инструменты для работы с openssl)

2. Находясь в папке ./json-server в GitBash последовательно ввести следующие команды:

```
openssl genrsa -out key.pem
```
Появится сгенерированный ключ в папке ./json-server


Далее:
```
openssl req -new -key key.pem -out csr.pem
```
Будет предложено ввести ряд данных.
Ввели только страну RU
Провинцию Saint-Petersburg
И город Saint-Petersburg

Далее:
```
openssl req -new -key key.pem -out csr.pem
```
Вроде бы, создает приватную часть ключа

Далее 