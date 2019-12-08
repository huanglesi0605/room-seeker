
# encoding=utf-8
"""
Create time : 2019-08-02
Update time : 2019-08-02
Author :  abc@unsw.edu.au
Description : modify the KDTree and partition the data into power of 2 groups 
"""
import math
import random
from helper import *



def calAverageSimilarity(Tvec, data, index):
	sim = 0
	for ind in index:
		s = Similarity(Tvec, data[ind])
		sim += s.Pearson_Correlation_Similarity(Tvec,data[ind])
	return sim * 1.0 / len(index)

def separateData(Tvec, data, index, mean_sim):
	left, right = [], []
	for i in index:
		s = Similarity(Tvec,data[i])
		if s.Pearson_Correlation_Similarity(Tvec,data[i]) < mean_sim: # partition the point to leftTree if the similarity is less than the mean 
			left.append(i)
		else:
			right.append(i)
	return left, right

class Node(object):
	def __init__(self, data = None, left = None, right = None):
		self.data = data
		self.left = left
		self.right = right 


class KDTree(object):
	def __init__(self,data,level):
		"""
			Constructor
			Args:
				data: training data
				level: the height of the tree
		"""
		self.groups = self.construct(data,level)
		self.groupmap = self.assignToCluster(data,self.groups)

	def construct(self,data,level):
		"""
			construct the tree
		"""
		clusters , index = [], []
		for i in range(len(data)):
			index.append(i)
		leftTree,rightTree = self.partition(data, index)
		clusters.append(leftTree)
		clusters.append(rightTree)

		for i in range(0, level-1):
			cnt = len(clusters)
			for j in range(cnt):
				g = clusters.pop(0)
				leftTree,rightTree = self.partition(data, g)
				clusters.append(leftTree)
				clusters.append(rightTree)
		return clusters

	def assignToCluster(self,data,groups):
		"""
			map the data point id to group id
		"""
		group_map = dict()

		for g, item in enumerate(groups):
			for item in groups[g]:
				group_map[item] = g
		return group_map	

	def partition(self, data, index):
		"""
			partition the data into two groups based on the target threshold
			of Pearson Similarity
		"""

		target = random.randint(0,len(index))
		if len(index) == 0:
			return [],[]
		if target == len(index):
			target -= 1
		
		Tvec = data[index[target]]
		mean_sim = calAverageSimilarity(Tvec, data, index)

		return separateData(Tvec, data, index, mean_sim)





