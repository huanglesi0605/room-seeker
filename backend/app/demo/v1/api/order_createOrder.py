# -*- coding: utf-8 -*-
##implement create order functionality
from __future__ import absolute_import, print_function

from flask import request, g
import pymongo
import jwt
import datetime
from . import Resource
from .. import schemas
import ssl
URL="url:port/db?ssl=true"

class OrderCreateorder(Resource):

    def post(self):
        ## get email address from token
        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        email = decoded['email']
        ##connect with database
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']
        collection = database['orders']
        ## update database 'orders' and put in a new order
        new_order = {}
        new_order['email_address'] = email
        new_order['roomid']=g.json['roomId']
        new_order['check_in_date'] = g.json['checkIn']
        new_order['check_out_date'] = g.json['checkOut']
        new_order['guests_number'] = g.json['guests']
        new_order['status'] = '1_pending'
        new_order['orderid'] = collection.count()
        collection2 = database['availablerooms']
        result = collection2.find_one({'i':g.json['roomId'] })
        new_order['title'] = result['title']
        new_order['description'] = result['description']
        new_order['price'] = result['price']
        try:
            new_order['oneImage'] = result['photos'][0]
        except:
            new_order['oneImage'] = ''
        # a = result['available_date']
        # new_date = a
        # b = g.json['checkIn']
        # year1 = int(b[0:4])
        # month1 = int(b[5:7])
        # day1 = int(b[8:])
        # c = g.json['checkOut']
        # year2 = int(c[0:4])
        # month2 = int(c[5:7])
        # day2 = int(c[8:])
        # d1 = datetime.datetime(year1,month1,day1)
        # d2 = datetime.datetime(year2,month2,day2)
        # d = (d2-d1).days
        # e = result['open_date']
        # year3 = int(e[0:4])
        # month3 = int(e[5:7])
        # day3 = int(e[8:])
        # d3 = datetime.datetime(year3,month3,day3)
        # f = result['end_date']
        # year4 = int(f[0:4])
        # month4 = int(f[5:7])
        # day4 = int(f[8:])
        # d4 = datetime.datetime(year4,month4,day4)
        # if d1 < d3 or d2>d4:
        #     return {'errorMessage':'Please choose another date'}, 400, None
        # for i in range ((d2-d1).days):
        #     if a[(d1-d3).days-1] == 1:
        #         return {'errorMessage':'Please choose another date'}, 400, None
        #     else:
        #         new_date[(d1-d3).days-1] = 1
        #         d1 = d1+datetime.timedelta(days=1)
        #print(new_date)
        #myquery1 = {'available_date': a}
        #newvalues1 = { "$set": { 'available_date':new_date} }
        #collection2.update_one(myquery1,newvalues1)
        collection3 = database['users']
        host = collection3.find_one({'email':result['email']})
        ## give user a new order id 
        myquery = {'email': result['email']}
        newvalues = { "$push": { 'message': {'messageType':'1_pending', 'orderId':new_order['orderid']} } }
        collection3.update_one(myquery,newvalues)

        collection.insert_one(new_order)
        return {'orderId':new_order['orderid']}, 200, None


        
