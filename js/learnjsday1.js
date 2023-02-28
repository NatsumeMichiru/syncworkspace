function area(width, height){
    return width * height;
};//函数声明
var size = area(3, 4);

var area1 = function(width, height){
    return width * height;
};//函数表达式

var area2 = (
    function(){
        var width = 3;
        var height = 4;
        return width * height;
    }());
//立即调用函数表达式

var hotel = {
    name: 'Pake',
    rooms: 50,
    booked: 25,
    checkAvailability: function(){
        return this.rooms - this.booked;
    }
};
//创建对象字面量

var hotel1 = new Object();
hotel1.name = 'Duke';
hotel1.rooms = 50;
hotel1.booked = 25;
hotel1.checkAvailability = function(){
    return this.rooms - this.booked;
};
//构造函数创建对象

function Hotel(name, rooms, booked){//函数名大写代表构造函数
    this.name = name;
    this.rooms = rooms;
    this.booked = booked;
    this.checkAvailability = function(){
        return this.rooms - this.booked;
    }
}
var quayHotel = new Hotel('Quay', 40, 25);
//创建构造函数创建对象

var myDate = new Date();
var myDate2 = new Date(myDate.getTime() + 24*60*60*1000);
document.writeln(myDate2);

