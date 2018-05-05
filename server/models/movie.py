
class MovieModel():
    def __init__(self, title, story_line, poster, trailer_link):
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