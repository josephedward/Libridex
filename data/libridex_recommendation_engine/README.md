**Setup :**
*source ./local_init.sh*


Returns JSON of recommendations based upon Cosine Similarity of TFIDF scores of book descriptions(provided this is a public-domain book that is in their library). Will be integrated as service into Node-React audiobook app. Will improve model and documentation with time. Need to run scraper again. Many thanks to Librivox for not throttling my requests while scraping their entire API. 


https://en.wikipedia.org/wiki/Tf%E2%80%93idf

https://www.machinelearningplus.com/nlp/cosine-similarity/


Backend is easily overloaded on heroku; wait a little while if you try to view the data and it throws a 500 