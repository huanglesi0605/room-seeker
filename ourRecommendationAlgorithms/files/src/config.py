# encoding=utf-8
"""

Description : configuration for this project
"""
from configparser import ConfigParser
import logging
import argparse
import os
import sys


def getLogger(logName, fileName):
	"""
	Create logger object
	"""
	logger = logging.getLogger(logName)
	streamHandler = logging.StreamHandler()
	FileHandler = logging.FileHandler(filename = fileName)
	logger.setLevel(logging.INFO)
	streamHandler.setLevel(logging.WARNING)
	FileHandler.setLevel(logging.INFO)
	formatter = logging.Formatter("%(asctime)s %(name)s %(levelname)s %(message)s")
	streamHandler.setFormatter(formatter)
	FileHandler.setFormatter(formatter)
	logger.addHandler(streamHandler)
	logger.addHandler(FileHandler)
	return logger

# create conf file if the conf file not exists
if not os.path.exists('../conf/dev.ini'):
	config = ConfigParser()
	config['settings'] = {
		'dataPath': '../data/ml-100k',
		'resultPath': '../result',
		'logPath': '../log',
		'confPath': '../conf'
	}

	with open('../conf/dev.ini', 'w') as f:
		config.write(f)
else:
# load the conf file if the file created
	
	configParser = ConfigParser()
	configParser.read('../conf/dev.ini')
	#print(configParser.get('settings','logPath'))

argParser = argparse.ArgumentParser(description = 'args for recommender system parameters')
argParser.add_argument('--train_path', type = str, default = configParser.get('settings','dataPath') + '/u1.base', help = 'train file path')
argParser.add_argument('--test_path', type = str, default = configParser.get('settings','dataPath') + '/u1.test', help = 'test file path')
argParser.add_argument('--user_size', type = int, default = 943, help = 'user dimensions')
argParser.add_argument('--movie_size', type = int, default = 1682, help = 'movie dimensions')
argParser.add_argument('--compare_type', type = int, default = 2, help = 'comapre_type: 1 for user by user, 2 for item by item')
argParser.add_argument('--predict_type', type = int, default = 2, help = 'predict_type: 1 for no global, 2 for with global')
argParser.add_argument('--k', type = int, default = 15, help = 'num of neighbours')
argParser.add_argument('--iteration', type = int, default = 3, help = 'iteration of kmeans')
argParser.add_argument('--steps', type = int, default = 500, help = 'num of training steps')
argParser.add_argument('--alpha', type = float, default = 0.0002, help = 'learning rate for matrix factorization')
argParser.add_argument('--beta', type = float, default = 0.02, help = 'regularization rate for matrix factorization')
args = argParser.parse_args()







