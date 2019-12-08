# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import pymongo
import jwt
import ssl
URL="url:port/db?ssl=true"


class AccountMywishlist(Resource):

    def get(self):
        print(g.headers)

        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        email = decoded['email']

        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']
        like = database['users'].find_one({'email':email})['like']

        results = []
        for roomId in like:
        	room = database['availablerooms'].find_one({'i':roomId})
        	res = {
        		'title':room['title'],
        		'price':room['price'],
        		'description':room['description'],
        		'id':roomId
        	}
        	try:
        		res['oneImage'] = room['photos'][0]
        	except:
        		res['oneImage'] = ''
        	results.append(res)
        return results, 200, None