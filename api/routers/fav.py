from api.cruds.fav import create_favorite_image
from typing import List
from fastapi import APIRouter, Depends
import api.schemas.images as images_schema
import api.schemas.fav as fav_schema
from sqlalchemy.ext.asyncio import AsyncSession

from api.db import get_db



router = APIRouter()

@router.post("/fav/images", response_model=fav_schema.FavoriteImageResponse)
async def post_fav_image(
    image_body: fav_schema.FavoriteImage, 
    db: AsyncSession = Depends(get_db)
    ):
    #  [バックエンド] 画像を1枚お気に入り登録できる
    # 1,image_bodyの画像をDBに保存する
    # 2,dbから返却されたidを返す。
    # image_body({
    #     	        "id": 195893,
    #              "user_id": 5,
    #     "pageURL": "https://pixabay.com/en/blossom-bloom-flower-195893/",
    #     "type": "photo",
    #     "tags": "blossom, bloom, flower",
    #     "previewURL": "https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg"
    #     "previewWidth": 150,
    #     "previewHeight": 84,
    #     "webformatURL": "https://pixabay.com/get/35bbf209e13e39d2_640.jpg",
    #     "webformatWidth": 640,
    #     "webformatHeight": 360,
    #     "largeImageURL": "https://pixabay.com/get/ed6a99fd0a76647_1280.jpg",
    #             "downloads": 6439,
    #     "likes": 5,
    # })
    return await create_favorite_image(db, image_body)


@router.get("/fav/images", response_model=List[images_schema.Image])
def get_fav_images():
    # -[バックエンド] お気に入り登録した画像を一覧で取得できる
    pass

@router.delete("/fav/images", response_model=fav_schema.DeleteFavoriteImageResponse)
def delete_fav_images():
    # [バックエンド] お気に入り登録した画像を削除できる
    pass

@router.get("/fav/images/{category_name}", response_model=List[images_schema.Image])
def get_fav_images_by_category_name():
    # - [バックエンド] お気に入り登録した画像のジャンル別で取得できる
    pass
