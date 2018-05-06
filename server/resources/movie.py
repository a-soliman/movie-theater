from flask_restful import Resource, reqparse

from models.movie import MovieModel

class Movie(Resource):
    # the following will parse json data passed with the requist if any
    parser = reqparse.RequestParser()

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

    def get(self, _id):
        if not MovieModel.is_valid_id(_id):
            return {'message': 'Invaid Id'}, 400
        
        movie = MovieModel.find_by_id(_id)
        if movie:
            return movie.json()
        return {'message': 'Not Found'}, 404
    
    def post(self, _id):
        pass
    
    def put(self, _id):
        pass
    
    def delete(self, _id):
        pass