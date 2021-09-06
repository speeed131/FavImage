from typing import Any, List
from fastapi import APIRouter, Depends

import api.schemas.images as images_schema
import api.cruds.images as images_cruds
import api.schemas.auth as auth_schemas
import api.cruds.auth as auth_cruds


router = APIRouter()

@router.get("/images", response_model=List[images_schema.Image])
def get_images_at_random(
    current_user: auth_schemas.User = Depends(auth_cruds.get_current_user)
):
    # [バックエンド] 画像をランダムに10枚取得する
    return images_cruds.fetch_images_from_pixabay()

@router.get("/images/{image_id}", response_model=images_schema.Image)
def get_image_detail():
    # [バックエンド] 画像の詳しい情報を取得できる
    
    # １,画像をapiを使って取得する
    # ２，取得した画像を返す処理
    pass

@router.get("/images/{category_name}", response_model=List[images_schema.Image])
def get_images_by_category():
    # [バックエンド] ジャンルを指定し、画像をランダムに10枚取得できる
    
    # １,画像をapiを使って取得する
    # ２，取得した画像一覧を返す処理
    pass
