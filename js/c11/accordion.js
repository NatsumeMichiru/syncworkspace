$('.accordion').on('click', 'button', function(e){
        e.preventDefault();
        $(this).next('.accordion-panel').not(':animated').slideToggle(200);
    });


