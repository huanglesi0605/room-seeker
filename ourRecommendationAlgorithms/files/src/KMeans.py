# encoding=utf-8
"""
Create time : 2019-08-02
Update time : 2019-08-02
Author :  abc@unsw.edu.au
Description : implementation for kmeans  
"""
import numpy as np
import random
import sys
from time import time
import math
from tqdm import tqdm
delta = 10


def cal_distance(vec1,vec2):
    dis = 0
    for i in range(len(vec1)):
        dis += (vec1[i]-vec2[i])**2
    return math.sqrt(dis)

def distributeGroups(k, data, centers):
	groups = [[] for x in range(k)]
	for i in tqdm(range(len(data))):
		min_dis = sys.maxsize
		group_id = 0
		for j in range(len(centers)):
			dis = cal_distance(centers[j],data[i])
			if dis < min_dis:
				min_dis = dis
				group_id = j
		groups[group_id].append(i)
	return groups

class KMeans(object):
	'''
	Clustering the data into k groups based on Eculidean distance
	'''
	def __init__(self, 
				path, 
				k,
				iteration,
				compare_type,
				num_users,
				num_items):
		"""
			Args:
				path: str
					  the training data path
				k: int
					number of clusters
				iteration: int
					number of iteration times
				comapre_type: int 
					1 for user by user and 2 for item by item
				num_users: int
					how many users in data
				num_items : int 
					how many movies in data
		"""
		self.iteration =iteration
		data = self._constructDataMatrix(path,num_users,num_items, 1) if compare_type == 1 else self._constructDataMatrix(path,num_items,num_users, 2)
		self.groups = self.run(k,data)
		self.groupmap = self.assignGroup(k,self.groups,data)
		self.num_users = num_users
		self.num_items = num_items
	

	def _constructDataMatrix(self,path,num_users,num_items,type):
	    dataMatrix = np.zeros((num_users,num_items))
	    file = open(path)
	    for line in file:
	        uid = int(line.split()[0]) - 1
	        iid = int(line.split()[1]) - 1
	        score = int(line.split()[2])
	        if type == 1:
	        	dataMatrix[uid][iid] = score
	        else:
	        	dataMatrix[iid][uid] = score
	    file.close()
	    return dataMatrix

	def distance(self,vec1,vec2):
	    dis = 0
	    for i in range(len(vec1)):
	        dis += (vec1[i]-vec2[i])**2
	    return math.sqrt(dis)

	def getCentroid(self,group,dataMatrix):
	    group_data = []
	    for item in group:
	        group_data.append(dataMatrix[item])
	    group_data = np.array(group_data)
	    row,column = group_data.shape[0],group_data.shape[1]
	    new_center = []
	    for i in range(column):
	        new_center.append(sum(group_data[:,i])/row)
	    return new_center


	def getLoss(self,groups,centers,data):
	    loss = 0
	    for g in range(0, len(groups)):
	        center = centers[g]
	        for u in groups[g]:
	            loss += self.distance(data[u],center)            
	    return loss

	def run(self,k,data):
		groups = []
		num_users,num_items = data.shape[0],data.shape[1]
		centers = []
		for i in range(0, k):
			center = data[random.randint(0,num_users-1)]
			centers.append(center)
		cnt = 0
		startTime = time()
		last_generation_cost = 0
		print('Kmeans starts running...')
		for _ in range(self.iteration):
			print('Running the {}th 	s'.format(cnt))
			cnt += 1
			endTime = time()
			groups = distributeGroups(k, data, centers)
			for g in range(len(groups)):
				try:
					new_center = self.getCentroid(groups[g],data)
					centers[g] = new_center
				except Exception as e:
					continue
			loss = self.getLoss(groups,centers,data)
			if (last_generation_cost - loss) ** 2 < delta ** 2:
				return groups
			prev_loss = loss
		print('\rRound: {}, running time {}s, total loss is: {}'.format(cnt, endTime-startTime, loss))
		return groups

	def assignGroup(self,k,groups,data):
		"""
			assign each data to its cluster 
		"""
		mapping = dict()
		for cluster in range(len(groups)):
			for item in groups[cluster]:
				mapping[item] = cluster
		return mapping


    
