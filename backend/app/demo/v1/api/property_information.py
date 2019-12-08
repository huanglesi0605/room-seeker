# -*- coding: utf-8 -*-
##implement get propert information functionality
from __future__ import absolute_import, print_function

from flask import request, g
import numpy as np
from . import Resource
from .. import schemas
import pymongo
import jwt
import datetime
import ssl
URL="url:port/db?ssl=true"

class PropertyInformation(Resource):

    def post(self):
        print('aaa')
        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        #get email from token
        email = decoded['email']
        ##connect with database
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']
        collection = database['availablerooms']
        ## use a dict to collect new property inforamtion 
        new_property = {}
        new_property['email'] = email
        new_property['city'] = g.json['city']
        new_property['title']=g.json['title']
        new_property['description'] = g.json['description']
        new_property['open_date'] = int(g.json['openDate'])
        new_property['end_date'] = int(g.json['closeDate'])
        new_property['price'] = g.json['price']
        new_property['guests'] = g.json['guests']
        new_property['address'] = g.json['address']

        # year1 = int(g.json['openDate'][0:4])
        # month1 = int(g.json['openDate'][5:7])
        # day1 = int(g.json['openDate'][8:])
        # year2 = int(g.json['closeDate'][0:4])
        # month2 = int(g.json['closeDate'][5:7])
        # day2 = int(g.json['closeDate'][8:])
        # d1 = datetime.datetime(year1,month1,day1)
        # d2 = datetime.datetime(year2,month2,day2)
        # d = (d2-d1).days
        # x= np.random.randint(0,1,d)
        # x = x.tolist()
        # new_property['available_date'] = x
        amentities=[]
        if g.json['parking']:
            amentities.append(1)
        else:
            amentities.append(0)
        if g.json['kitchen']:
            amentities.append(1)
        else:
            amentities.append(0)
        if g.json['airConditioner']:
            amentities.append(1)
        else:
            amentities.append(0)
        if g.json['wifi']:
            amentities.append(1)
        else:
            amentities.append(0)
        new_property['available_amentities'] = amentities
        new_property['photos'] = g.json['photos']
        new_property['i'] = collection.count()
        new_property['marks_sum'] = 0
        new_property['marks_num'] = 0
        temp = collection.insert_one(new_property)
        ## UPADATE DATABASE
        
        collection2 = database['users']
        myquery = {'email':email}
        collection2.update(myquery, {'$push': {'property':new_property['i']}})

        return {'roomId':new_property['i']}, 200, None
