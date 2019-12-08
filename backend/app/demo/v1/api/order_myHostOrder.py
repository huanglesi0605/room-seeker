# -*- coding: utf-8 -*-
##implement my host order functionality
from __future__ import absolute_import, print_function
from flask import request, g
from . import Resource
from .. import schemas
import pymongo
import jwt
import ssl
URL="url:port/db?ssl=true"
class OrderMyhostorder(Resource):

    def get(self):
        print(g.headers)
        ##connect database
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']
        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        ##get email from token
        email = decoded['email']
        collection = database['users']
        result = collection.find_one({'email':email})
        a = result['property']
        collection2 = database['availbalerooms']
        collection3 = database['orders']
        results = []
        ## from 'orders' find all orders and return to user
        for i in range(len(a)):
            for record in collection3.find({'roomid':a[i]}).sort("status"):
                print('dscccds')
                mydict = {}
                mydict['title'] = record['title']
                mydict['description'] = record['description']
                mydict['price'] = record['price']
                mydict['id'] = record['orderid']
                mydict['checkIn'] = str(record['check_in_date'])
                mydict['checkOut'] = str(record['check_out_date'])
                mydict['roomId'] = record['roomid']
                mydict['guests'] = record['guests_number']
                mydict['status'] = record['status']
                try:
                    mydict['oneImage'] = record['oneImage']
                except:
                    mydict['oneImage'] = ''
                results.append(mydict)
        return results, 200, None
