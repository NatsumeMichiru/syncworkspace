(function() {
    
    var $imgs = $('#gallery img'),
        $buttons = $('#buttons'),
        tagged = {};
    
    $imgs.each(function() {
        var img = this;
        var tags = $(this).data('tags');

        if (tags) {
            tags.split(',').forEach(function(tagName) {
                if (!tagged[tagName]) {
                    tagged[tagName] = [];
                }
                tagged[tagName].push(img);
            });
        }
    });

    $('<button></button>').text('Show All').addClass('active').on('click', function() {
        $this = $(this);
        $this.addClass('active');
        $this.siblings().removeClass('active');
        $imgs.show();
    }).appendTo($buttons);

    $.each(tagged, function(tagName) {
        $('<button></button>').text(tagName + ' (' + tagged[tagName].length + ')')
        .on('click', function() {
            $this = $(this);
            $this.addClass('active');
            $this.siblings().removeClass('active');
            $imgs.hide().filter(tagged[tagName]).show();
            }).appendTo($buttons);
        });
}());
