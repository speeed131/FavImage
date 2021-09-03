from typing import List, Tuple, Callable, Optional, Any
from sqlalchemy import select
from sqlalchemy.sql.functions import user
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result

import api.cruds.auth as auth_cruds
import api.models.model as model
import api.schemas.fav as fav_schemas
import api.schemas.auth as auth_schemas


import api.settings as settings

API_KEY = settings.API_KEY


async def create_favorite_image(
   db: AsyncSession, favorite_image: fav_schemas.FavoriteImage
) -> model.FavoriteImage:
    favorite_image = model.FavoriteImage(**favorite_image.dict())
    db.add(favorite_image)
    await db.commit()
    await db.refresh(favorite_image)
    return favorite_image


async def read_favorite_images_by_user(
    db: AsyncSession,
    user_id: int
) -> model.FavoriteImage:
    #@TODO:Anyを適切な型に修正
    result: Result = await db.execute(
        select(model.FavoriteImage).filter(model.FavoriteImage.user_id == user_id)
        )
    return result.all()
