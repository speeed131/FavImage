from fastapi import FastAPI
from api.routers import auth, fav, images

app = FastAPI()
app.include_router(auth.router)
app.include_router(fav.router)
app.include_router(images.router)

