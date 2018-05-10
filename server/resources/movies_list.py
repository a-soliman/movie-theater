from flask_restful import Resource

from models.movie import MovieModel

class Movies_List(Resource):
    def get(self):
        ''' 
        returns a list of movies
        '''
        movies = MovieModel.get_all_movies()

        if (len(movies) < 2):
            save_test_movies()

        return { 'movies': [ movie.json() for movie in movies ] }



# TEST DATA SHOULD BE REMOVED BEFORE DEPLOYMENT
avengers_infinity_war = MovieModel(
    None,
    'Avengers: Infinity War', 
    'Iron Man, Thor, the Hulk and the rest of the Avengers unite to battle their most powerful enemy yet -- the evil Thanos. On a mission to collect all six Infinity Stones, Thanos plans to use the artifacts to inflict his twisted will on reality.',
    'http://t2.gstatic.com/images?q=tbn:ANd9GcQoBtRhueP0Kn_O7e89DXSBKBUz-1Nu4Ngb9eqFzqF3EbPGWYVP',
    'https://www.youtube.com/embed/FEWeV2_MAWg'
    )

deadpool_2 = MovieModel(
    None,
    'Deadpool 2',
    'Wisecracking mercenary Deadpool joins forces with three mutants -- Bedlam, Shatterstar and Domino -- to protect a boy from the all-powerful Cable.',
    'http://t2.gstatic.com/images?q=tbn:ANd9GcTkbXNbwGV0npOKCGSndE-YCGpRb2xQDRV8VyMfGlsEfej-sVMv',
    'https://www.youtube.com/embed/20bpjtCbCz0'
    )

rampage = MovieModel(
    None,
    'Rampage',
    'a man who keeps people at a distance but shares an unshakable bond with George',
    'http://t1.gstatic.com/images?q=tbn:ANd9GcQpTCKCvU_Fz0SwP_oyuSSKdf_unn88WWa5evQC4F3U7EfHyQVJ',
    'https://www.youtube.com/embed/coOKvrsmQiI'
    )

def save_test_movies():
    avengers_infinity_war.save_to_db()
    deadpool_2.save_to_db()
    rampage.save_to_db()