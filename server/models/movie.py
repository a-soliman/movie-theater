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
            movie = MovieModel(movie['title'], movie['story_line'], movie['poster'], movie['trailer_link'])
            movies.append(movie)
        return movies
