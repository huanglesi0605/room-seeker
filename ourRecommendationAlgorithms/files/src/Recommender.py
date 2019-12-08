# encoding=utf-8
"""

Description : recommender class file, which contains multiple methods to do the recommendation
"""

import numpy as np
import sys
from time import time
from copy import deepcopy
import math
import queue as Q
from tqdm import tqdm
from helper import *
from KMeans import *
from KDTree import *
from ballTree import *

def readFile(dataMatrix, path, type):
    file = open(path)
    for line in tqdm(file):
        user_id, movie_id, score = int(line.split()[0])-1, int(line.split()[1])-1, int(line.split()[2])
        if type == 1:
            dataMatrix[user_id][movie_id] = score
        else:
            dataMatrix[movie_id][user_id] = score
    file.close()
    return dataMatrix

class Recommender(object):

    def __init__(self, 
                path, 
                user_size,
                movie_size,
                compare_type,
                predict_type):
        """
        collaborative filtering recommender constructor
        Args:
            path: training set file path
            user_size: user size for training set
            movie_size: movie size for training set
            comapre_type: 1 for user by user 2 for item by item
            predict_type: 1 for no global    2 for with global
        """
        self.user_size = user_size
        self.movie_size = movie_size
        self.predict_type = predict_type
        self.path = path
        self.type = compare_type
        self.global_average = 0
        self.user_mean = []
        self.movie_mean = []
        self.train = self.get_user_train(path) if self.type == 1 else self.get_item_train(path)

    
    def get_user_train(self, path):
        """
        load user by user model 
        Args:
            path : str
                   path for the train data
        Returns: 
            dataMatrix : numpy array with dimensions = (self.user_size,self.movie_size)

        """
        print('loading dataset....')
        dataMatrix = np.zeros((self.user_size,self.movie_size)) #(row:user,column:item)
        dataMatrix = readFile(dataMatrix, path, 1)
        u1 = deepcopy(dataMatrix)
        rated = (u1!=0)*1
        self.global_average = sum(sum(dataMatrix))/sum(sum(rated))
        user_mean = []
        for val in dataMatrix:
            if sum((val!=0)*1) != 0:
                user_mean.append(sum(val)/sum((val!=0)*1))
            else:
                user_mean.append(0)
        self.user_mean = user_mean
        movie_mean = []
        for i in tqdm(range(self.movie_size)):
            total,count = 0,0
            for j in range(self.user_size):
                if dataMatrix[j][i] != 0:
                    count = count +  1
                total =total +  dataMatrix[j][i]
            if count == 0:
                movie_mean.append(0)
            else:
                movie_mean.append(total / count)
        self.movie_mean = movie_mean
        print('loading dataset finished')
        return dataMatrix

    def get_item_train(self, path):
        """
            load item by item model
            Args: 
                path : str
                   file path for the item train file
            Returns:
                dataMatrix : numpy array with dimensions = (self.movie_size,self.user_size)

        """
        dataMatrix = np.zeros((self.movie_size,self.user_size)) #(row:user,column:item)
        # generate utility matrix
        print('loading dataset....')
        dataMatrix = readFile(dataMatrix, path, 2)
        u1 = deepcopy(dataMatrix)
        score = (u1!=0)*1
        self.global_average = sum(sum(dataMatrix))/sum(sum(score))
        movie_mean = []
        for val in dataMatrix:
            movie_mean.append(0) if sum((val!=0)*1) == 0 else movie_mean.append(sum(val)/sum((val!=0)*1))
        self.movie_mean = movie_mean
        user_mean = []
        for i in range(0,self.user_size):
            a = sum(dataMatrix[:,i])
            b = sum((dataMatrix[:,i]!=0)*1)
            user_mean.append(a/b)
        self.user_mean = user_mean
        print('loading dataset finished')
        return dataMatrix

    def knn(self,k,user,train):
        """
        to predict the value of missing value 
        need k neighbours to predict
        function to read the data for k neighbour and predict 
        Args:
            k : int 
                number of neighbours
            user : single numpy array 
                target vector
            train :  numpy array matrix
                dataset to search
        Returns:
             neighbours : list
        """
        neighbours = []
        
        for u in range(0, len(train)):
            s = Similarity(user, train[u])
            sim = s.Pearson_Correlation_Similarity(user,train[u])
            if len(neighbours) <= k:
                neighbours.append([sim,u])
            else: 
                neighbours.append([sim,u])
                neighbours = sorted(neighbours, key = lambda k: k[0])
                neighbours = neighbours[1:]
                  
        return neighbours[:-1]

    def get_user_bias(self, user_index, movie_index):
        """
            calculate the bias for user or movie
            if type == 1, calculate bias for user model
            if type == 2, calculate bias for movie model
        """
       
        average_user_score = self.user_mean[user_index] if self.type == 1 else self.user_mean[movie_index]
        average_movie_score = self.movie_mean[movie_index] if self.type == 1 else self.movie_mean[user_index]
        return average_user_score + average_movie_score - self.global_average

    def _predict(self, user_index, user, neighbours, training, compare_type):
        """
            predict the score with global bias
        """
        score, denomitor = 0, 0  
        for i in range(len(user)):
            if user[i] == 0:
                user_bxi = self.get_user_bias(user_index, i)
                for n in neighbours:
                    if training[n[1]][i] != 0:
                        neighbour_bxi = self.get_user_bias(n[1], i)
                        score += n[0] * (training[n[1]][i] - neighbour_bxi)
                        denomitor += n[0]

                    user[i] = sum(self.user_mean)*1.0 / len(self.user_mean) if denomitor == 0.0 else user_bxi + score / denomitor

    def predict(self, neighbours, user, train):
        """
            predict the score without global bias
        """
        score, denomitor = 0, 0
        for i in range(len(user)):
            if user[i] == 0.0:
                for n in neighbours:
                    if train[n[1]][i] != 0:      
                        score += n[0] * train[n[1]][i]
                        denomitor += n[0]
        
                user[i] = sum(self.user_mean)*1.0 / len(self.user_mean) if denomitor == 0.0 else score / denomitor           


