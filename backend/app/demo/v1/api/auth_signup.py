# -*- coding: utf-8 -*-
#implement sign up function
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import pymongo
import jwt

import ssl
URL="url:port/db?ssl=true"


class AuthSignup(Resource):
    def post(self):

    	## connect to database
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']
  

        ## check if the email has already exist
        collection = database['users']
        if collection.find_one({'email':g.json['email']}):
            return {'errorMessage':'This email has already been registered'}, 400, None
        

        
    
        #print(g.json)
        ## collect new user's information and put in database
        new_user = {}
        new_user['firstName'] = g.json['firstName']
        new_user['lastName']=g.json['lastName']
        new_user['email'] = g.json['email']
        new_user['password'] = g.json['password']
        new_user['username'] = g.json['userName']
        collection.insert_one(new_user)

        


        tokenBytes = jwt.encode({'email': g.json['email']}, 'secret', algorithm='HS256')
        token = tokenBytes.decode('ascii')
        return {'token':token}, 200, None
