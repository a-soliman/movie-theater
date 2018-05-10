/* Knockout data binding and templating */
var viewModel = {
    movies: ko.observableArray(),
    successMessage: ko.observable(),
    failuerMessage: ko.observable(),

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
    
    /* Displays the trailer box */
    showTrailerBox: function(data, event) {
        let theModal = $(event.target).parent(0).data('target')
        let videoSRC = $(event.target).parent(0).attr('data-video');
        let videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function () {
            $(theModal + ' iframe').attr('src', videoSRC);
        });

    },

    /* Limits the displayed story_line text to 210 chars. */
    limitStoryLineCopy: (data) => {
        let story_line = data.story_line;

        if ( story_line.length <= 210 ) {
            return story_line
        }
        let trimedStory_line = story_line.substring(0, 210);
        trimedStory_line += '...';
        return trimedStory_line;
    },
    
    /* 
        THE FOLLWOING SET OF METHODS WILL PERFORM A DELETE REQUEAT 
        ----------------------------------------------------------
    */

    /* GENERAL DELETE FUNCTION */
    removeMovie: (data, event) => {
        let _id = data._id;
        deleteMovie(_id)
    },

    /* Removes the movie locally after a successful DELETE call to the server */
    removeMovieLocally: (_id) => {
        for ( let i = 0; i < viewModel.movies().length; i++ ) {
            let movie = viewModel.movies()[i];

            if ( movie._id == _id ) {
                viewModel.movies.remove(movie);
                return;
            }
        }
    },

    /* 
        THE FOLLWOING SET OF METHODS WILL PERFORM A DELETE REQUEAT 
        ----------------------------------------------------------
    */

    // GENERAL ADDMOVIE FUNCTION
    addMovie: (formElement) => {
        const inputs = viewModel.addMovieInputs;
        const { title, story_line, poster, trailer_link } = inputs;
        const elementsArray = [ title, story_line, poster, trailer_link ];
        
        for ( let i in elementsArray ){
            let element = elementsArray[i];
            if ( element.valid() !== true ) {
                element.valid(false);
                return;
            }
        }
        let newMovie = {
            title: title.value(),
            story_line: story_line.value(),
            poster: poster.value(),
            trailer_link: trailer_link.value()
        }

        if ( postMovie(newMovie) ) {
            $('.modal').modal('hide');
        }
    },

    /* Values of the addMovie form */
    addMovieInputs: {
        title : {
            value: ko.observable(''),
            valid: ko.observable()
        },
        story_line: {
            value: ko.observable(''),
            valid: ko.observable()
        },
        poster: {
            value: ko.observable(''),
            valid: ko.observable()
        },
        trailer_link: {
            value: ko.observable(''),
            valid: ko.observable()
        }
    },

    // A SET OF FUNCTIONS TO VALIDATE EACH INPUT FIELD 
    validateAddMovieInputs: {
        validateTitle: () => {
            let title = viewModel.addMovieInputs.title;

            if ( title.value().length < 1 ) {
                title.valid(false);
                return;
            }
            title.valid(true);
            return;
        },
        validateStory_line: () => {
            let story_line = viewModel.addMovieInputs.story_line;

            if ( story_line.value().length < 10 ){
                story_line.valid(false);
                return
            }
            story_line.valid(true);
            return;
        },
        validatePoster: () => {
            let poster = viewModel.addMovieInputs.poster;

            if ( poster.value().length < 10 ){
                poster.valid(false);
                return
            }
            // validate  URL regex
            let expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
            let regex = new RegExp(expression);
            if ( !poster.value().match(regex) ) {
                poster.valid(false);
                return
            }
            poster.valid(true);
            return;
        },
        validateTrailer_link: () => {
            let trailer_link = viewModel.addMovieInputs.trailer_link;

            if ( trailer_link.value().length < 10 ){
                trailer_link.valid(false);
                return
            }
            // validate  URL regex
            let expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
            let regex = new RegExp(expression);
            if ( !trailer_link.value().match(regex) ) {
                trailer_link.valid(false);
                return
            }
            trailer_link.valid(true);
            return;
        }
    },

    // WILL ADD A MOVIE LOCALLY AFTER A SUCCESSFUL API CALL
    addMovieLocally: ( movie ) => {
        fetchMovies()
    },

    /* 
        THE FOLLWOING SET OF METHODS WILL PERFORM AN EDIT REQUEAT 
        ----------------------------------------------------------
    */

    // GENERAL EDIT FUNCTION
    editMovie: () => {
        let inputValues = viewModel.editMovieInputs;
        const {_id, title, story_line, poster, trailer_link} = inputValues;
        const elementsArray = [_id, title, story_line, poster, trailer_link];

        // Check if all validation has passed
        for ( let i in elementsArray ){
            let element = elementsArray[i];
            if ( element.valid() !== true ) {
                element.valid(false);
                return;
            }
        }

        // Init the edited movie
        let editedMovie = {
            title: title.value(),
            story_line: story_line.value(),
            poster: poster.value(),
            trailer_link: trailer_link.value()
        };

        if (putMovies(_id.value(), editedMovie)) {
            viewModel.editMovieLocally(_id.value(), editedMovie);
            $('.modal').modal('hide');
        }

    },

    // SETS THE VALUES OF THE OBSERVABLES FOR THE MOVIE TO EDIT
    setEditableMovieValues: (data, event) => {
        let inputValues = viewModel.editMovieInputs;
        const {_id, title, story_line, poster, trailer_link} = inputValues;
        const elementsArray = [_id, title, story_line, poster, trailer_link];

        // Subscribe the values from the movie to the observable
        _id.value(data._id);
        title.value(data.title);
        story_line.value(data.story_line);
        poster.value(data.poster);
        trailer_link.value(data.trailer_link);
    },

    // EDITS A MOVIE LOCALLY AFTER A SUCCESSFULL APU CALL
    editMovieLocally: (_id, editedMovie) => {
        editedMovie._id = _id;

        for (let i = 0; i < viewModel.movies().length; i++) {
            let movie = viewModel.movies()[i];
            
            if ( movie._id == _id ) {
                viewModel.movies.replace(movie, editedMovie);
                return;
            }
        }
    },

    // INITALIZE Values of the editMovie form
    editMovieInputs: {
        _id: {
            value: ko.observable(''),
            valid: ko.observable(true)
        },
        title : {
            value: ko.observable(''),
            valid: ko.observable(true)
        },
        story_line: {
            value: ko.observable(''),
            valid: ko.observable(true)
        },
        poster: {
            value: ko.observable(''),
            valid: ko.observable(true)
        },
        trailer_link: {
            value: ko.observable(''),
            valid: ko.observable(true)
        }
    },

    // A SET OF FUNCTIONS TO VALIDATE EACH INPUT FIELD IN THE EDIT MOVIE FORM
    validateEditMovieInputs: {
        validateTitle: () => {
            let title = viewModel.editMovieInputs.title;

            if ( title.value().length < 1 ) {
                title.valid(false);
                return;
            }
            title.valid(true);
            return;
        },
        validateStory_line: () => {
            let story_line = viewModel.editMovieInputs.story_line;

            if ( story_line.value().length < 10 ){
                story_line.valid(false);
                return
            }
            story_line.valid(true);
            return;
        },
        validatePoster: () => {
            let poster = viewModel.editMovieInputs.poster;

            if ( poster.value().length < 10 ){
                poster.valid(false);
                return
            }
            // validate  URL regex
            let expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
            let regex = new RegExp(expression);
            if ( !poster.value().match(regex) ) {
                poster.valid(false);
                return
            }
            poster.valid(true);
            return;
        },
        validateTrailer_link: () => {
            let trailer_link = viewModel.editMovieInputs.trailer_link;

            if ( trailer_link.value().length < 10 ){
                trailer_link.valid(false);
                return
            }
            // validate  URL regex
            let expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
            let regex = new RegExp(expression);
            if ( !trailer_link.value().match(regex) ) {
                trailer_link.valid(false);
                return
            }
            trailer_link.valid(true);
            return;
        }
    }
}

/* 
    THE NEXT SET OF METHODS ARE THE ACTUAL API CALLS 
                USING FETCH API
    -------------------------------------------------
*/

/* Fetch GET Requiest to to the REST API to get a list of movies */
function fetchMovies() {
    fetch('http://localhost:5000')
        .then( function(response) {
            if (response.status !== 200 ) {
                console.log('Looks like the backend server is not running on port 5000. ' + response.status);
                response.json().then( ( data ) => {
                    viewModel.failuerMessage(data.message)
                })
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


/* Fetch DELETE Requiest to to the REST API */
function deleteMovie(_id) {
    return fetch(`http://localhost:5000/${_id}`, {
        method: 'delete'
    })
    .then ( ( response ) => {
        if (response.status !== 200 ) {
            console.log('Looks like the backend server is not running on port 5000. ' + response.status);
            response.json().then( ( data ) => {
                viewModel.failuerMessage(data.message)
            })
            return
        }
        response.json().then( ( data ) => {
            viewModel.successMessage(data.message)
            viewModel.removeMovieLocally(_id);
        })
    })
};

/* Fetch POST Requiest to to the REST API */
function postMovie(movie) {
    return fetch(`http://localhost:5000/add`, {
        body: JSON.stringify(movie),
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    })
    .then( ( response ) => {
        if (response.status !== 201 ) {
            console.log('Looks like the backend server is not running on port 5000. ' + response.status);
            response.json().then( ( data ) => {
                viewModel.failuerMessage(data.message)
            })
            return false;
        }
        response.json().then( ( data ) => {
            viewModel.successMessage(data.message);
            viewModel.addMovieLocally(movie);
            return true;
        })
    })
};

/* Fetch PUT Requiest to to the REST API */
function putMovies(_id, editedMovie) {
    return fetch(`http://localhost:5000/${_id}`, {
        body: JSON.stringify(editedMovie),
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        method: 'put'
    })
    .then( ( response ) => {
        if ( response.status !== 200 ) {
            console.log('Looks like the backend server is not running on port 5000. ' + response.status);
            response.json().then( ( data ) => {
                viewModel.failuerMessage(data.message)
            })
            return false;
        }
        response.json().then( ( data ) => {
            viewModel.successMessage(data.message);
            return true;
        })
    })
}

// APPLYES THE KNOCKOUT BINDINGS
ko.applyBindings(viewModel)


