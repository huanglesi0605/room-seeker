# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import pymongo
import jwt
import ssl
URL="url:port/db?ssl=true"
import requests


class Chatbot(Resource):

    def post(self):
        print(g.headers)
        print(g.json)

        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        email = decoded['email']
        expression = g.json['utterance']

        response = requests.get('https://api.wit.ai/message',
                                params = {'q':expression},
                                headers = {'Authorization':'Bearer HFPREIJTYHOKJBMBJUYLMDBCWFWOWV2W'})
        if response.status_code != 200:
            print(response.status_code)
            return None, 400, None

        response = response.json()

        try:
            intent = response['entities']['intent'][0]['value']
        except KeyError:
            answer = "Sorry! I don't understand what you mean."
            return {'answer':answer}, 200, None
        
        if intent == "greeting":
            answer = 'Hi! Nice to meet you! Can I help you?'
            return {'answer':answer}, 200, None

##############################################################################################################
        if intent == "recommend":
            location = response['entities']['location'][0]['value']
            client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
            database = client['room_seeker']
            rooms = database['availablerooms']

            user = database['users'].find_one({'email':email})
            recommendation = user['recommendations']

            for roomId in recommendation:
                room = rooms.find_one({'i':roomId})
                if room['city'] == location:
                    id = roomId
                    title = room['title']
                    break

            answer = f"Here is the property recommended for you: <a href=\"http://127.0.0.1:3000/property/{id}\"> {title} </a>"
            return {'answer':answer}, 200, None

##############################################################################################################
        if intent =="available number":
            location = response['entities']['location'][0]['value']
            if response['entities']['datetime'][0]['type'] == 'value':
                checkInDate = int(response['entities']['datetime'][0]['value'][0:10].replace('-','0'))
                checkOutDate = int(response['entities']['datetime'][0]['value'][0:10].replace('-','0'))
            elif response['entities']['datetime'][0]['type'] == 'interval':
                checkInDate = int(response['entities']['datetime'][0]['from']['value'][0:10].replace('-','0'))
                checkOutDate = int(response['entities']['datetime'][0]['to']['value'][0:10].replace('-','0'))

            client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
            database = client['room_seeker']
            collection = database['availablerooms']

            res = collection.find({'open_date':{'$lte':checkInDate}, 'end_date':{'$gte':checkOutDate}})
            answer = f"There are {len(list(res))} properties available in {location} during this period."
            return {'answer':answer}, 200, None

##############################################################################################################
        if intent == 'price':
            location = response['entities']['location'][0]['value']

            client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
            database = client['room_seeker']
            collection = database['availablerooms']

            rooms = collection.find({'city':location})
            prices = [room['price'] for room in rooms]
            answer = f"The average price of properties in {location} is ${sum(prices)/len(prices):.1f}."
            return {'answer':answer}, 200, None

##############################################################################################################
        if intent == "price with capacity":
            location = response['entities']['location'][0]['value']
            capacity = response['entities']['number'][0]['value']
            client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
            database = client['room_seeker']
            collection = database['availablerooms']

            rooms = collection.find({'city':location,'guests':capacity})
            prices = [room['price'] for room in rooms]
            if len(prices) == 0 :
                answer = f"There is no property in {location} with a capacity of {capacity}."
            else:
                answer = f"The average price of properties in {location} with a capacity of {capacity} is ${sum(prices)/len(prices):.1f}."
            return {'answer':answer}, 200, None

##############################################################################################################
        if intent == "write reviews":
            answer = "From the navigation bar at the top of our website, go to <a href=\"http://127.0.0.1:3000/order/guestOrder\"> \"I'm a Guest\" -- \"My Bookings\"</a> to write reviews."
            return {'answer':answer}, 200, None

##############################################################################################################
        if intent == "check host orders":
            answer = "From the navigation bar at the top of our website, go to <a href=\"http://127.0.0.1:3000/order/hostOrder\"> \"I'm a Host\" -- \"My orders\"</a> to check orders of your properties."
            return {'answer':answer}, 200, None

##############################################################################################################
        if intent == "change password":
            answer = "From the navigation bar at the top of our website, go to <a href=\"http://127.0.0.1:3000/account\"> \"Account\"</a> to change your password."
            return {'answer':answer}, 200, None