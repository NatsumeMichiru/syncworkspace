var list = document.getElementsByTagName('ul')[0];

var newItemLast = document.createElement('li');
var newItemTextLast = document.createTextNode('cream');
newItemLast.appendChild(newItemTextLast);
list.appendChild(newItemLast);

var newItemFirst = document.createElement('li');
var newItemTextFirst = document.createTextNode('kale');
newItemFirst.appendChild(newItemTextFirst);
list.insertBefore(newItemFirst, list.firstChild);

var listItem = document.getElementsByTagName('li');
for(var i = 0; i < listItem.length; i++){
    listItem[i].className = 'cool';
}

var heading = document.querySelector('h2');
var headingText = heading.textContent;
var itemAmount = listItem.length;
var newHeadingText = headingText + '<span>' + itemAmount + '</span>';
heading.innerHTML = newHeadingText;