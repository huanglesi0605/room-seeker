# -*- coding: utf-8 -*-
# implement get recommendation functionality
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import pymongo
import jwt
import ssl
URL="url:port/db?ssl=true"

class AccountMyrecommendation(Resource):

	def get(self):
		print(g.headers)
		# connect to database
		client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
		database = client['room_seeker']
		
		# extract user email
		token = g.headers['Authorization']
		decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
		email = decoded['email']
		collection = database['users']
		col2 = database['availablerooms']

		# collect recommendation information
		user = collection.find_one({'email':email})
		results = []
		for roomId in user['recommendations']:
			room = col2.find_one({'i':roomId})
			res = {
				'title':room['title'],
				'price':room['price'],
				'description':room['description'],
				'id':roomId
				}
			try:
				res['oneImage'] = room['photos'][0]
			except:
				res['oneImage'] = ''
			results.append(res)
			if len(results) >= 6:
				break

		return results, 200, None
