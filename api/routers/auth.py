from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

import api.settings as settings
import api.cruds.auth as auth_cruds
import api.schemas.auth as auth_schemas
from datetime import datetime, timedelta
from typing import Any, List

from api.db import get_db


# import api.routers.auth  as

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

ACCESS_TOKEN_EXPIRE_MINUTES = 30

@router.post("/register")
def register():
    # [バックエンド] ユーザー登録できる
    pass

# ログイン機能
@router.post("/token", response_model=auth_schemas.Token)
async def login_for_access_token(
        db: AsyncSession = Depends(get_db),
        form_data: OAuth2PasswordRequestForm = Depends()
):
    # DBから取得
    user = await auth_cruds.authenticate_user(
        db, form_data.username, form_data.password)
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


@router.get("/users/me", response_model=auth_schemas.UserInDB)
async def read_users_me(current_user: auth_schemas.User = Depends(auth_cruds.get_current_active_user)):
    return current_user


# @TODO:型をAnyから適切なのに変更する
@router.get("/users", response_model=Any)
async def read_users(db: AsyncSession = Depends(get_db)):
    return await auth_cruds.get_users(db)
