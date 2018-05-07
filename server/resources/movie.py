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
        data = Movie.parser.parse_args()
        new_movie = MovieModel(None, data['title'], data['story_line'], data['poster'], data['trailer_link'])

        try:
            new_movie.save_to_db()
        except:
            return {'message': 'An error has occurred'}, 500
        return {'message': 'New Movie has been inserted'}, 201
    
    def put(self, _id):
        if not MovieModel.is_valid_id(_id):
            return {'message': 'Invaid Id'}, 400
        
        movie = MovieModel.find_by_id(_id)
        if movie is None:
            return {'message': 'Movie was not found'}, 404
        
        #parse the updated passed data.
        data = Movie.parser.parse_args()
        movie.title = data['title']
        movie.story_line = data['story_line']
        movie.poster = data['poster']
        movie.trailer_link = data['trailer_link']

        try: 
            movie.update_in_db()
        except:
            return {'message': 'An error has occurred'}, 500
        return {'message': 'Updated.'}, 200
    
    def delete(self, _id):
        if not MovieModel.is_valid_id(_id):
            return {'message': 'Invaid Id'}, 400
        
        movie = MovieModel.find_by_id(_id)
        if movie is None:
            return {'message': 'Movie was not found'}, 404
        
        try:
            movie.delete_from_db()
        except:
            return {'message': 'An error has occurred'}, 500
        return {'message': 'Deleted'}