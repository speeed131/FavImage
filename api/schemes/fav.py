from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel
from api.schemes.images import Image


class FavoriteImage(Image):
    pass

class FavoriteImageResponse(BaseModel):
    id: int
    class Config:
        orm_mode = True

class DeleteFavoriteImageResponse(FavoriteImageResponse):
    pass