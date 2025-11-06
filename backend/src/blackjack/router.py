from typing import Any, Dict

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

from src.blackjack.logic import start_hand

router = APIRouter(prefix='/blackjack')

"""
POST /api/blackjack/start - начало игры
POST /api/blackjack/hit   - получение новой карты
POST /api/blackjack/stand - подсчет результатов

"""


@router.post('/start')
def start() -> JSONResponse:
    moskCards = start_hand()
    return JSONResponse(status_code=200, content=moskCards)


@router.post('/hit')
def hit(data: Dict[str, Any] = Body()) -> JSONResponse:
    print(data)
    moskCards = {
        'playerCards': [
            {'value': 'A', 'suit': 'hearts', 'points': 11},
            {'value': '10', 'suit': 'hearts', 'points': 10},
            {'value': '5', 'suit': 'hearts', 'points': 5},
        ],
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
