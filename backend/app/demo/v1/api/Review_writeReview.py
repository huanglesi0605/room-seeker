# -*- coding: utf-8 -*-
# implement write review functionality 


from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import pymongo
import jwt

class ReviewWritereview(Resource):
    # huang
    def post(self):
        print(g.json)
        
 
        ## extract user email
        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        email = decoded['email']
        ## connect to database
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority")
        database = client['room_seeker']
        collection = database['orders']
        # collect the new review and update the database
        myquery = {'orderid': int(g.json['orderId'])}
        newvalues = { "$set": { 'review': g.json['review'], 'mark':g.json['mark'], 'status':'5_finished' } }
        collection.update_one(myquery,newvalues)
        # update the average mark
        propertyId = collection.find_one(myquery)['roomid']
        database['availblerooms'].update_one({'i':propertyId},{'$inc':{'marks_sum':g.json['mark'], 'marks_num':1}})

        database.users.update({'email':email},{'$pull':{'message':{'orderId':int(g.json['orderId'])}}})

        return None, 200, None
