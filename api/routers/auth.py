from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import api.cruds.auth as auth_cruds
import api.schemas.auth as auth_schemas
# import api.routers.auth  as

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/register")
def register():
    # [バックエンド] ユーザー登録できる
    pass

@router.post("/login")
def login():
    # [バックエンド] ログインできる。
    pass

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "password": "secret",
        "disabled": False,
    },
}

# def fake_hash_password(password: str):
#     return "fakehashed" + password

@router.get("/items/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = auth_schemas.User(**user_dict)
    password = form_data.password
    if not password == user.password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    # 仕様によりaccess_tokenと token_type を含むJSONを返す必要があります
    return {"access_token": user.username, "token_type": "bearer"}



@router.get("/users/me")
async def read_users_me(current_user: auth_schemas.User = Depends(auth_cruds.get_current_active_user)):
    return current_user