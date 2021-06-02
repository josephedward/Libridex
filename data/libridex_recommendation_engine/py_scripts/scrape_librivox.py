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


executable_path = {'executable_path':'../resources/chromedriver'}
browser = Browser('chrome', **executable_path)


def scrape():
    book_objs=[]
    for x in range(15000):
        print("Searching Librivox ID: ",x)
        librivox_id_search = f'https://librivox.org/api/feed/audiobooks/?id={x}'
        # librivox_id_search = f'https://librivox.org/api/feed/audiobooks/?id=65'
        try:
            browser.visit(librivox_id_search)
            librivox_id_search_page = browser.html
            soup = BeautifulSoup(librivox_id_search_page, 'html.parser')
            lib_id=soup.find("id").get_text()
            title=soup.find("title").get_text()
            description=soup.find("description").get_text()
            language=soup.find("language").get_text()
            copyright_year=soup.find("copyright_year").get_text()
            lib_url=soup.find('url_librivox').get_text()
            browser.visit(lib_url)
            book_url_page=browser.html
            soup = BeautifulSoup(book_url_page, 'html.parser')
            genre=soup.find_all('p', class_='book-page-genre')[0].get_text()
            genre_arr=genre.split(":")
            genre=genre_arr[1]
            book_objs.append({"lib_id":lib_id,
                        "title":title,
                        "genre":genre,
                        "description":description,
                        "language":language,
                        "copyright_year":copyright_year,
                        "lib_url":lib_url                  
                            })
        except: 
            print("couldn't locate")
            return book_objs