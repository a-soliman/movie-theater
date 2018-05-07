
$(document).ready(() => {
    
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
