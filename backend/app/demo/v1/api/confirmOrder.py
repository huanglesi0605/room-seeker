# -*- coding: utf-8 -*-
#implement confirm order function
from __future__ import absolute_import, print_function

from flask import request, g
import pymongo
import jwt
import datetime
from . import Resource
from .. import schemas
import ssl
URL="url:port/db?ssl=true"


class Confirmorder(Resource):

    def post(self):
        ## get email from token
        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        email = decoded['email']
        ##connect with database
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']
        collection = database['orders']
        result = collection.find_one({'orderid':g.json['orderId']})
        print(result['status'],result['email_address'])
        myquery = {'status': result['status']}
        newvalues = { "$set": { 'status': g.json['confirmType'] } }
        collection.update_one(myquery,newvalues)
        ##confirm order and update orders status 

        collection2 = database['users']
        myquery2 = {'email':result['email_address']}
        newMessage = {
            'messageType':g.json['confirmType'],
            'orderId':g.json['orderId']
        }
        database.users.update_one(myquery2, {"$push":{'message':newMessage}})

        database.users.update_one({'email':email}, {"$pull":{'message':{'orderId':g.json['orderId']}}})

        return None, 200, None
