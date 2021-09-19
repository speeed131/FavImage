
# .env ファイルをロードして環境変数へ反映
from dotenv import load_dotenv
load_dotenv()
# 環境変数を参照
import os

API_KEY = os.getenv("API_KEY")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
