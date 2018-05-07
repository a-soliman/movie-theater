
$(document).ready(() => {
    
    $('.movie').on('mouseenter', function() {
        $(this).find('.details').stop().animate({
            "top": "-115px"
            
        }, 200)
    })

    $('.movie').on('mouseleave', function() {
        $(this).find('.details').stop().animate({
            "top": "0px"
        }, 200)
    })
})
