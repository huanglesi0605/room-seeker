# -*- coding: utf-8 -*-
##implement my order function
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas
import pymongo
import jwt
import ssl
URL="url:port/db?ssl=true"
class OrderMyorder(Resource):

    def get(self):
        #connect with database
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']
        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        ##get email from token
        email = decoded['email']
        collection = database['orders']
        ## from orders under oen users and return to users
        orders = []
        for result in collection.find({'email_address': email}).sort("status"):
            new_dict = {}
            new_dict['title'] = result['title']
            new_dict['price'] = result['price']
            new_dict['id'] = result['orderid']
            new_dict['description'] = result['description']
            new_dict['checkIn'] = str(result['check_in_date'])
            new_dict['checkOut'] = str(result['check_out_date'])
            new_dict['guests'] = result['guests_number']
            new_dict['status'] = result['status']
            new_dict['roomId'] = result['roomid']
            try:
                new_dict['oneImage'] = result['oneImage']
            except:
                new_dict['oneImage'] = ''
            if result['status'] == '5_finished':
                new_dict['rating'] = result['mark']
                new_dict['review'] = result['review']
            else:
                new_dict['rating'] = -1
                new_dict['review'] = ''
            orders.append(new_dict)
        return orders, 200, None
