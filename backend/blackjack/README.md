# Реализация игры БлэкДжек на FastAPI и ReactJS

Обозначения мастей карт -

hearts - Червы
spades - Пики
diamonds - Бубны
clubs - Трефы

## Методы, которые надо реализовать

### POST /api/blackjack/start

Пример ответа на запрос из бэкенда:

``` json
{
  "playerCards": [
    { "value": "A", "suit": "hearts", "points": 11 },
    { "value": "10", "suit": "hearts", "points": 10 }
  ],
  "playerScore": 21,
  "dealerCards": [
    { "value": "K", "suit": "diamonds", "points": 10 },
    { "value": "?", "suit": "?", "points": 0 } // вторая карта дилера скрыта
  ],
  "dealerScore": 10
}
```

### POST /api/blackjack/hit

Пример ответа на запрос из бэкенда:

``` json
{
  "playerCards": [
    // обновленный массив карт игрока
  ],
  "playerScore": 25, // обновленное количество очков
  "gameOver": true, // true если перебор
  "message": "Перебор! Вы проиграли."
}
```

### POST /api/blackjack/stand

Пример ответа на запрос из бэкенда:

``` json
{
  "dealerCards": [
    // полный массив карт дилера
  ],
  "dealerScore": 18,
  "gameOver": true,
  "message": "Вы выиграли! Дилер набрал 18 очков."
}
```
