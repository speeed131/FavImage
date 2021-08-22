from typing import Any, List
from fastapi import APIRouter

import api.schemes.images as images_schema
import api.cruds.images as images_cruds

router = APIRouter()

@router.get("/images", response_model=Any)
def get_images_at_random():
    # [バックエンド] 画像をランダムに10枚取得する

    # １，画像をapiを使ってランダムに取得する処理
    return images_cruds.get_images_at_random()
    # どうやってランダム性を担保するか？
    # ２，取得した画像を一覧を返す処理

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
