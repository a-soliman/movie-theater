from flask_restful import Resource, reqparser

from models.movie import MovieModel

class Movie(Resource):
    # the following will parse json data passed with the requist if any
    parser = reqparser.RequestParser()

    parser.add_argument('title', 
        type = str,
        required = True,
        help = 'Movie title is required.'
    )

    parser.add_argument('story_line', 
        type = str,
        required = True,
        help = 'Movie story-line is required.'
    )

    parser.add_argument('poster', 
        type = str,
        required = True,
        help = 'a URL to the movie poster is required.'
    )

    parser.add_argument('trailer_link', 
        type = str,
        required = True,
        help = 'a URL to Movie video trailer is required.'
    )
    
    def get(self):
        pass
    
    def post(self):
        pass
    
    def put(self):
        pass
    
    def delete(self):
        pass