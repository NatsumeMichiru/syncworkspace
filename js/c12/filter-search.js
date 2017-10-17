(function () {

    var $imgs = $('#gallery img'),
        $search = $('#filter-search'),
        cache = [];

    $imgs.each(function () {
        cache.push({
            element: this,
            text: this.alt.trim().toLowerCase()
        });
    });

    function filter() {
        var query = this.value.trim().toLowerCase();
        cache.forEach(function (img) {
            var index = 0;

            if (query) {
                index = img.text.indexOf(query);
            }

            if (index == -1) {
                img.element.style.display = 'none';
            } else {
                img.element.style.display = '';
            }

        });
    }

    if ('oninput' in $search[0]) {
        $search.on('input', filter);
    } else {
        $search.on('keyip', filter);
    }



}());