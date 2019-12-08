# -*- coding: utf-8 -*-
## implement get my properties functionality
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas
import pymongo
import jwt
import ssl
URL="url:port/db?ssl=true"

class HostMypost(Resource):

    def get(self):
        print(g.headers)
        ## connect with database
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']
        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        ##get email from token
        email = decoded['email']
        collection = database['availablerooms']
        posts = []
        ## find properties from 'availablerooms' and return to users
        for result in collection.find({'email': email}).sort("i",-1):
            new_dict = {}
            new_dict['title'] = result['title']
            new_dict['price'] = result['price']
            new_dict['id'] = result['i']
            new_dict['description'] = result['description']
            try:
                new_dict['oneImage'] = result['photos'][0]
            except:
                new_dict['oneImage'] = ''
            posts.append(new_dict)
        return posts, 200, None
