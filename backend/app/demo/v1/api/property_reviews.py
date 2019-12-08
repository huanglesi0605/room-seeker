# -*- coding: utf-8 -*-
##implement write review functionality
from __future__ import absolute_import, print_function

from flask import request, g
import pymongo
import jwt
import datetime
from . import Resource
from .. import schemas
import ssl
URL="url:port/db?ssl=true"


class PropertyReviews(Resource):

    def post(self):
        ## connect with database
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']
        collection = database['orders']
        reviews = []
        ## add new review to the database
        for result in collection.find({'roomid': g.json['propertyId']}):
            try:
                new_review = {}
                new_review['mark'] = result['mark']
                new_review['review'] = result['review']
                reviews.append(new_review)
            except:
                continue
        return reviews, 200, None
