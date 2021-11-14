import pymongo
from pymongo import MongoClient

client = MongoClient("localhost", 27017)
db = client["KeyCode"]
collection = db["accounts"]

# "mongodb+srv://zKlau:claudiu1908@cluster0.bgvqm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
