# encoding=utf-8
"""

Description : helper functions 
"""
import math


def evalLoss(dataMatrix, test_path, compare_type, result_path, recommender):
    """
    Read the test data and comapre with the predict data. Calculate the RMSE
    """
    rmse = 0
    R = 0
    predict=0
    with open(result_path,'w') as fout:
        fout.write('user_id\tmovie_id\trate\tpredict\n')
        file = open(test_path)
        for line in file:
            try:
                R+=1
                user_id, movie_id, rate = int(line.split()[0])-1, int(line.split()[1])-1, int(line.split()[2])
                predict = dataMatrix[user_id][movie_id] if compare_type == 1 else dataMatrix[movie_id][user_id]
                if predict == 0:
                    predict = recommender.user_mean[user_id] + recommender.movie_mean[movie_id] - recommender.global_average
                if predict != 0:
                    rmse += (predict- rate)**2 
                else:
                    R -= 1
                fout.write(str(user_id+1)+'\t' + str(movie_id+1)+'\t'+str(rate) + '\t' + str(predict)+'\n')
            except Exception as e:
                print(e)
                continue
    rmse = math.sqrt(rmse) 
    file.close()
    return rmse, R



class Similarity:
    def __init__(self, vec1,vec2):
        """
           constructor
        """
        self.vec1 = vec1
        self.vec2 = vec2
    
    
    def removeZeros(self,vec1,vec2):
        """
            remove dimentions with value 0
        """
        v1, v2 = [], []
        for i in range(len(vec1)):
            if vec1[i]!= 0 and vec2[i] != 0:
                v1.append(vec1[i])
                v2.append(vec2[i])
        return v1,v2
    
    def Pearson_Correlation_Similarity(self,vec1,vec2):
        """
            calculate the pearson similarity of two vectors
        """
        v1,v2 = self.removeZeros(vec1,vec2)
        if v1 != v2:
            mean1 = sum(v1)/len(v1)
            mean2 = sum(v2)/len(v2)
            sim = 0
            for i in range(0, len(v1)):
                sim += (v1[i]-mean1)*(v2[i]-mean2)
            t1 = math.sqrt(sum([(x-mean1)**2 for x in v1]))
            t2 = math.sqrt(sum([(x-mean2)**2 for x in v2]))
            return 0 if t1*t2 == 0 else  sim /(t1*t2)
        return 1 
    