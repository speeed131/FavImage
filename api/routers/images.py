from typing import List
from fastapi import APIRouter

import api.schemes.images as images_schema

router = APIRouter()

@router.get("/images", response_model=List[images_schema.Image])
def get_images_at_random():
    # [バックエンド] 画像をランダムに10枚取得する

    # １，画像をapiを使ってランダムに取得する処理
    # どうやってランダム性を担保するか？
    # ２，取得した画像を一覧を返す処理
    pass

@router.get("/images/{image_id}", response_model=images_schema.Image)
def get_image_detail():
    # [バックエンド] 画像の詳しい情報を取得できる
    
    # １,画像をapiを使って取得する
    # ２，取得した画像を返す処理
    pass

@router.get("/images/{category_name}")
def get_images_by_category():
    # [バックエンド] ジャンルを指定し、画像をランダムに10枚取得できる
    
    # １,画像をapiを使って取得する
    # ２，取得した画像一覧を返す処理
    pass
