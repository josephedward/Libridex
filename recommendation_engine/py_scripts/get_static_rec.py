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
# warnings.filterwarnings('ignore')
executable_path = {'executable_path':'./resources/chromedriver'}
browser = Browser('chrome', **executable_path)
        

def static_getrecs(book):
    static_recs_path="./resources/combined_recommendations_v1.csv"
    recs_df=pd.read_csv(static_recs_path)
    for x in recs_df['book_title']:
        if x in book:
            rec_arr = recs_df.loc[recs_df['book_title'] == x]['book_recommendation_urls'].values
    type(rec_arr)
    pattern=r'(?i)\b((?:[a-z][\w-]+:(?:/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))';
    match = re.findall(pattern, str(rec_arr))
    rec_urls=[]
    for x in match:
        rec_urls.append(x[0])
    rec_objs=[]
    for x in rec_urls:
        browser.visit(x)
        search_page = browser.html
        soup = BeautifulSoup(search_page, 'html.parser')
        book_page= soup.find('div', class_="page book-page")
        title=book_page.find('h1').get_text()
        author=book_page.find('p', class_="book-page-author").get_text()
        img_url=book_page.find('div', class_="book-page-book-cover").find('img').get('src')
        rec_objs.append({
            'title':title,
            'author':author,
            'img_url':img_url
        })
    print(rec_objs)
    return rec_objs
