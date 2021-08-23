from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel
from api.schemas.images import Image


class FavoriteImage(Image):
    user_id: int

class FavoriteImageResponse(BaseModel):
    id: int
    class Config:
        orm_mode = True

class DeleteFavoriteImageResponse(FavoriteImageResponse):
    pass