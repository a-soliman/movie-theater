'''
This file contains mongodb uri
'''
from pymongo import MongoClient


client = MongoClient('mongodb://ahmed:123456@ds129966.mlab.com:29966/later')
db = client['later']