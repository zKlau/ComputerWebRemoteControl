import pymongo
from pymongo import MongoClient

client = MongoClient("localhost", 27017)
db = client["KeyCode"]
collection = db["accounts"]
