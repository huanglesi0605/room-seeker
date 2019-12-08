# -*- coding: utf-8 -*-
#implementing login in function
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import pymongo
import jwt
import ssl
URL="url:port/db?ssl=true"

class AuthLogin(Resource):

    ## Huang
    def post(self):
        print(g.json)

        ## connect to database
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']

        print('connected')

        ## check if the email and password are correct
        userAccounts = database['users']
        user = userAccounts.find_one({'email':g.json['email']})
        

        if user == None:
            return {'errorMessage': 'no such email'}, 400, None
        
        if user['password'] != g.json['password']:
            return {'errorMessage': 'wrong password'}, 400, None

        tokenBytes = jwt.encode({'email': user['email']}, 'secret', algorithm='HS256')
        token = tokenBytes.decode('ascii')
        return {'token':token}, 200, None
