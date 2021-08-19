from fastapi import APIRouter

router = APIRouter()

@router.post("/register")
def register():
    # [バックエンド] ユーザー登録できる
    pass

@router.post("/login")
def login():
    # [バックエンド] ログインできる。
    pass

