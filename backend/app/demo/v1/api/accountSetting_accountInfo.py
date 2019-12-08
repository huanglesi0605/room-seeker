# -*- coding: utf-8 -*-
# get account info from the database
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas


import pymongo
import jwt
import ssl
URL="url:port/db?ssl=true"
class AccountsettingAccountinfo(Resource):
	def get(self):
		# connect to database
		client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
		database = client['room_seeker']
		token = g.headers['Authorization']
		decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
		# extract email from token
		email = decoded['email']
		collection = database['users']
		# get user information base on the email address
		result = collection.find_one({'email': email})
		firstName = result['firstname']
		lastName = result['lastname']
		password = result['password']
		Username = result['username']

		return {'firstName': firstName,'lastName': lastName,
				'email': email,'password': password,'username': Username}, 200, None
