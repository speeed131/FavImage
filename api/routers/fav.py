from fastapi import APIRouter

router = APIRouter()

@router.get("/fav/images")
def get_fav_images():
    # -[バックエンド] お気に入り登録した画像を一覧で取得できる
    pass

@router.delete("/fav/images")
def delete_fav_images():
    # [バックエンド] お気に入り登録した画像を削除できる
    pass

@router.get("/fav/images/{category_name}")
def get_fav_images_by_category_name():
# - [バックエンド] お気に入り登録した画像のジャンル別で取得できる
    pass
