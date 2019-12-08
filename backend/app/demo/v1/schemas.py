# -*- coding: utf-8 -*-

import six
from jsonschema import RefResolver
# TODO: datetime support

class RefNode(object):

    def __init__(self, data, ref):
        self.ref = ref
        self._data = data

    def __getitem__(self, key):
        return self._data.__getitem__(key)

    def __setitem__(self, key, value):
        return self._data.__setitem__(key, value)

    def __getattr__(self, key):
        return self._data.__getattribute__(key)

    def __iter__(self):
        return self._data.__iter__()

    def __repr__(self):
        return repr({'$ref': self.ref})

    def __eq__(self, other):
        if isinstance(other, RefNode):
            return self._data == other._data and self.ref == other.ref
        elif six.PY2:
            return object.__eq__(other)
        elif six.PY3:
            return object.__eq__(self, other)
        else:
            return False

    def __deepcopy__(self, memo):
        return RefNode(copy.deepcopy(self._data), self.ref)

    def copy(self):
        return RefNode(self._data, self.ref)

###
### DO NOT CHANGE THIS FILE
### 
### The code is auto generated, your change will be overwritten by 
### code generating.
###

base_path = '/v1'

definitions = {'definitions': {}, 'parameters': {}}

validators = {
    ('auth_login', 'POST'): {'json': {'type': 'object', 'required': ['email', 'password'], 'properties': {'email': {'type': 'string'}, 'password': {'type': 'string'}}}},
    ('auth_signup', 'POST'): {'json': {'type': 'object', 'properties': {'userName': {'type': 'string'}, 'firstName': {'type': 'string'}, 'lastName': {'type': 'string'}, 'email': {'type': 'string'}, 'password': {'type': 'string'}}}},
    ('accountSetting_changeUserInfo', 'POST'): {'json': {'type': 'object', 'properties': {'userName': {'type': 'string'}, 'firstName': {'type': 'string'}, 'lastName': {'type': 'string'}}}, 'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('accountSetting_changePassword', 'POST'): {'json': {'type': 'object', 'properties': {'previousPassword': {'type': 'string'}, 'newPassword': {'type': 'string'}}}, 'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('Review_writeReview', 'POST'): {'json': {'type': 'object', 'properties': {'orderId': {'type': 'string'}, 'review': {'type': 'string'}, 'mark': {'type': 'number'}}}, 'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('accountSetting_accountInfo', 'GET'): {'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('search', 'POST'): {'json': {'type': 'object', 'properties': {'searchbar': {'type': 'string'}, 'check-in-date': {'type': 'string'}, 'check-out-date': {'type': 'string'}, 'guests-number': {'type': 'integer'}, 'city': {'type': 'string'}, 'price': {'type': 'integer'}, 'parking': {'type': 'boolean'}, 'air-conditioner': {'type': 'boolean'}, 'wi-fi': {'type': 'boolean'}, 'kitchen': {'type': 'boolean'}, 'sortBy': {'type': 'string'}}}},
    ('property_information', 'POST'): {'json': {'type': 'object', 'properties': {'title': {'type': 'string'}, 'description': {'type': 'string'}, 'address': {'type': 'string'}, 'city': {'type': 'string'}, 'openDate': {'type': 'string'}, 'closeDate': {'type': 'string'}, 'price': {'type': 'number'}, 'guests': {'type': 'integer'}, 'parking': {'type': 'boolean'}, 'airConditioner': {'type': 'boolean'}, 'wifi': {'type': 'boolean'}, 'kitchen': {'type': 'boolean'}, 'photos': {'type': 'array', 'items': {'type': 'string'}}}}, 'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('order_createOrder', 'POST'): {'json': {'type': 'object', 'properties': {'roomId': {'type': 'integer'}, 'checkIn': {'type': 'string'}, 'checkOut': {'type': 'string'}, 'guests': {'type': 'integer'}}}, 'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('order_myOrder', 'GET'): {'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('order_myHostOrder', 'GET'): {'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('host_myPost', 'GET'): {'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('account_myRecommendation', 'GET'): {'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('account_myWishlist', 'GET'): {'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('account_putWish', 'POST'): {'json': {'type': 'object', 'properties': {'roomId': {'type': 'integer'}}}, 'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('account_removeWish', 'POST'): {'json': {'type': 'object', 'properties': {'roomId': {'type': 'integer'}}}, 'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('property_reviews', 'POST'): {'json': {'type': 'object', 'properties': {'propertyId': {'type': 'integer'}}}},
    ('property_info', 'POST'): {'json': {'type': 'object', 'properties': {'propertyId': {'type': 'integer'}}}},
    ('message', 'GET'): {'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('confirmOrder', 'POST'): {'json': {'type': 'object', 'properties': {'orderId': {'type': 'integer'}, 'confirmType': {'type': 'string'}}}, 'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
    ('chatbot', 'POST'): {'json': {'type': 'object', 'properties': {'utterance': {'type': 'string'}}}, 'headers': {'required': [], 'properties': {'Authorization': {'type': 'string'}}}},
}

filters = {
    ('auth_login', 'POST'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'token': {'type': 'string'}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string', 'example': 'email/password is empty'}}}}},
    ('auth_signup', 'POST'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'token': {'type': 'string'}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('accountSetting_changeUserInfo', 'POST'): {200: {'headers': None, 'schema': None}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('accountSetting_changePassword', 'POST'): {200: {'headers': None, 'schema': None}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('Review_writeReview', 'POST'): {200: {'headers': None, 'schema': None}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('accountSetting_accountInfo', 'GET'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'firstName': {'type': 'string'}, 'lastName': {'type': 'string'}, 'email': {'type': 'string'}, 'password': {'type': 'string'}, 'username': {'type': 'string'}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('search', 'POST'): {200: {'headers': None, 'schema': {'type': 'array', 'items': {'type': 'object', 'properties': {'title': {'type': 'string'}, 'price': {'type': 'number'}, 'description': {'type': 'string'}, 'id': {'type': 'integer'}, 'oneImage': {'type': 'string'}}}}}},
    ('property_information', 'POST'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'roomId': {'type': 'integer'}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('order_createOrder', 'POST'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'orderId': {'type': 'integer'}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('order_myOrder', 'GET'): {200: {'headers': None, 'schema': {'type': 'array', 'items': {'properties': {'title': {'type': 'string'}, 'price': {'type': 'number'}, 'description': {'type': 'string'}, 'id': {'type': 'string'}, 'checkIn': {'type': 'string'}, 'checkOut': {'type': 'string'}, 'guests': {'type': 'integer'}, 'roomId': {'type': 'integer'}, 'oneImage': {'type': 'string'}, 'status': {'type': 'string'}, 'rating': {'type': 'number'}, 'review': {'type': 'string'}}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('order_myHostOrder', 'GET'): {200: {'headers': None, 'schema': {'type': 'array', 'items': {'properties': {'title': {'type': 'string'}, 'price': {'type': 'number'}, 'description': {'type': 'string'}, 'id': {'type': 'string'}, 'checkIn': {'type': 'string'}, 'checkOut': {'type': 'string'}, 'guests': {'type': 'integer'}, 'roomId': {'type': 'integer'}, 'oneImage': {'type': 'string'}, 'status': {'type': 'string'}}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('host_myPost', 'GET'): {200: {'headers': None, 'schema': {'type': 'array', 'items': {'properties': {'title': {'type': 'string'}, 'price': {'type': 'number'}, 'description': {'type': 'string'}, 'id': {'type': 'integer'}, 'oneImage': {'type': 'string'}}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('account_myRecommendation', 'GET'): {200: {'headers': None, 'schema': {'type': 'array', 'items': {'properties': {'title': {'type': 'string'}, 'price': {'type': 'number'}, 'description': {'type': 'string'}, 'id': {'type': 'integer'}, 'oneImage': {'type': 'string'}}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('account_myWishlist', 'GET'): {200: {'headers': None, 'schema': {'type': 'array', 'items': {'properties': {'title': {'type': 'string'}, 'price': {'type': 'number'}, 'description': {'type': 'string'}, 'id': {'type': 'integer'}, 'oneImage': {'type': 'string'}}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('account_putWish', 'POST'): {200: {'headers': None, 'schema': None}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('account_removeWish', 'POST'): {200: {'headers': None, 'schema': None}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('property_reviews', 'POST'): {200: {'headers': None, 'schema': {'type': 'array', 'items': {'properties': {'mark': {'type': 'integer'}, 'review': {'type': 'string'}}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('property_info', 'POST'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'title': {'type': 'string'}, 'description': {'type': 'string'}, 'city': {'type': 'string'}, 'openDate': {'type': 'string'}, 'closeDate': {'type': 'string'}, 'price': {'type': 'integer'}, 'guests': {'type': 'integer'}, 'parking': {'type': 'boolean'}, 'airConditioner': {'type': 'boolean'}, 'wifi': {'type': 'boolean'}, 'kitchen': {'type': 'boolean'}, 'address': {'type': 'string'}, 'mark': {'type': 'number'}, 'photos': {'type': 'array', 'items': {'type': 'string'}}}}}, 400: {'headers': None, 'schema': {'type': 'object', 'properties': {'errorMessage': {'type': 'string'}}}}},
    ('message', 'GET'): {200: {'headers': None, 'schema': {'type': 'array', 'items': {'properties': {'messageType': {'type': 'string'}, 'orderId': {'type': 'integer'}}}}}},
    ('confirmOrder', 'POST'): {200: {'headers': None, 'schema': None}},
    ('chatbot', 'POST'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'answer': {'type': 'string'}}}}},
}

scopes = {
}

resolver = RefResolver.from_schema(definitions)

class Security(object):

    def __init__(self):
        super(Security, self).__init__()
        self._loader = lambda: []

    @property
    def scopes(self):
        return self._loader()

    def scopes_loader(self, func):
        self._loader = func
        return func

security = Security()


def merge_default(schema, value, get_first=True, resolver=None):
    # TODO: more types support
    type_defaults = {
        'integer': 9573,
        'string': 'something',
        'object': {},
        'array': [],
        'boolean': False
    }

    results = normalize(schema, value, type_defaults, resolver=resolver)
    if get_first:
        return results[0]
    return results


def normalize(schema, data, required_defaults=None, resolver=None):
    if required_defaults is None:
        required_defaults = {}
    errors = []

    class DataWrapper(object):

        def __init__(self, data):
            super(DataWrapper, self).__init__()
            self.data = data

        def get(self, key, default=None):
            if isinstance(self.data, dict):
                return self.data.get(key, default)
            return getattr(self.data, key, default)

        def has(self, key):
            if isinstance(self.data, dict):
                return key in self.data
            return hasattr(self.data, key)

        def keys(self):
            if isinstance(self.data, dict):
                return list(self.data.keys())
            return list(getattr(self.data, '__dict__', {}).keys())

        def get_check(self, key, default=None):
            if isinstance(self.data, dict):
                value = self.data.get(key, default)
                has_key = key in self.data
            else:
                try:
                    value = getattr(self.data, key)
                except AttributeError:
                    value = default
                    has_key = False
                else:
                    has_key = True
            return value, has_key

    def _merge_dict(src, dst):
        for k, v in six.iteritems(dst):
            if isinstance(src, dict):
                if isinstance(v, dict):
                    r = _merge_dict(src.get(k, {}), v)
                    src[k] = r
                else:
                    src[k] = v
            else:
                src = {k: v}
        return src

    def _normalize_dict(schema, data):
        result = {}
        if not isinstance(data, DataWrapper):
            data = DataWrapper(data)

        for _schema in schema.get('allOf', []):
            rs_component = _normalize(_schema, data)
            _merge_dict(result, rs_component)

        for key, _schema in six.iteritems(schema.get('properties', {})):
            # set default
            type_ = _schema.get('type', 'object')

            # get value
            value, has_key = data.get_check(key)
            if has_key or '$ref' in _schema:
                result[key] = _normalize(_schema, value)
            elif 'default' in _schema:
                result[key] = _schema['default']
            elif key in schema.get('required', []):
                if type_ in required_defaults:
                    result[key] = required_defaults[type_]
                else:
                    errors.append(dict(name='property_missing',
                                       message='`%s` is required' % key))

        additional_properties_schema = schema.get('additionalProperties', False)
        if additional_properties_schema is not False:
            aproperties_set = set(data.keys()) - set(result.keys())
            for pro in aproperties_set:
                result[pro] = _normalize(additional_properties_schema, data.get(pro))

        return result

    def _normalize_list(schema, data):
        result = []
        if hasattr(data, '__iter__') and not isinstance(data, (dict, RefNode)):
            for item in data:
                result.append(_normalize(schema.get('items'), item))
        elif 'default' in schema:
            result = schema['default']
        return result

    def _normalize_default(schema, data):
        if data is None:
            return schema.get('default')
        else:
            return data

    def _normalize_ref(schema, data):
        if resolver == None:
            raise TypeError("resolver must be provided")
        ref = schema.get(u"$ref")
        scope, resolved = resolver.resolve(ref)
        if resolved.get('nullable', False) and not data:
            return {}
        return _normalize(resolved, data)

    def _normalize(schema, data):
        if schema is True or schema == {}:
            return data
        if not schema:
            return None
        funcs = {
            'object': _normalize_dict,
            'array': _normalize_list,
            'default': _normalize_default,
            'ref': _normalize_ref
        }
        type_ = schema.get('type', 'object')
        if type_ not in funcs:
            type_ = 'default'
        if schema.get(u'$ref', None):
            type_ = 'ref'

        return funcs[type_](schema, data)

    return _normalize(schema, data), errors
