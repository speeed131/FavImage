from typing import List, Tuple, Callable, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result



import api.models.model as model
import api.schemas.fav as schemas_fav


import api.settings as settings

API_KEY = settings.API_KEY


async def create_favorite_image(
   db: AsyncSession, favorite_image: schemas_fav.FavoriteImage
) -> model.FavoriteImage:
    favorite_image = model.FavoriteImage(**favorite_image.dict())
    db.add(favorite_image)
    await db.commit()
    await db.refresh(favorite_image)
    return favorite_image


async def read_user_favorite_images(
    db: AsyncSession
) -> List[schemas_fav.FavoriteImage]:
    # @TODO:ログインユーザーのIDを取得する
    result: Result = await (
        db.execute(
            select(
                model.FavoriteImage.id,
                model.FavoriteImage.user_id,
                model.FavoriteImage.id.isnot(None).label("done"),
            ).outerjoin(model.Done)
        )
    )
    return result.all()