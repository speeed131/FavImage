from typing import List, Tuple, Callable, Any
import re
import requests
import json
import random

# coding: UTF-8
import api.settings as settings

# from sqlalchemy import select
# from sqlalchemy.engine import Result


API_KEY = settings.API_KEY


def get_images_at_random():
    url = "https://pixabay.com/api/"
    page = random.randint(1, 50)
    # rand = random.random()
    # category = ["backgrounds", "fashion", "nature",
    #             "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"]
    # q = ["summer", "sky", "travel", "places", "nature", "buildings", "animals"]
    # 12738でmusicが一番少なそう
    # 13257でeductation

    payload = {"key": API_KEY, "q": "", "per_page": 10, "page": page, "category": ""}

    try:
        data = requests.get(url, params=payload).json()
        make_data = []
        print(data["total"])
        images_data = data["hits"]
        for i in images_data:
            make_data.append(dict(
                image_id=i["id"],
                type=i["type"],
                preview_url=i["previewURL"],
                webformat_url=i["webformatURL"],
                large_image_url=i["largeImageURL"],
                downloads=i["downloads"],
                likes=i["likes"]
            ))
        return make_data
    except:
        print("cannot read images data")

    # jsonData = r.json()
    # data = json.load(r)
