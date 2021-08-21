from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel


class FavImageSave(BaseModel):
    image_id: int
    type: str
    tags: str
    preview_url: str
    webformat_url: str
    large_image_url: str
    downloads: int
    likes: int

class FavImageResponse(BaseModel):
    id: str
