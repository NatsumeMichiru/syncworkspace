var xhr = new XMLHttpRequest();
xhr.open('get', 'data/test.json', true);
xhr.send('search=arduino');

xhr.onload = function(){
    if(xhr.status === 200){}
};