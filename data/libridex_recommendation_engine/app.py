from flask import Flask, render_template, redirect, request, jsonify
import pandas as pd
import urllib
import os
from bs4 import BeautifulSoup
import time 
from splinter import Browser
# from textblob import TextBlob
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
nltk.download('averaged_perceptron_tagger')
from nltk.corpus import stopwords
nltk.download('stopwords')
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
from dotenv import load_dotenv
load_dotenv()
import sqlalchemy as sa
from sqlalchemy import create_engine
from sql import pgControls
 
app = Flask(__name__)


@app.route("/", methods=['GET'])
def default():
    return render_template("index.html")


@app.route("/load072420", methods=['GET'])
def load072420():
    pgControls.createBookList072420()
    return ""

@app.route("/displaydata", methods=['GET'])
def display072420():
    bookTableHTML = pgControls.displayBookList072420()
    return render_template('table.html')
    # return render_template("booktable.html",bookTableHTML=bookTableHTML)


@app.route("/init_db", methods=["GET"])
def init_db():
    # scrape_to_pg.initialize_db()
    return render_template("dbstats.html", dbState=scrape_to_pg.initialize_db())



if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
    app.config['TEMPLATES_AUTO_RELOAD'] = True

