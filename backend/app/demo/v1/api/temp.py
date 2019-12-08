import pymongo
import jwt
import ssl
URL="url:port/db?ssl=true"

# client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
# database = client['room_seeker']

# rooms = database['availablerooms']
# res = rooms.find({'open_date':{'$lte','2019,10,1'}, 'end_date':{'$gte':'2019,11,1'}})

# print(res[0])

import random
print(random.choice([1,12]))