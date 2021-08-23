from typing import List, Tuple, Callable, Any
import re
import requests
import json
import random

import api.settings as settings

API_KEY = settings.API_KEY


def fetch_images_from_pixabay():
