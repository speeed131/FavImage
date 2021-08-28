from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer

from api.routers import auth, fav, images

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()
app.include_router(auth.router)
app.include_router(fav.router)
app.include_router(images.router)

