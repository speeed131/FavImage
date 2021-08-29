from sqlalchemy import Column, Integer, String, ForeignKey, CHAR
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Boolean

from api.db import Base

#@FIX:リファクタそれぞれのモデルファイルを定義する
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(255), nullable=False, unique=True)
    email = Column(String(255))
    hashed_password = Column(CHAR(60), nullable=False)
    disabled = Column(Boolean, default=False)

    favorite_image = relationship("FavoriteImage", back_populates="user")


class FavoriteImage(Base):
    __tablename__ = "favorite_images"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    image_id = Column(Integer, nullable=False)
    type = Column(String(500))
    tags = Column(String(500))
    page_url = Column(String(500), nullable=False)
    preview_url = Column(String(500), nullable=False)
    webformat_url = Column(String(500), nullable=False)
    large_image_url = Column(String(500))
    downloads = Column(String(500))
    likes = Column(Integer)

    user = relationship("User", back_populates="favorite_image")

