# encoding=utf-8
"""

Description : main program for this project
"""

from Recommender import *
from LF_Recommender import *
from config import *
from rateMethods import *
from ballTree import * 

import pymongo
import ssl

#method - Kd-tree
##################

userSize = 102
propertySize = 303

#r = Recommender(args.train_path, args.user_size, args.movie_size, args.compare_type, args.predict_type)
r = Recommender('../data/data.base', userSize, propertySize, 1, 2)
data = CF_by_Kdtree(r, r.train, 1, r.path, None)
print(type(data))
print(data.shape)
print(data[59][:])
print('\n------------------------------------')

## connect to database
myclient = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
mydb = myclient['room_seeker']
mycol = mydb["users"]

## post the recommendation list
for i in range(userSize):
	# t = [(roomId, predictedMark)...]
	t = [(j, data[i][j]) for j in range(propertySize)]
	t.sort(key=lambda e:e[1], reverse=True)
	recommendations = [e[0] for e in t]
	mycol.update_one({'i':i},{'$set':{'recommendations':recommendations}})
