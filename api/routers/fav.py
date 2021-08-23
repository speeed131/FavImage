from typing import List
from fastapi import APIRouter
import api.schemes.images as images_schema
import api.schemes.fav as fav_schema


router = APIRouter()

@router.post("/fav/images", response_model=fav_schema.FavoriteImageResponse)
def post_fav_image(image_body: fav_schema.FavoriteImage):
    #  [バックエンド] 画像を1枚お気に入り登録できる
    
    # 1,image_bodyの画像をDBに保存する
    # 2,dbから返却されたidを返す。
    return fav_schema.FavoriteImageResponse(id=1, **image_body.dict())


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
