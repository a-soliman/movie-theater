from flask import Flask
from flask_restful import Api, Resource

from resources.movie import Movie
from resources.movies_list import Movies_List


app = Flask(__name__)
api = Api(app)

api.add_resource(Movies_List, '/')
api.add_resource(Movie, '/<string:id>')

if __name__ == '__main__':
    print('Working...')
    app.run(port=5000, debug=True)