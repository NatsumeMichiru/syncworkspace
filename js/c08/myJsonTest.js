$.getJSON( "data/data.json", function( data ) {
  var items = [];
  var msg = '';
  var msg2 = '';
  var msg3 = '';
  $.each( data, function( key, val ) {
    msg += '<p>key: ' + key + ' value: ' + val + '</p>';
    $('#content').append(msg);
    var myVal = val;
    $.each(myVal, function(key, val){
        var myVal2 = val;
        msg2 = '<p>key: ' + key + ' value: ' + val + '</p>';
        $('#content').append(msg2);
        $.each(myVal2, function(key, val){
            msg3 = '<p>key: ' + key + ' value: ' + val + '</p>';
            $('#content').append(msg3);
        });
    });

  });


}); 
