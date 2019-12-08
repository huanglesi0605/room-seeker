# implement change password functionality
# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas
import jwt
import pymongo
#xiao
class AccountsettingChangepassword(Resource):

	def post(self):
		#connect with database
		client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority")
		database = client['room_seeker']
		# extract email from token
		token = g.headers['Authorization']
		decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
		email = decoded['email']
		collection = database['users']
		result = collection.find_one({'email': email})

		# compare with previous password
		password = result['password']

		temp_previous = g.json['previousPassword']
		
		if password != temp_previous:
			return {'errorMessage': 'Wrong Previous Password'}, 400, None
		
		temp_new = g.json['newPassword']
		#print(temp)

		# update password based on email
		myquery = {'email': email}
		newvalues = { "$set": { 'password': temp_new } }
		collection.update_one(myquery,newvalues)

		return None, 200, None
