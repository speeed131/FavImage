from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, Field
from api.schemas.images import Image


class FavoriteImage(Image):
    user_id: int = Field(example=1)
    class Config:
        orm_mode = True

class FavoriteImageResponse(BaseModel):
    id: int
    class Config:
        orm_mode = True

class DeleteFavoriteImageResponse(FavoriteImageResponse):
    pass