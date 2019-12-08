# encoding=utf-8
"""

Description : class for ballTree
"""
import numpy as np
import heapq
from collections import Counter
import random

class BallTreeNode(object):
	"""
		treeNode class
	"""
	def __init__(self, val, radius, leafs):
		"""
			Args:
				val : vector
					value for user or item
				radius : float
					radius for the ball
				leafs : int
					number of leafs under this node
		"""
		self.val = val
		self.radius = radius
		self.left = None
		self.right = None
		self.leafs = leafs

class BallTree(object):
	"""
		class for ballTree
	"""
	def __init__(self, data):
		"""
			Args:
				data: str
					file path for the training data
		"""
		print('building the ball tree .....')
		self.root = self.constructBallTree(data)
		print('ball tree construction completed')

	def getDistance(self, val1, val2):
		"""
			calculate the distance for vector val1 and vector val2
		"""
		sqrSum = 0
		for i in range(len(val1)):
			if val1[i] * val2[i] != 0:
				dif = val1[i] - val2[i]
				sqrSum += dif * dif
			else:
				sqrSum += 0.001
			
		return sqrSum

	def getCentroid(self, allPoints):
		"""
			calculate the centroid point for the cluster
		"""
		sums = [0 for _ in range(len(allPoints[0]))]
		for p in allPoints:
			for i in range(len(p)):
				sums[i] += p[i]

		for i in range(len(allPoints[0])):
			sums[i] /= len(allPoints)
		return sums

	def getFurthest(self, target, allPoints):
		"""
			find the point among the allPoints cluster 
			which has the largest distance to the target point
		"""
		furthest = (-1, allPoints[0])
		for p in allPoints:
			distance = self.getDistance(target, p)
			if distance > furthest[0]:
				furthest = (distance, p)
		return furthest[1]

	def seperateTwoBalls(self, allPoints, f1, f2):
		"""
			separate the allPoints cluster into two balls based on the two center points f1 and f2
		"""
		balls = [[], []]
		for p in allPoints:
			distance1 = self.getDistance(p, f1)
			distance2 = self.getDistance(p, f2)
			if distance1 < distance2:
				balls[0].append(p)
			else:
				balls[1].append(p)

		if len(balls[0]) == 0:
			balls[0].append(balls[1][0]) 
			balls[1] = [balls[1][1]]
		elif len(balls[1]) == 0:
			balls[1].append(balls[0][0])
			balls[0] = [balls[0][1]]
		return balls

	def constructBallTree(self, data):
		"""
			recursively construct the tree
		"""
		if len(data) == 1:
			return BallTreeNode(data[0], 0, 0)
		else:

			n = len(data)
			startPointIdx = random.randint(0, n-1)
			startPoint = data[startPointIdx]
			f1 = self.getFurthest(startPoint, data)
			f2 = self.getFurthest(f1, data)
			centroid = self.getCentroid([f1, f2])
			balls = self.seperateTwoBalls(data, f1, f2)
			radius = self.getDistance(f1, centroid)
			ballNode = BallTreeNode(centroid, radius, n)
#			print(np.array(balls[0]).shape, np.array(balls[1]).shape)
			if len(balls[0]) > 0:
				ballNode.left = self.constructBallTree(balls[0])
			if len(balls[1]) > 0:
				ballNode.right = self.constructBallTree(balls[1])

			return ballNode

	def searchBallTree(self, target, k, heap, treeNode, distance = -1):
		"""
			find the k nearest points among the tree for the target point
		"""

		d = self.getDistance(target, treeNode.val) if distance == -1 else distance

		if len(heap) >= k:
			(curMax, val) = heap[-1]
			#[curMax, val] = heapq.heappop(heap)
			#heapq.heappush(heap, (curMax, val))
			if d - treeNode.radius >= curMax:
				return
		if treeNode.leafs == 0:
			heap.append((d, treeNode.val))
			#heapq.heappush(heap, (d, treeNode.val))

			if len(heap) > k:
				#heapq.heappop(heap)
				heap = sorted(heap, key = lambda k: k[0])
				heap.pop(-1)
		else:
			d1 = self.getDistance(target, treeNode.left.val)
			d2 = self.getDistance(target, treeNode.right.val)

			if d1 < d2:
				self.searchBallTree(target, k, heap, treeNode.left, d1)
				self.searchBallTree(target, k, heap, treeNode.right, d2)
			else:
				self.searchBallTree(target, k, heap, treeNode.right, d2)
				self.searchBallTree(target, k, heap, treeNode.left, d1)






