import pandas as pd
from bs4 import BeautifulSoup
import time 
from splinter import Browser
# from textblob import TextBlob
import nltk
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
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
import warnings;
import requests
import os
import sqlalchemy as sa
from sqlalchemy import create_engine



def initialize_db():
    # dbStateObj = type('dbStateObj', (object,), {})
    # dbState = dbStateObj()
    dbState=pd.DataFrame()
    print(os.environ)
    is_prod =os.environ['PWD'] == "/app"
    if(is_prod):
        print("is prod")
        # dbState={"isProd":True}
        dbState['isProd']=str(True)
        DB_URL= os.environ['HEROKU_POSTGRESQL_JADE_URL']
        print("DB URL: ",DB_URL)
    else:
        print("not prod")
        # dbState.isProd=False
        dbState['isProd']=str(False)
        DB_URL=os.getenv("DB_URL")
        print("DB URL: ",DB_URL)
    engine = create_engine(DB_URL)
    print(engine.table_names())
    # dbState={"URL":DB_URL}
    dbState['URL']=str(DB_URL)
    dbState['tables']=engine.table_names()
    # dbInfo=pd.DataFrame(dbState, index=[0])
    print(dbState)
    return engine
    # dbState
    

engine = initialize_db();


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

def createBookList072420():
    print("cleaning book list")
    book_df = pd.read_csv('https://raw.githubusercontent.com/josephedward/Libridex_Recommendation_Engine/master/notebooks/lbvx_book_list_072420')
    book_df['cleaned_desc'] = book_df['description'].apply(func = make_lower_case)
    # testdf['cleaned_desc'] = df.cleaned_desc.apply(func = make_lower_case)
    book_df['cleaned_desc'] = book_df.cleaned_desc.apply(func = remove_stop_words)
    book_df['cleaned_desc'] = book_df.cleaned_desc.apply(func=remove_punctuation)
    book_df['cleaned_desc'] = book_df.cleaned_desc.apply(func=remove_html)
    # book_df.dropna()
    book_df.drop(book_df.columns[book_df.columns.str.contains('unnamed',case = False)],axis = 1, inplace = True)
    print(book_df.head(5))
    book_df.to_sql(name='book_table', con=engine, if_exists='append', index=False)
    return ""

def displayBookList072420():
    book_df = pd.read_sql_table(
    "book_table",
    con=engine)
    print(book_df)
    return book_df.to_html("./templates/table.html")



# rec_whole_objs=[]                    
# for x in range(16000):
#     # x=47
#     print("Searching Librivox ID: ",x)
#     librivox_id_search = f'https://librivox.org/api/feed/audiobooks/?id={x}'            
#     # Use requests to retrieve data from a given URL
#     # Parse the whole HTML page using BeautifulSoup
#     # librivox_id_search = 'https://librivox.org/api/feed/audiobooks/?id=52'
#     try:
#       lbvx_response = requests.get(librivox_id_search)
#       soup = BeautifulSoup(lbvx_response.text, 'html.parser')
#       lib_id=soup.find("id").get_text()
#       title=soup.find("title").get_text()
#       description=soup.find("description").get_text()
#       language=soup.find("language").get_text()
#       copyright_year=soup.find("copyright_year").get_text()
#       lib_book_url=soup.find('url_librivox').get_text()
#       author_fname= soup.find('author').find('first_name').get_text()
#       author_lname= soup.find('author').find('last_name').get_text()
#       author= author_fname+" "+author_lname
#       book_page_resp = requests.get(lib_book_url)
#       soup = BeautifulSoup(book_page_resp.text, 'html.parser')
#       genre=soup.find_all('p', class_='book-page-genre')[0].get_text()
#       genre_arr=genre.split(":")
#       genre=genre_arr[1]
#       img_url=soup.find('div', class_="book-page-book-cover").find('img').get('src')
#       # book_objs.append
#       book_scrape_df = pd.DataFrame([{"lib_id":lib_id,
#                   "title":title,
#                   "author":author,
#                   "genre":genre,
#                   "description":description,
#                   "language":language,
#                   "copyright_year":copyright_year,
#                   "lib_book_url":lib_book_url,
#                   "img_url":img_url                  
#                       }])
#       print(book_scrape_df)
#       runFlag = True
#     except:
#       print("couldn'y locate : ",x )
#       runFlag = False


