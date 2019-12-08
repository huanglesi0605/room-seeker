# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import pymongo
import jwt
import ssl
URL="url:port/db?ssl=true"


class AccountRemovewish(Resource):

    def post(self):
        print(g.json)
        print(g.headers)

        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        email = decoded['email']

        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']

        database['users'].update({'email':email},{'$pull':{'like':g.json['roomId']}})

        return None, 200, None