from api.cruds.fav import create_favorite_image
from typing import Any, List, Optional
from fastapi import APIRouter, Depends
import api.schemas.images as images_schemas
import api.schemas.fav as fav_schemas
import api.cruds.fav as fav_cruds
from sqlalchemy.ext.asyncio import AsyncSession
import api.cruds.auth as auth_cruds
import api.schemas.auth as auth_schemas



from api.db import get_db



router = APIRouter()

@router.post("/fav/images", response_model=fav_schemas.FavoriteImageResponse)
async def post_fav_image(
    image_body: fav_schemas.FavoriteImage,
    db: AsyncSession = Depends(get_db),
    current_user: auth_schemas.User = Depends(auth_cruds.get_current_user)
    ):
#  [バックエンド] 画像を1枚お気に入り登録できる
    return await fav_cruds.create_favorite_image(db, image_body)

@router.get("/fav/images", response_model=Any) #@TODO:Anyを適切な型に修正
async def get_fav_images(
    db: AsyncSession = Depends(get_db),
    current_user: auth_schemas.User = Depends(auth_cruds.get_current_user)
):
    # -[バックエンド] お気に入り登録した画像を一覧で取得できる
    user_id: int = current_user.id
    return await fav_cruds.read_favorite_images_by_user(db, user_id)

@router.delete("/fav/images", response_model=fav_schemas.DeleteFavoriteImageResponse)
def delete_fav_images():
    # [バックエンド] お気に入り登録した画像を削除できる
    pass

@router.get("/fav/images/{category_name}", response_model=List[images_schemas.Image])
def get_fav_images_by_category_name():
    # - [バックエンド] お気に入り登録した画像のジャンル別で取得できる
    pass
