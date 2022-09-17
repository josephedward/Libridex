**Recommendation System for Audiobook Shuffle App (Libridex)**
1. Scrape as much data as possible from librivox.org 
2. Store indexing information alongside classification data in database. 
3. Pull from database into python, and train our model via content filtering algorithm. 
4. Store the results as a set number of ‘recommended’ (ex. 3) audiobooks alongside each audiobook in the database. 
5. Serve these recommendations from Flask to the UI client layer application.  
    
**TBD**
- Returns recommendations based upon Cosine Similarity of TFIDF scores of book descriptions(provided this is a public-domain book that is in their library). Will be integrated as service into Node-React audiobook app. Will improve model and documentation with time. Need to run scraper again. Many thanks to Librivox for not throttling my requests while scraping their entire API. 

**Links**
- https://en.wikipedia.org/wiki/Tf%E2%80%93idf
- https://www.machinelearningplus.com/nlp/cosine-similarity/
- https://www.kdnuggets.com/2019/09/machine-learning-recommender-systems.html
- https://realpython.com/build-recommendation-engine-collaborative-filtering/
- https://towardsdatascience.com/various-implementations-of-collaborative-filtering-100385c6dfe0
- https://towardsdatascience.com/how-to-build-a-simple-recommender-system-in-python-375093c3fb7d
- https://towardsdatascience.com/building-a-content-based-book-recommendation-engine-9fd4d57a4da


**Also TBD**
- Pipeline
    - Sagemaker? 
    - Chalice : AWS Lambda framework for Python APIs 
- Containerization: Encapsulate and deploy various services Allows for AB model testing, fallback to tested services 
- Database 
    - Current dataset is denormalized; would have to create a table for books, as well as a table for matches. 
    - Eventually, you would create a user table and with it begin creating recommendations based upon collaborative filtering: profiling users and suggesting items based upon patterns of similar reaction.
