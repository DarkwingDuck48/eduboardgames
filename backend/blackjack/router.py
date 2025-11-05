from typing import Any, Dict

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

router = APIRouter(prefix='/blackjack')
"""
POST /api/blackjack/start - начало игры
POST /api/blackjack/hit   - получение новой карты
POST /api/blackjack/stand - подсчет результатов

"""

CARD_VALUES = {
    'A': 11,
    'K': 10,
    'Q': 10,
    'J': 10,
    '10': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
}
CARD_SUITS = ['hearts', 'spades', 'diamonds', 'clubs']


playerCardsCache = []
dealerCardsCache = []


@router.post('/start')
def start() -> JSONResponse:
    playerCardsCache = [
        {'value': 'A', 'suit': 'hearts', 'points': 11},
        {'value': '10', 'suit': 'hearts', 'points': 10},
    ]
    dealerCardsCache = [
        {'value': 'K', 'suit': 'diamonds', 'points': 10},
        {'value': '?', 'suit': '?', 'points': 0},
    ]
    moskCards = {
        'playerCards': playerCardsCache,
        'playerScore': 21,
        'dealerCards': dealerCardsCache,
        'dealerScore': 10,
    }
    return JSONResponse(status_code=200, content=moskCards)


@router.post('/hit')
def hit(data: Dict[str, Any] = Body()) -> JSONResponse:
    print(data)
    moskCards = {
        'playerCards': playerCardsCache,
        'playerScore': 26,
        'gameOver': True,
        'message': 'Перебор! Вы проиграли.',
    }
    return JSONResponse(status_code=200, content=moskCards)


@router.post('/stand')
def stand(data: Dict[str, Any] = Body()) -> JSONResponse:
    dealerCards = {
        'dealerCards': [
            {'value': 'K', 'suit': 'diamonds', 'points': 10},
            {'value': '8', 'suit': 'spades', 'points': 0},
        ],
        'dealerScore': 18,
        'gameOver': True,
        'message': 'Вы выиграли! Дилер набрал 18 очков.',
    }
    return JSONResponse(status_code=200, content=dealerCards)
