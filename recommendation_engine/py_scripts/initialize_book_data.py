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
from flask import request

def initialize():
    # file = request.get(base+"/test_csv")
    test_book_df = pd.read_csv("./resources/book_obj_list_v2.csv")
    # test_book_df = pd.read_csv("/test_csv/")
    test_book_df['cleaned_desc'] = test_book_df['description'].apply(func = make_lower_case)
    # test_book_df['cleaned_desc'] = df.cleaned_desc.apply(func = make_lower_case)
    # test_book_df['cleaned_desc'] = test_book_df.cleaned_desc.apply(func = remove_stop_words)
    test_book_df['cleaned_desc'] = test_book_df.cleaned_desc.apply(func=remove_punctuation)
    test_book_df['cleaned_desc'] = test_book_df.cleaned_desc.apply(func=remove_html)
    return test_book_df


    # Function for removing NonAscii characters
def _removeNonAscii(s):
    return "".join(i for i in s if  int(i)<128)# Function for converting into lower case
def make_lower_case(text):
    return str(text).lower()# Function for removing stop words
def remove_stop_words(text):
    text = text.split()
    stops = set(stopwords.words("english"))
    text = [w for w in text if not w in stops]
    text = " ".join(text)
    return text# Function for removing punctuation
def remove_punctuation(text):
    tokenizer = RegexpTokenizer(r'\w+')
    text = tokenizer.tokenize(text)
    text = " ".join(text)
    return text
#Function for removing the html tags
def remove_html(text):
    html_pattern = re.compile('<.*?>')
    return html_pattern.sub(r'', text)# Applying all the functions in description and storing as a cleaned_desc