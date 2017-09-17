//关于闭包：
//函数执行时才传递参数，传参时复制值而不是传递引用
 var addTheHandlers = function (nodes) {
     var i;
     for (var i = 0; i < nodes.length; i++) {
         nodes[i].addEventListener('click', myAlert(i));
         
     }
 }

 function myAlert(i) {
     return function() {
         alert(i);
     }
 }

 var myNodes = document.getElementsByClassName('myP');
 addTheHandlers(myNodes);

 //memoization

 var memoizer = function(memo, formula) {
     var recur = function(n) {
         var result = memo[n];
         if (typeof result !== 'number') {
             result = formula(recur, n);
             memo[n] = result;
         }
         return result;
     };
     return recur;
 };

 var fibonacci = memoizer([0, 1], function(recur, n) {
     return recur(n - 1) + recur(n - 2);
 });

 for (var index = 0; index < 20; index++) {
    document.writeln(index + ' : ' + fibonacci(index) + '</br>');
     
 }

//  JavaScript: The Good Parts
/* 第二章： 语法
js不允许使用保留字来命名变量或参数，js不允许在对象字面量中，或者用点运算符提取对象属性时，
使用保留字作为对象的属性名。
标识符被用于语句、变量、参数、属性名、运算符和标记
数字：
1e+2, 1.2e-5,
NaN是一个数值，它表示一个不能产生正常结果的运算结果。NaN不等于任何值包括它自身，可用函数
isNaN(number)来检测
数字拥有方法，对象Math包含一套作用于数字的方法。
例：Math.floor(number)
字符串：
\反斜线是转义字符，用来把正常情况下不允许的字符插入到字符串中
字符串有一个length属性
字符串是不可变的
语句：
假值：false, null, undefined, '', 数字0, NaN
运算符：
运算符优先级：
提取属性与调用函数，
一元运算符：delete, new, typeof 
...
&&运算符产生的值：如果第一个运算数的值为假，则产生它的第1个运算数的值，否则产生第2个。
||运算符产生的值：如果第一个运算数为真，则产生第1个，否则产生第2个。
*/


/* 第三章：对象
对象字面量：
var stooge = {
    "first-name": "Jermoe",  属性名是字符串
    "last-name": "Howard"
}
如果属性名是合法标识符而不是保留字，则不要求用引号括住属性名
var flight = {
    airline: "Oceanic",
    number: 100,
    departure: {
        IATA: "SYD",
        time: "2004-10-11"
    }
}
检索：
stooge['first-name']
如果不是保留字，则可以用.表示法代替，优先使用.表示法
flight.departure.IATA
检索不存在的成员属性值返回undefined
尝试从undefined的成员属性中取值会导致TypeError异常
flight.equipment && flight.equipment.model  返回undefined
引用：
对象通过引用传递，它们永远不会被复制
原型：
原型连接在更新时是不起作用的，只有在检索值的时候才会被用到。
反射：
flight.hasOwnProperty('number') 不会检查原型链
枚举：
var name;
for (name in another_stooge) {
    if (typeof another_stooge[name] !== 'function') {
        document.writeln(name + ': ' + another_stooge[name]);
    }
    //
    if (another_stooge.hasOwnProperty(name) === true) {
        ...
    }
}
删除：
delete another_stooge.nickname
删除不会触及原型链中的任何对象，删除对象的属性可能会让来自原型链中的属性透现出来
减少全局变量污染：
最小化使用全局变量的方法之一是为自己的应用创建一个唯一的全局变量：
var MYAPP = {};
MYAPP.stooge = {
    ..
}
*/


/*
第四章：函数
js中的函数就是对象，对象字面量产生的对象链接到Object.prototype,函数对象连接到Function.prototype
该原型本身链接到Object.prototype,
每个函数在创建时会附加两个隐藏属性，函数的上下文和实现函数行为的代码
函数字面量：
var add = function(a, b) {
    return a + b;
}
一个内部函数除了可以访问自己的参数和变量，同时它也能自由访问把它嵌套在其中的父函数的参数与变量。
通过函数字面量创建的函数对象包含一个连到外部上下文的连接。这被成为闭包
调用：
除了声明时定义的形式参数，每个函数会接受两个附加的参数：this和arguments。
this的值取决于调用的模式
js有四种调用模式：方法调用，函数调用，构造器调用，apply调用
实际参数arguments，形式参数parameters

方法调用模式：
当一个函数被保存为对象的一个属性时，我们称它为一个方法
当方法被调用时，this被绑定到该对象
调用表达式包含一个提取属性的动作，即.点表达式或[]下标表达式，就被当作方法调用
方法可以使用this访问自己所属的对象
this到对象的绑定发生在调用时
通过this可取得它们所属对象的上下文的方法称为公共方法

函数调用模式：
当一个函数并非一个对象的属性时，那么它就是被当作一个函数来调用的
函数调用模式调用时，this绑定到全局对象
myObject.double = function() {
    var that = this;
    var helper = function() {
        that.value = add(that.value, that.value);
    };
    helper();
}
定义一个变量并给它赋值为this，那么内部函数就可以通过按个变量访问到this，把那个变量命名为that

构造器调用模式：
如果在一个函数前面带上new来调用，那么背地里将会创建一个连接到该函数的prototype成员的新对象
同时this会被绑定到那个新对象上

apply调用模式：
apply方法是函数的方法，接受两个参数，第一个是要绑定给this的值，第二个是一个参数数组

参数：
var sum = function() {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
}
当函数被调用时，会得到一个免费配送的参数，arguments数组
函数可以通过此参数访问所有它被调用时传递给它的参数列表
arguments是一个array-like对象，拥有一个length属性，但没有任何数组的方法

返回：
异常：
throw语句中断函数的执行，它应该抛出一个exception对象，该对象包含一个name属性和一个message属性
该exception对象将被传递到一个try语句的catch从句
var add = function(a, b) {
    if(typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'need numbers'
        };
    }
    return a + b;
}

var tryIt = function() {
    try {
        add('seven');
    } catch(e) {
        document.writeln(e.name + e.message);
    }
}

扩充类型的功能：
Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
}

Number.method('integer', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});
console.log((-3.5).integer());

递归：
var hanoi = function(disc, src, aux, dst) {
    if(disc === 1) {
        console.log('move ' + disc + ' from ' + src + ' to ' + dst);
        return;
    }//结束条件：只有一个盘子，直接将盘子从src移动到dst
    hanoi(disc - 1, src, dst, aux);//将disc - 1个盘子从src移动到aux
    console.log('move ' + disc + ' from ' + src + ' to ' + dst);//将最大的盘子从src移动到dst
    hanoi(disc - 1, aux, src, dst);//将disc - 1个盘子从aux移动到dst
};
hanoi(3, 'src', 'aux', 'dst');

作用域：
js有函数作用域
最好的做法是在函数体的顶部声明函数中可能用到的所有变量
闭包：
var myObject = (function() {
    var value = 0;
    return {
        increment: function(inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function() {
            return value;
        }
    };
}());
*/
