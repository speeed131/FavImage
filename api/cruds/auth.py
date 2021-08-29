from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from passlib.context import CryptContext
from jose import JWTError, jwt

from sqlalchemy import select
from sqlalchemy.engine import Result
from api.db import get_db


import api.schemas.auth as auth_schemas
import api.settings as settings
import api.models.model as model
from datetime import datetime, timedelta
from typing import Optional, Any, List


SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = 30


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# @TODO:型をAnyから適切なのに変更する
async def get_users(db: AsyncSession) -> Any:
    result: Result = await db.execute(
        select(model.User)
    )
    return result.all()


async def get_user_from_db(db: AsyncSession, username: str):
    users = await get_users(db)
    for i in range(len(users)):
        if username in users[i].User.username:
            return users[i].User


async def authenticate_user(db: AsyncSession, username: str, password: str):
    user = await get_user_from_db(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(db: AsyncSession = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = auth_schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user_from_db(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: auth_schemas.User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


# @TODO:同じ名前のユーザーの場合、特定のエラーをはき、フロントに返す
async def create_user(
    db: AsyncSession,
    register_data: auth_schemas.UserCreate
) -> model.User:
    user = model.User(
        username = register_data.username,
        hashed_password = get_password_hash(register_data.password),
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user
