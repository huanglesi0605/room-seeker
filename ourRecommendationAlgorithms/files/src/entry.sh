pip3 install -r requirements.txt


# run example
python3 main.py --train_path='../data/ml-100k/u1.base'\
				--test_path='../data/mk-100k/y1.test'\
				--user_size=943\
				--movie_size=1682\
				--compare_type=1\
				--predict_type=1\
				--k=5\
				--steps=500\
				--alpha=0.0002\
