from flask import Flask
from flask_restful import Api, Resource

from resources.movie import Movie
from resources.movies_list import Movies_List

app = Flask(__name__)
api = Api(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response
    
api.add_resource(Movies_List, '/')
api.add_resource(Movie, '/<string:_id>')

if __name__ == '__main__':
    print('Working...')
    app.run(port=5000, debug=True)