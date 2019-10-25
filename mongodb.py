from pymongo import MongoClient
import json
import glob

client = MongoClient('localhost', 27017)
db = client['ntv']


# Insert user recommendations generated from Collaborative Filtering
def create_user_collection():
    collist = db.list_collection_names()
    user_col = db["users"]
    user_rec = glob.glob("./user/*.json")
    for file in user_rec:
        with open(file) as f:
            file_data = json.load(f)
            user_col.insert_one(file_data)


# Creating a dummy content collection:
def create_content_collection():
    contents = db["contents"]
    contentDoc = {"contentId": "4164212115654350513",
                  "title": "California Fires Updates: 50,000 Forced to Evacuate", "body": "Strong wind gusts fanned the flames of a wildfire in northern Los Angeles County on Thursday, forcing the evacuation of at least 50,000 people, the authorities said.", "imgsrc": "https://static01.nyt.com/images/2019/10/24/multimedia/24xp-live-fires/merlin_163260768_807b885c-326d-422b-b178-4b9283209530-videoLarge.jpg"}
    recid = contents.insert_one(contentDoc)
    print("Data inserted with id:", recid)


create_user_collection()
create_content_collection()
