# -*- coding: utf-8 -*-
##implement post property infomation functioality
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


class PropertyInfo(Resource):

  def post(self):
    print(g.json)
    ##connect database
    client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
    database = client['room_seeker']
    #print(average_mark)
    collection2 = database['availablerooms']
    document = collection2.find_one({'i':g.json['propertyId']})
    ## find the propert through property id and return to user
    result = {
      "title": document['title'],
      "description": document["description"],
      "city": document["city"],
      "address": document["address"],
      "openDate": str(document["open_date"]),
      "closeDate": str(document["end_date"]),
      "price": document["price"],
      "guests": document["guests"],
      "parking": document["available_amentities"][0]==1,
      "airConditioner": document["available_amentities"][1]==1,
      "wifi": document["available_amentities"][2]==1,
      "kitchen": document["available_amentities"][3]==1,
      "address": document["address"]
    }
    if document['marks_num'] > 0:
      result["mark"] = round(document['marks_sum']/document['marks_num'],1)
    else:
      result['mark'] = 0
    try:
      result['photos'] = document['photos']
    except:
      result['photos'] = []
    return  result, 200, None
