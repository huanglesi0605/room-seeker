# encoding=utf-8
"""

Description : class for latent factorization recommender system
"""
import numpy as np
import sys
from time import time

class LF_Recommender(object):

    def __init__(self, train_path, test_path, num_users, num_items, K):
        """
          latent factor recommender constructor
            Args:
            train_path: training set file path
            test_path: test set file path
            num_users: user size for training set
            num_movies: movie size for training set
            K: latent factor, usually 25 or smaller
        """
        self.train = self.load_train(train_path,num_users,num_items)
        self.test = self.load_test(test_path,num_users,num_items)

        N = len(self.train)
        M = len(self.train[0])
        P = np.random.rand(N,K)
        Q = np.random.rand(M,K)
        nP, nQ = self.matrix_factorization(self.train, P, Q, K)
        self.prediction = np.matmul(nP,nQ.T)


    
    def load_train(self,train_path,num_users,num_items):
        """
            load the training data set
        """
        # generate utility matrix
        utility_matrix = np.zeros((num_users,num_items))
    
        with open(train_path) as file:
            for line in file:
                user_id = int(line.split()[0])-1
                movie_id = int(line.split()[1])-1
                rate = int(line.split()[2])
                utility_matrix[user_id][movie_id] = rate
        return utility_matrix
    
    def load_test(self,test_path,num_users,num_items):
        """
            load the test data set
        """
        test= np.zeros((num_users,num_items)) 
        with open(test_path) as file:
            for line in file:
                user_id = int(line.split()[0])-1
                movie_id = int(line.split()[1])-1
                rate = int(line.split()[2])
                test[user_id][movie_id] = rate
        return test

 
    def matrix_factorization(self, R, P, Q, K, steps=500, alpha=0.0002, beta=0.02):
        """
            # do prediction calculation, 
            # the default iteration number is 500, and learning rate is 0.0002
            # beta is the regularization parameter
        """
        print('start to do matrix factorization')
        Q = Q.T
        a = time()
        for step in range(steps):
            b = time()
            sys.stdout.write('\riterations: {}th, running time {}s'.format((step+1), b-a))
            for i in range(len(R)):
                for j in range(len(R[i])):
                    if R[i][j] > 0:
                        eij = R[i][j] - np.dot(P[i,:],Q[:,j])
                        for k in range(K):
                            P[i][k] = P[i][k] + alpha * (2 * eij * Q[k][j] - beta * P[i][k])
                            Q[k][j] = Q[k][j] + alpha * (2 * eij * P[i][k] - beta * Q[k][j])

        return P, Q.T

    def evaluation(self, prediction, result_path):
        """
           evaluate the test and prediction error
        """
        rmse = 0
        R = 0
        with open(result_path,'w') as fout:
            fout.write('user_id\tmovie_id\t_rate\tpredict\n')
            for i in range(len(self.test)):
                for j in range(len(self.test[0])):
                    if self.test[i][j] != 0:
                        rmse += (prediction[i][j] - self.test[i][j]) **2
                        R += 1
                        fout.write(str(i+1)+'\t'+str(j+1)+'\t'+str(self.test[i][j])+'\t'+str(prediction[i][j])+'\n')

        return (rmse**0.5),R


