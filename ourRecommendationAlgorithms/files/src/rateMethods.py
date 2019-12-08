# encoding=utf-8
"""

Description : optimized indexing and searching methods for collaborative filtering
"""
from Recommender import *
from ballTree import * 
level=10

def predictOne(recommender, neighbours, i, train, type):
    recommender.predict(neighbours,train[i],train) if recommender.predict_type == 1 else recommender._predict(i,train[i],neighbours,train,recommender.type)

def CF(recommender, train, k, logger):
    """
        naive collaborative filtering
    """
    startTime = time()
    for i in tqdm(range(len(train))):
        try:
            neighbours = recommender.knn(k, train[i], train)
            predictOne(recommender, neighbours, i, train, recommender.predict_type)
            endTime = time()
            logger.info('\rcomplete progress {}%, running time {}s'.format((i+1)/len(train) *100, endTime-startTime))
        except Exception as e:
            print(e)
            continue
    return train

def CF_by_Kmeans(recommender, train, k, iterations, path, compare_type, logger):
    """
        index the data with kmeans and do collborative filtering
    """
    startTime = time()
    km = KMeans(path, k, iterations, compare_type, recommender.user_size, recommender.movie_size)
    groupmap = km.groupmap
    groups = km.groups
    for i in tqdm(range(len(train))):
        try:
            group_id = groupmap[i]
            group = groups[group_id]
            neighbours = recommender.knn(k,train[i],train[group])
            predictOne(recommender, neighbours, i, train, recommender.predict_type)
            endTime = time()
            logger.info('\rcomplete progress {}%, running time {}s'.format((i+1)/len(train) *100, endTime-startTime))
        except Exception as e:
            continue
    return train

def CF_by_Kdtree(recommender, train, k, path, logger):
    """
    modified KD Tree model: 
    do the cluster by KD Tree algorithm and find neighbours in the same branch.
    """
    print("building KDTree.....")
    startTime = time()
    t = KDTree(train, level)
    groupmap = t.groupmap
    groups = t.groups
    print("KDTree construction complete .....")
    for i in tqdm(range(len(train))):
        try:
            group_id = groupmap[i]
            group = groups[group_id]
            neighbours = recommender.knn(k, train[i], train[group])
            predictOne(recommender, neighbours, i, train, recommender.predict_type)
            endTime = time()
            #logger.info('\rcomplete progress {}%, running time {}s'.format((i+1)/len(train) *100, endTime-startTime))
        except Exception as e:
            print (e)
            continue
    return train

def CF_by_BallTree(recommender, train, k, path, logger):
    """
        Collaborative Filtering with ballTree, build ballTree data structure and do knn search on ballTree
    """
    startTime = time()
    tree = BallTree(train)
    print('doing ballTree searching...')
    for i in tqdm(range(len(train))):
        try:
            heap = []
            target = train[i]
            tree.searchBallTree(target, k, heap, tree.root, -1)
            nVecs = [item[1] for item in heap][1:]
            neighbours = recommender.knn(k, train[i], nVecs)
            predictOne(recommender, neighbours, i, train, recommender.predict_type)
            endTime = time()
            logger.info('\rcomplete progress {}%, running time {}s'.format((i+1)/len(train) *100, endTime-startTime))
        except Exception as e:
            print(e)
            continue
    return train





