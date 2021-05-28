from flask import jsonify
import pandas as pd
from bs4 import BeautifulSoup
import time 
from splinter import Browser
# from textblob import TextBlob
import nltk
nltk.download('averaged_perceptron_tagger')
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer
import re
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import random
from tqdm import tqdm
from gensim.models import Word2Vec 
import matplotlib.pyplot as plt
# %matplotlib inline
import warnings;
warnings.filterwarnings('ignore')


def get_rec(data_df,book):
    language="English"
    print("Test DataFrame Columns: ", data_df.columns)
    book_df=data_df
    title=book
    print("Title: ", book)
    # Matching the language with the dataset and reset the index
    # book_name=title
    try:
# Matching the language with the dataset and reset the index
        data = book_df.loc[book_df['language'] == language]  
        data.reset_index(level = 0, inplace = True) 
        print('Convert the index into series')
        indices = pd.Series(data.index, index = data['title'])
    # print(indices)
        print("Converting the book title into vectors and used bigram")
        tf = TfidfVectorizer(analyzer='word', ngram_range=(2, 2), min_df = 1, stop_words='english')
        tfidf_matrix = tf.fit_transform(data['cleaned_desc'])
    # print(tfidf_matrix)
        print("Calculating the similarity measures based on Cosine Similarity")
        sg = cosine_similarity(tfidf_matrix, tfidf_matrix)
    # print(indices)    
        print("Get the index corresponding to original_title")       
        idx = indices[title]
        print('Get the pairwise similarity scores') 
        sig = list(enumerate(sg[idx]))
    # print(sig)
        print("Sort the books")
        sig = sorted(sig, key=lambda x: x[1].any(), reverse=True)
        print('Scores of the 5 most similar books') 
        sig = sig[1:6]
        print("Book indicies")
        movie_indices = [i[0] for i in sig]
        print("Top 5 book recommendation")
        rec = data[['title']].iloc[movie_indices]   
        print(rec)
        rec = data[['title']].iloc[movie_indices]
        rec_whole_df = book_df[book_df['title'].isin(rec['title'])]
        return rec_whole_df.to_json(orient='records')
    # print(rec_whole_df.to_json(orient='records'))
    # print(book_df.loc[book_df['title'==book_name]])
        # print(title)
        # rec_whole_df['lib_url'].to_list()
    except:
        print("error")
        return("error")
        # if err== MemoryError:
        #     import IPython
        #     app = IPython.Application.instance()
        #     app.kernel.do_shutdown(True)
        # print(err.message)
        # print("continue bout ya business")
        # print("Recommendations: ")
        # for i in rec['title']:
        #     print(data_df[data_df['title']==i])

        # rec_whole_df[i]=data_df[data_df['title']==i]
    #         response = requests.get(i)
    #         img = Image.open(BytesIO(response.content))
    #         plt.figure()
    #         print(plt.imshow(img))
    # return rec