# -*- coding: utf-8 -*-
#implement message function
from __future__ import absolute_import, print_function

from flask import request, g
import pymongo
import jwt
import datetime
from . import Resource
from .. import schemas
import ssl
URL="url:port/db?ssl=true"

class Message(Resource):

    def get(self):
    	token = g.headers['Authorization']
    	decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
    	email = decoded['email']
        ##get email address from token
        ## connect with database
    	client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
    	database = client['room_seeker']
    	collection = database['users']
    	result = collection.find_one({'email':email})
    	a = result['message']
    	# myquery = {'message': result['message']}
    	# newvalues = { "$set": { 'message': [] } }
    	# collection.update_one(myquery,newvalues)
    	return a, 200, None
