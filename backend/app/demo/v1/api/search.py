# -*- coding: utf-8 -*-
## implement search functionality
from __future__ import absolute_import, print_function

from flask import request, g
import numpy as np
from . import Resource
from .. import schemas
import pymongo
import jwt
import datetime
import ssl
URL="url:port/db?ssl=true"


class Search(Resource):

  def post(self):
    print(g.json)
    ## connect with database
    client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
    database = client['room_seeker']
    collection = database['availablerooms']
    results = []

    query = {'city':g.json['city']}
    if g.json['price'] != 0:
        query['price'] = {'$gte': (g.json['price']-1)*100, '$lte':(g.json['price'])*100}
    #check if the property can meet users demands, like the check in date should after the open date, 
    #the guest number should not exceed the capacity of the property,etc
        
    for document in collection.find(query):
        print(document['i'])
        
        isResult = (g.json['searchbar'] in document['title']) or (g.json['searchbar'] in document['description'])
        if not isResult:
            continue

        isResult = isResult and (int(g.json['check-in-date']) >= document['open_date'])
        #date_time3 = datetime.datetime.strptime(g.json['check-out-date'], "%Y,%m,%d").date()
        #datetime4 = datetime.datetime.strptime(document['end_date'], "%Y,%m,%d").date()
        isResult = isResult and (int(g.json['check-out-date']) <= document['end_date'])
        if not isResult:
            continue

        isResult = isResult and (g.json['guests-number'] <= document['guests'])
        #if g.json['price'] != 0:
        #    isResult = isResult & ((g.json['price']-1) *100 < document['price'] < (g.json['price']) *100)

        isResult = isResult and (g.json['guests-number'] <= document['guests'])
        if not isResult:
            continue
        if g.json['parking'] and (document['available_amentities'][0] == 0):
            isResult = False
        if g.json['air-conditioner'] and (document['available_amentities'][1] == 0):
            isResult = False
        if g.json['wi-fi'] and (document['available_amentities'][2] == 0):
            isResult = False
        if g.json['kitchen'] and (document['available_amentities'][3] == 0):
            isResult = False
        if isResult :
            res = {
                'title':document['title'],
                'price':document['price'],
                'description':document['description'],
                'id':document['i']
                }
            try:
                res['oneImage'] = document['photos'][0]
            except:
                res['oneImage'] = ''
            results.append(res)
    # print(results)
    #if user chhose to use our sort by function,first we find which filter he choose then we 
    #Give the corresponding answer
    new_list = []
    if g.json['sortBy'] == 'mark':
        collection2 = database['orders']
        for i in range(len(results)):
            marks = 0
            count = 0
            for result in collection2.find({'roomid':results[i]['id']}):
                try:
                    marks += result['mark']
                    count += 1
                except:
                    pass
            if count > 0:
                average_mark = round(marks/count,1)
            else:
                average_mark = 0
            new_list.append((average_mark,results[i]))
        new_results = sorted(new_list,key=lambda x:x[0], reverse=True)
        final_result = []
        for i in range(len(new_results)):
            final_result.append(new_results[i][1])
    elif g.json['sortBy'] == 'price':
        final_result = sorted(results, key=lambda x:x['price'])
    elif g.json['sortBy'] == 'popularity':
        collection2 = database['orders']
        for i in range(len(results)):
            count = 0
            for result in collection2.find({'roomid':results[i]['id']}):
                count += 1
            new_list.append((count,results[i]))
        new_results = sorted(new_list,key=lambda x:x[0], reverse=True)
        final_result = []
        for i in range(len(new_results)):
            final_result.append(new_results[i][1])
    else:
        final_result = results
    # print(final_result)
    return final_result, 200, None
        
