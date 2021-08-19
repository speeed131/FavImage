from fastapi import APIRouter

router = APIRouter()

@router.get("/images")
def get_images_at_random():
    # [バックエンド] 画像をランダムに10枚取得する
    pass

@router.get("/images/{image_id}")
def get_image_detail():
    # [バックエンド] 画像の詳しい情報を取得できる
    pass

@router.get("/images/{category_name}")
def get_images_by_category():
    # [バックエンド] ジャンルを指定し、画像をランダムに10枚取得できる
    pass

@router.post("/images")
def post_images():
    #  [バックエンド] 画像を1枚もしくは複数お気に入り登録できる
    pass

