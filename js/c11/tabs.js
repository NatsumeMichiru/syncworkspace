$('.tab-list').on('click', 'a', function(e){
    e.preventDefault();
    $('.tab-control').parent().removeClass('active');
    $this = $(this);
    $this.parent().addClass('active');
    var link = this.hash;
    $('.tab-panel').removeClass('active');
    $('.tab-panel').filter(link).addClass('active');

});