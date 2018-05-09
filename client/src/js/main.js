/* Knockout data binding and templating */
var viewModel = {
    movies: ko.observableArray(),

    /* Animations for the movie details card ON */
    showDetails: function(data, event) {
        let detailsContainer = $(event.target).parent().find('.movie .details');
        $(detailsContainer).stop().animate({
            "top": "30px"
            
        }, 200);

        let playButton = $(event.target).parent().find('.movie .fa');
        $(playButton).stop().animate({
            opacity: 1
        }, 400);
    },

    /* Animations for the movie details card OFF */
    hideDetails: function(data, event) {
        let detailsContainer = $(event.target).parent().find('.movie .details');

        $(detailsContainer).stop().animate({
            "top": "360px"
        }, 200);

        let playButton = $(event.target).parent().find('.movie .fa');
        $(playButton).stop().animate({
            opacity: 0
        }, 400);
    },

    showTrailerBox: function(data, event) {
        let theModal = $(event.target).parent(0).data('target')
        let videoSRC = $(event.target).parent(0).attr('data-video');
        let videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function () {
            $(theModal + ' iframe').attr('src', videoSRC);
        });

    }
}

/* Fetch Requiest to to the REST API to get a list of movies */
function fetchMovies() {
    fetch('http://localhost:5000')
        .then( function(response) {
            if (response.status !== 200 ) {
                console.log('Looks like the backend server is not running on port 5000. ' + response.status);
                return
            }
            response.json().then(function(data) {

                //append the movies to the viewModel
                viewModel.movies(data.movies)
            })
        })
        .catch( function( err ) {
            console.log('Fetch Error :-S', err);
        })
}


ko.applyBindings(viewModel)


