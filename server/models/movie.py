from db import db
from bson.objectid import ObjectId

class MovieModel():
    '''
    This class acts as a blueprint for the movie object,
    - it includes a set of methods to interact with the database performing CRUD operations
    - it includes json() method that returns the JSON converted version of the movie object
    
    Notes: 
        while performing POST request using the method 'save_to_db ()', make sure to pass None for the (_id) argument,
        Py-Mongo will create an objectId for the movie as it saves the instance to the database
    
    Args: 
        _id (str): a string of the _id, which will be converted to an objectId before matching in the database.
        title (str): represents the movie title.
        story_line (str): represents the movie's storyline.
        poster (str): a URL to the movie's poster.
        trailer_link (str): a youtube URL to the movie's trailer link
    
    Methods: 

    '''

    def __init__(self, _id, title, story_line, poster, trailer_link):
        self._id = _id
        self.title = title
        self.story_line = story_line
        self.poster = poster
        self.trailer_link = trailer_link

    @classmethod
    def is_valid_id(cls, _id):
        # Checks if the passed id is valid
        return ObjectId.is_valid(_id)

    @classmethod
    def get_all_movies(cls):
        # returns a list containg all the movies from DB
        movies_collection = db.movies
        movies = []

        for movie in movies_collection.find():
            movie = MovieModel( movie['_id'], movie['title'], movie['story_line'], movie['poster'], movie['trailer_link'])
            movies.append(movie)
        return movies
    
    @classmethod
    def find_by_id(cls, _id):
        # Finds a movie by ID
        movies_collection = db.movies
        result = movies_collection.find_one({'_id': ObjectId(_id)})

        try:
            movie = MovieModel(result['_id'], result['title'], result['story_line'], result['poster'], result['trailer_link'])
        except:
            return None
        
        return movie

    def json(self):
        # returns a JSON formated version of the instance 
        return {
                "_id": str(self._id),
                "title": self.title,
                "story_line": self.story_line,
                "poster": self.poster,
                "trailer_link": self.trailer_link
            }
    
    def save_to_db(self):
        # saves to DB
        movies_collection = db.movies
        movie_id = movies_collection.insert({"title": self.title, "story_line": self.story_line, "poster": self.poster, "trailer_link": self.trailer_link})
        return movie_id
    
    def delete_from_db(self):
        # deltes from DB
        movies_collection = db.movies
        result = movies_collection.remove({'_id': ObjectId(self._id)})
        return result
    
    def update_in_db(self):
        # updates a movie in the db 
        movies_collection = db.movies
        movies_collection.update({'_id': ObjectId(self._id)}, {'$set': {"title": self.title, "story_line": self.story_line, "poster": self.poster, "trailer_link": self.trailer_link}})
        return 
        