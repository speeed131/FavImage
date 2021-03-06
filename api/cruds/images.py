from typing import List, Tuple, Callable, Any
import re
import requests
import json
import random

import api.schemas.images as images_schema
import api.settings as settings
import api.schemas.images as images_schemas


# from sqlalchemy import select
# from sqlalchemy.engine import Result


API_KEY = settings.API_KEY


def fetch_images_from_pixabay():
    url = "https://pixabay.com/api/"
    page = random.randint(1, 50)
    #@TODO: ランダム性を後で考える必要あり
    # rand = random.random()
    # category = ["backgrounds", "fashion", "nature",
    #             "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"]
    # q = ["summer", "sky", "travel", "places", "nature", "buildings", "animals"]
    # 12738でmusicが一番少なそう
    # 13257でeductation

    payload = {"key": API_KEY, "q": "", "per_page": 10, "page": page, "min_width": 640}

    try:
        data: images_schema.ImagesResponseForApi = requests.get(url, params=payload).json()
        make_data = []
        images_data = data["hits"]
        for i in images_data:
            make_data.append(dict(
                image_id=i["id"],
                type=i["type"],
                tags=i["tags"],
                page_url=i["pageURL"],
                preview_url=i["previewURL"],
                webformat_url=i["webformatURL"],
                large_image_url=i["largeImageURL"],
                downloads=i["downloads"],
                likes=i["likes"]
            ))
        return make_data
    except:
        print("could not fetch images data")


# ＠TODO:ここにimage_idに基づいたdataを取ってくるものを書く。＝ 画像詳細と同じ
def fetch_image_data_by_image_id(image_id: int) -> images_schemas.Image:
    url = "https://pixabay.com/api/"

    payload = {"key": API_KEY, "id": image_id}

    try:
        data: images_schema.ImagesResponseForApi = requests.get(url, params=payload).json()
        make_data = []
        images_data = data["hits"]
        for i in images_data:
            make_data.append(dict(
                image_id=i["id"],
                type=i["type"],
                tags=i["tags"],
                page_url=i["pageURL"],
                preview_url=i["previewURL"],
                webformat_url=i["webformatURL"],
                large_image_url=i["largeImageURL"],
                downloads=i["downloads"],
                likes=i["likes"]
            ))
        return make_data
    except:
        print("could not fetch images data")