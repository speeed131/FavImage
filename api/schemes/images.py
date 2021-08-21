from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel

class Image(BaseModel):
    id: int
    type: str
    tags: str
    preview_url: str
    webformat_url: str
    large_image_url: str
    downloads: int
    likes: int

class ImagesRequest(BaseModel):
    total: int
    totalHits: int
    hits: List[Image]
