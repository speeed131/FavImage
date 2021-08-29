from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, Field

class User(BaseModel):
    id: int
    username: str
    email: Optional[str]
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str
    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str = Field(example="daiki")
    password: str = Field(example="hirose")

class UserResponse(BaseModel):
    id: int
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
