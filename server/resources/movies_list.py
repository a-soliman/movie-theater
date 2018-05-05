from flask_restful import Resource

from models.movie import MovieModel

class Movies_List(Resource):
    def get(self):
        ''' 
        returns a list of movies
        '''
        return 'This should return a list of movies'
    