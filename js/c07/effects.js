$(function() {

  $('h2').hide().slideDown(300);
  var $li = $('li');
  $li.hide().each(function(index) {
    $(this).delay(100 + index * 100).slideDown();
  });

  $li.on('click', function() {
    $(this).fadeOut(700);
  });

  var $h1 = $('h1');
  var $ul = $('ul');
  // $h1.on('click', function(){
  //   $li.slideToggle(200);
  // })

      // $newLi.hide();
  $h1.on('click', function(e){
    // var newLi = document.createElement('li');
    // var newLiTextNode = document.createTextNode('new li item');
    // newLi.appendChild(newLiTextNode);
    // $(newLi).hide().appendTo($ul).slideDown();
    var $newLi = $('<li>new li</li>');
    $newLi.hide().appendTo($ul).slideDown();
  });


});