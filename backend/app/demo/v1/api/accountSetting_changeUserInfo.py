# -*- coding: utf-8 -*-
# implement the change user information functionality
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import pymongo
import jwt

import ssl
URL="url:port/db?ssl=true"
class AccountsettingChangeuserinfo(Resource):
	##patrick
    def post(self):
        token = g.headers['Authorization']
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        email = decoded['email']
	##extract email address from token
	## connect with database
        
        client = pymongo.MongoClient("mongodb+srv://IronTriangle:IronTriangle@cluster0-vm3xu.mongodb.net/admin?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)
        database = client['room_seeker']
    	## check if the email and password are correct
        a = g.json
        collection = database['users']
	##update new user inforamtion

        myquery = {"email":email}
        newvalues = {"$set":{"username":a["userName"],
                             "firstName":a["firstName"],
                             "lastName":a["lastName"]}}
        collection.update_one(myquery, newvalues)
    	
##    	old_username = ''
##    	result = collection.find_one({'email': a['email']})
##    	old_username =  {'username': result['username']}
##    	new_username = {"$set":{ 'username': g.json['userName']}}
##    	collection.update_one(old_username,new_username)
##    	old_firstname = ''
##    	old_firstname = {'firstname': result['firstname']}
##    	new_firstname = {"$set":{ 'firstname': g.json['firstName']}}
##    	collection.update_one(old_firstname,new_firstname)
##    	old_lastname = ''
##    	old_lastname = {'lastname': result['lastname']}
##    	new_lastname = {"$set":{ 'lastname': g.json['lastName']}}
##    	collection.update_one(old_lastname,new_lastname)
        return None, 200, None
