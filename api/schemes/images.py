from typing import List, Optional

from pydantic import BaseModel



class Image(BaseModel):
    image_id: int
    type: Optional[str]
    tags: Optional[str]
    page_url: str
    preview_url: str
    webformat_url: str
    large_image_url: str
    downloads: int
    likes: int

class ImagesResponseForApi(BaseModel):
    total: int
    totalHits: int
    hits: List[Image]
