from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from blackjack import blackjack_router

app = FastAPI(root_path='/api')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
    expose_headers=['Content-Disposition'],
)

app.include_router(blackjack_router)
