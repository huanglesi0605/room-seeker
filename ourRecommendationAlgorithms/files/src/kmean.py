import os
import numpy
import math
import random

#data = np.zeros((20,1))


class KMeans(object):

	def __init__(self,path, k, iteration,user_num, item_num):

		data = numpy.empty((user_num, item_num)).tolist()

		file = open(path)

		for line in file:
			temp = line.split()
			user_id = int(temp[0])
			film_id =int(temp[1])
			mark = int(temp[2])
			data[user_id-1][film_id-1] = mark

		self.iteration = iteration
		self.user_num = user_num
		self.item_num = item_num
		self.data = data
		self.k = k
		self.cluster_center = self.random_center()
		self.distribution = self.Distribution()
		self.KMeans_runner()



	def cal_distance(self, cluster_center, data_instance):
		init_distance = 0

		for i in range(0,len(cluster_center)):
			difference = cluster_center[i] - data_instance[i]
			squared_difference = difference**2
			init_distance = init_distance + squared_difference
		distance = math.sqrt(init_distance)
		return distance


	#print(data)
	#data = [[3, 3, 3], [3, 3, 3], [1, 1, 1], [2, 2, 2], [1, 1, 1], [4, 4, 4], [2, 2, 2], [5, 5, 5], [3, 3, 3], [3, 3, 3], [2, 2, 2], [5, 5, 5], [5, 5, 5], [3, 3, 3], [3, 3, 3], [3, 3, 3], [5, 5, 5], [2, 2, 2], [4, 4, 4], [2, 2, 2]]


	def random_center(self):
		temp =[random.randint(0,self.user_num) for i in range(self.k)]
		cluster_center = []
		for i in range(self.k):
			cluster_center.append(self.data[temp[i]])
		return cluster_center
	

	# print(cluster_center)
	# cluster_center = [[3, 3, 3], [4, 4, 4], [3, 3, 3], [5, 5, 5]]

	def Distribution(self):
		distribution = [[] for _ in range(len(self.cluster_center))]
		for item in self.data:
			min_dis = float('inf')
			index = 0
			for x in range(self.k):
				temp = self.cal_distance(self.cluster_center[x], item)
				if temp < min_dis:
					min_dis = temp
					index = x
			distribution[index].append(item)
		return distribution


	def update_new_centers(self):
		new_centers = []
		for i in range(self.k):
			temp = numpy.mean(self.distribution[i],axis=0)
			temp = temp.tolist()
			new_centers.append(temp)

		return new_centers


	def cal_var(self):
		cost = 0
		for i in range(len(self.distribution)):
			temp_var_1 = self.cluster_center[i]
			for j in range(len(self.cluster_center)):
				temp_var_2 = self.cluster_center[j]
				cost = cost + self.cal_distance(temp_var_1,temp_var_2)
		return cost



	def KMeans_runner(self):
		for i in range(self.iteration):
			self.distribution = self.Distribution()
			self.cluster_center = self.update_new_centers()
			print(self.cal_var())







