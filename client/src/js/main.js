function fetchMovies() {
    fetch('http://localhost:5000')
        .then( function(response) {
            if (response.status !== 200 ) {
                console.log('Looks like the backend server is not running on port 5000. ' + response.status);
                return
            }
            response.json().then(function(data) {
                console.log(data)
            })
        })
        .catch( function( err ) {
            console.log('Fetch Error :-S', err);
        })
}

$(document).ready(() => {
    
    /* Movie Card animations */    
    $('.movie').on('mouseenter', function() {
        $(this).find('.details').stop().animate({
            "top": "122px"
            
        }, 200)
    })

    $('.movie').on('mouseleave', function() {
        $(this).find('.details').stop().animate({
            "top": "360px"
        }, 200)
    })

    
})
