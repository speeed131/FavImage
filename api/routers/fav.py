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
