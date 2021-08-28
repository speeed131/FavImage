from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

class User(BaseModel):
    # id: int
    username: str
    email: Optional[str]
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
