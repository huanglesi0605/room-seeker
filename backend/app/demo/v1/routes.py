# -*- coding: utf-8 -*-

###
### DO NOT CHANGE THIS FILE
### 
### The code is auto generated, your change will be overwritten by 
### code generating.
###
from __future__ import absolute_import

from .api.auth_login import AuthLogin
from .api.auth_signup import AuthSignup
from .api.accountSetting_changeUserInfo import AccountsettingChangeuserinfo
from .api.accountSetting_changePassword import AccountsettingChangepassword
from .api.Review_writeReview import ReviewWritereview
from .api.accountSetting_accountInfo import AccountsettingAccountinfo
from .api.search import Search
from .api.property_information import PropertyInformation
from .api.order_createOrder import OrderCreateorder
from .api.order_myOrder import OrderMyorder
from .api.order_myHostOrder import OrderMyhostorder
from .api.host_myPost import HostMypost
from .api.account_myRecommendation import AccountMyrecommendation
from .api.account_myWishlist import AccountMywishlist
from .api.account_putWish import AccountPutwish
from .api.account_removeWish import AccountRemovewish
from .api.property_reviews import PropertyReviews
from .api.property_info import PropertyInfo
from .api.message import Message
from .api.confirmOrder import Confirmorder
from .api.chatbot import Chatbot


routes = [
    dict(resource=AuthLogin, urls=['/auth/login'], endpoint='auth_login'),
    dict(resource=AuthSignup, urls=['/auth/signup'], endpoint='auth_signup'),
    dict(resource=AccountsettingChangeuserinfo, urls=['/accountSetting/changeUserInfo'], endpoint='accountSetting_changeUserInfo'),
    dict(resource=AccountsettingChangepassword, urls=['/accountSetting/changePassword'], endpoint='accountSetting_changePassword'),
    dict(resource=ReviewWritereview, urls=['/Review/writeReview'], endpoint='Review_writeReview'),
    dict(resource=AccountsettingAccountinfo, urls=['/accountSetting/accountInfo'], endpoint='accountSetting_accountInfo'),
    dict(resource=Search, urls=['/search'], endpoint='search'),
    dict(resource=PropertyInformation, urls=['/property/information'], endpoint='property_information'),
    dict(resource=OrderCreateorder, urls=['/order/createOrder'], endpoint='order_createOrder'),
    dict(resource=OrderMyorder, urls=['/order/myOrder'], endpoint='order_myOrder'),
    dict(resource=OrderMyhostorder, urls=['/order/myHostOrder'], endpoint='order_myHostOrder'),
    dict(resource=HostMypost, urls=['/host/myPost'], endpoint='host_myPost'),
    dict(resource=AccountMyrecommendation, urls=['/account/myRecommendation'], endpoint='account_myRecommendation'),
    dict(resource=AccountMywishlist, urls=['/account/myWishlist'], endpoint='account_myWishlist'),
    dict(resource=AccountPutwish, urls=['/account/putWish'], endpoint='account_putWish'),
    dict(resource=AccountRemovewish, urls=['/account/removeWish'], endpoint='account_removeWish'),
    dict(resource=PropertyReviews, urls=['/property/reviews'], endpoint='property_reviews'),
    dict(resource=PropertyInfo, urls=['/property/info'], endpoint='property_info'),
    dict(resource=Message, urls=['/message'], endpoint='message'),
    dict(resource=Confirmorder, urls=['/confirmOrder'], endpoint='confirmOrder'),
    dict(resource=Chatbot, urls=['/chatbot'], endpoint='chatbot'),
]