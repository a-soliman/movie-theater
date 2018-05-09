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

    editMovie: (data, event) => {
        let _id = data._id;
        console.log(_id)
    },

    /* Triggers the DELETE API call */
    removeMovie: (data, event) => {
        let _id = data._id;
        deleteMovie(_id)
    },

    /* Removes the movie locally after a successful DELETE call to the server */
    removeMovieLocally: (_id) => {
        for ( let i = 0; i < viewModel.movies().length; i++ ) {
            let movie = viewModel.movies()[i];

            if ( movie._id == _id ) {
                viewModel.movies.remove(movie)
                console.log('Removed locallay')
                return;
            }
        }
    },

    addMovie: (formElement) => {
        console.log('Add clicked')
        console.log(formElement)
    },

    /* Values of the addMovie form */
    addMovieInputs: {
        title : {
            value: ko.observable('This is a title'),
            valid: ko.observable()
        },
        story_line: {
            value: ko.observable('This is a story line'),
            valid: ko.observable()
        },
        poster: {
            value: ko.observable('This is a poster'),
            valid: ko.observable()
        },
        trailer_link: {
            value: ko.observable('This is a trailer link'),
            valid: ko.observable()
        }
    },

    validateAddMovieInputs: {
        validateTitle: () => {
            let title = viewModel.addMovieInputs.title;

            if ( title.value().length < 1 ) {
                console.log(title.value().length)
                title.valid(false);
                return;
            }
            title.valid(true);
            return;
        },
        validateStory_line: () => {
            let story_line = viewModel.addMovieInputs.story_line;

            if ( story_line.value().length < 1 ){
                story_line.valid(false);
                return
            }
            story_line.valid(true);
            return;
        },
        validatePoster: () => {
            let poster = viewModel.addMovieInputs.poster;

            if ( poster.value().length < 1 ){
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
        }
    }

    // validateAddMovieInputs: {
    //     inputs: viewModel.addMovieInputs,

    //     validateTitle: function() {
    //         let title = inputs.title;
            
    //         if ( title.value().trim().length < 1 ) {
    //             title.valid(false);
    //         }
    //     }
    // },

    // /* Validate addMovie Form Inputs */
    // validateAddMovieInputs101: () => {
    //     let inputs          = viewModel.addMovieInputs;

    //     let title           = inputs.title;
    //     let story_line      = inputs.story_line;
    //     let poster          = inuts.poster;
    //     let trailer_link    = inputs.trailer_link;

    //     // Validate *title*
        
       

    //     // Validate *story_line*
    //     if ( story_line.value().trim().length < 20 ) {
    //         story_line.valid(false);
    //     }

    //     // Validate *poster*
    //     if ( poster.value().trim().length < 1) {
    //         poster.valid(false);
    //     }
        
    //     let expression = "/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/";
    //     let regex = new RegExp(expression);
    //     if ( !poster.value().match(regex) ) {
    //         poster.valid(false)
    //     }

    //     // Validate *trailer_link*
    //     if ( trailer_link.value().trim().length < 1) {
    //         trailer_link.valid(false);
    //     }

    //     expression = "/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/";
    //     regex = new RegExp(expression);
    //     if ( !trailer_link.value().match(regex) ) {
    //         trailer_link.valid(false)
    //     }


    // }

}

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


/* Fetch GET Requiest to to the REST API to get a list of movies */
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
}

ko.applyBindings(viewModel)


