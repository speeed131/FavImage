# .env ファイルをロードして環境変数へ反映
from dotenv import load_dotenv
load_dotenv()
# 環境変数を参照
import os

API_KEY = os.getenv("API_KEY")
