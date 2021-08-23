from sqlalchemy import Column, Integer, String, ForeignKey, CHAR
from sqlalchemy.orm import relationship

from api.db import Base

#@FIX:リファクタそれぞれのモデルファイルを定義する
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(255), nullable=False)
    hashed_password = Column(CHAR(60), nullable=False)

    favorite_image = relationship("FavoriteImage", back_populates="user")


class FavoriteImage(Base):
    __tablename__ = "favorite_images"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    image_id = Column(Integer)
    type = Column(String(500))
    tags = Column(String(500))
    page_url = Column(String(500))
    preview_url = Column(String(500))
    webformat_url = Column(String(500))
    large_image_url = Column(String(500))
    downloads = Column(String(500))
    likes = Column(Integer)

    user = relationship("User", back_populates="favorite_image")

