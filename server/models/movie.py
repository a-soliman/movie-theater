from db import db
from bson.objectid import ObjectId

class MovieModel():
    def __init__(self, _id, title, story_line, poster, trailer_link):
        self._id = _id
        self.title = title
        self.story_line = story_line
        self.poster = poster
        self.trailer_link = trailer_link
    
    def json(self):
        return {
                "_id": str(self._id),
                "title": self.title,
                "story_line": self.story_line,
                "poster": self.poster,
                "trailer_link": self.trailer_link
            }

    @classmethod
    def get_all_movies(cls):
        movies_collection = db.movies
        movies = []

        for movie in movies_collection.find():
            movie = MovieModel( movie['_id'], movie['title'], movie['story_line'], movie['poster'], movie['trailer_link'])
            movies.append(movie)
        return movies
    
    @classmethod
    def find_by_id(cls, _id):
        movies_collection = db.movies
        result = movies_collection.find_one({'_id': ObjectId(_id)})

        try:
            movie = MovieModel(result['_id'], result['title'], result['story_line'], result['poster'], result['trailer_link'])
        except:
            return None
        
        return movie