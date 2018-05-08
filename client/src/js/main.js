/* Knockout data binding and templating */
var viewModel = {
    movies: ko.observableArray(),

    showDetails: function(data, event) {
        let detailsContainer = $(event.target).parent().find('.movie .details');
        console.log(detailsContainer)
        $(detailsContainer).stop().animate({
            "top": "122px"
            
        }, 200)
    },
    
    hideDetails: function(data, event) {
        let detailsContainer = $(event.target).parent().find('.movie .details');

        $(detailsContainer).stop().animate({
            "top": "360px"
        }, 200);
    }
}

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

