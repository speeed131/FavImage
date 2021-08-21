from fastapi import APIRouter

import api.schemes.images as images_schema

router = APIRouter()

@router.get("/images", response_model=images_schema.ImagesRequest)
def get_images_at_random():
    # [バックエンド] 画像をランダムに10枚取得する
    # return [images_schema.Image]
    pass

@router.get("/images/{image_id}")
def get_image_detail():
    # [バックエンド] 画像の詳しい情報を取得できる
    pass

@router.get("/images/{category_name}")
def get_images_by_category():
    # [バックエンド] ジャンルを指定し、画像をランダムに10枚取得できる
    pass
