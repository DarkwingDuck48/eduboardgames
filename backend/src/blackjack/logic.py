import random

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


def random_card():
    value = random.choice(list(CARD_VALUES.items()))
    suit = random.choice(CARD_SUITS)
    card = {'value': value[0], 'suit': suit, 'points': value[1]}
    return card


def start_hand():
    cards = [random_card(), random_card(), random_card()]
    moskCards = {
        'playerCards': [cards[0], cards[1]],
        'playerScore': cards[0]['points'] + cards[1]['points'],
        'dealerCards': [
            cards[2],
            {'value': '?', 'suit': '?', 'points': 0},
        ],
        'dealerScore': cards[2]['points'],
    }
    return moskCards
