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

    #  {
    #         "id":2295434,
    #         "pageURL":"https://pixabay.com/photos/spring-bird-bird-tit-spring-blue-2295434/",
    #         "type":"photo",
    #         "tags":"spring bird, bird, tit",
    #         "previewURL":"https://cdn.pixabay.com/photo/2017/05/08/13/15/spring-bird-2295434_150.jpg",
    #         "previewWidth":150,
    #         "previewHeight":99,
    #         "webformatURL":"https://pixabay.com/get/g416edbf110f0238569b5131b87b7558e2fee8655c60180dba813233de10ec54c405d9b7a8166e7849eb8c292c1390641771ce846e5c0b7fc2466b2b0ca4d48a4_640.jpg",
    #         "webformatWidth":640,
    #         "webformatHeight":426,
    #         "largeImageURL":"https://pixabay.com/get/gf3a117662b895c235b2500547d4df0882d4cd75a9f5c222fa49b94435f9c3648bb608d1610af37639832def5be8e74f0ea243d0448bcd6b9becd2e7d0e871981_1280.jpg",
    #         "imageWidth":5363,
    #         "imageHeight":3575,
    #         "imageSize":2938651,
    #         "views":346266,
    #         "downloads":176277,
    #         "collections":1590,
    #         "likes":1547,
    #         "comments":173,
    #         "user_id":334088,
    #         "user":"JillWellington",
    #         "userImageURL":"https://cdn.pixabay.com/user/2018/06/27/01-23-02-27_250x250.jpg"
    #     },