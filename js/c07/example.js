$(function(){
    var $list, $newItemForm, $newItemButton;
    var item = '';
    $list = $('ul');
    $newItemForm = $('#newItemForm');
    $newItemButton = $('#newItemButton');

    $('li').hide().each(function(index){
        $(this).delay(300 + 300 * index).fadeIn(500);
    });

    function updateCount(){
        var items = $('li[class!=complete]').length;
        $('#counter').text(items);
    }
    updateCount();

    $newItemButton.show();
    $newItemForm.hide();
    $('#showForm').on('click', function(){
        $newItemButton.hide();
        $newItemForm.show();
    });

    $newItemForm.on('submit', function(e){
        e.preventDefault();
        var text = $('#itemDescription').val();
        var toAppend = '<li>' + text + '</li>';
        $(toAppend).appendTo($list).hide().slideDown(100);
        $('#itemDescription').val('');
        updateCount();
        $newItemButton.show();
        $newItemForm.hide();
    });

    $list.on('click', 'li', function(e){
        // var $this = $(this);
        // var complete = $this.hasClass('complete');

        // if(complete === true){
        //     $this.animate({
        //         opacity: 0.0,
        //         paddingLeft: '+=150'
        //     }, 500, 'swing', function(){
        //         $this.remove();
        //     });
        // }else{
        //     var $itemToComplete = $this.detach();
        //     $itemToComplete.removeClass().addClass('complete');
        //     $itemToComplete.appendTo($list).hide().slideDown(100);
        //     updateCount();
            
        // }
        $myLi = $(e.target);
        var complete = $myLi.hasClass('complete');

        if(complete === true){
            $myLi.animate({
                opacity: 0.0,
                paddingLeft: '+=150'
            }, 500, 'swing', function(){
                $myLi.remove();
            });
        }else{
            var $itemToComplete = $myLi.detach();
            $itemToComplete.removeClass().addClass('complete');
            $itemToComplete.appendTo($list).hide().slideDown(100);
            updateCount();
            
        }
    });



});
