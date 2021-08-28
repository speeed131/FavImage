from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

class User(BaseModel):
    # id: int
    username: str
    email: Optional[str]
    password: str