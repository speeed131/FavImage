from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import api.settings as settings
import api.cruds.auth as auth_cruds
import api.schemas.auth as auth_schemas
from datetime import datetime, timedelta

# import api.routers.auth  as

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES



@router.post("/register")
def register():
    # [バックエンド] ユーザー登録できる
    pass

@router.post("/login")
def login():
    # [バックエンド] ログインできる。
    pass

# @TODO:後に変更する
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    },
}

# def fake_hash_password(password: str):
#     return "fakehashed" + password

@router.get("/items/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}

@router.post("/token", response_model=auth_schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = auth_cruds.authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_cruds.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me", response_model=auth_schemas.User)
async def read_users_me(current_user: auth_schemas.User = Depends(auth_cruds.get_current_active_user)):
    return current_user


