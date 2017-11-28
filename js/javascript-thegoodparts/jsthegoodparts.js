//关于闭包：
//函数执行时才传递参数，传参时复制值而不是传递引用
//  var addTheHandlers = function (nodes) {
//      var i;
//      for (var i = 0; i < nodes.length; i++) {
//          nodes[i].addEventListener('click', myAlert(i));

//      }
//  }

//  function myAlert(i) {
//      return function() {
//          alert(i);
//      }
//  }

//  var myNodes = document.getElementsByClassName('myP');
//  addTheHandlers(myNodes);

//memoization

var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};

var fibonacci = memoizer([0, 1], function (recur, n) {
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

参数传递方式：
函数调用时传递参数，
基本类型是传值调用
引用类型是传共享调用（传递对象的指针的拷贝）

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

var addHandlers = function(nodes) {
    var helper = function(i) { //函数执行时才传参数，传参数复制值而不是传递引用
        return function(e) {
            alert(i);
        };
    };
    var i;
    for (var i = 0; i < nodes.length; i++) {
        document.addEventListener(click, helper(i));
    }
}//正确给节点添加序号显示事件

回调：
sendRequestAsyncchronously(request, function(response) {
    display(response);
});

模块：
利用函数闭包来构造模块
var serialMaker = function() {
    var prefix = '',
        seq = 0;
    return {
        setPrefix: function(p) {
            prefix = String(p);
        },
        setSeq: function(s) {
            seq = Number(s);
        },
        make: function() {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};//一个用来产生序列号的模块例子
级联：
在一个级联中，可以在单独一条语句中依次调用同一个对象的很多方法
柯里化：
柯里化允许我们把函数与传递给它的参数相结合，产生出一个新的函数
Function.method('curry', function() {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function() {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

记忆：
var fibonacci = function() {
    var memo = [0, 1];
    var fib = function(n) {
        var result = memo[n];
        if(typeof result !== 'number') {//从缓存中查询，如果有则直接返回结果
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;//将结果存入缓存
        }
        return result;
    };
    return fib;
}();
*/


/*
第五章：继承
伪类：
js不直接让对象从其它对象继承，反而插入了一个多余的间接层：
通过构造器函数产生对象

对象说明符：
var myObject = New Maker({
    first: f,
    middle: m,
    last: l
});

原型：
var myCat = Object.create(myMammal);

函数化：
应用模块模式
var mammal = function (spec) {
    var that = {};
    privateName = spec.name;
    privateSaying = spec.saying;
    that.getName = function() {
        return privateName;
    };
    that.setName = function(newName) {
        spec.name = newName;
        return spec.name;
    };
    that.says = function() {
        return privateSaying;
    }
    return that;
};
mySpec = {
    name: 'myCat'
};
// var myMammal = mammal(mySpec);
// mySpec.name = 'dog';
// console.log(myMammal.getName());

var cat = function(spec) {
    spec.saying = spec.saying || 'meow';
    var privateSaying = spec.saying;
    var that = mammal(spec);
    that.says = function() {
        return privateSaying + privateSaying + privateSaying;
    }
    return that;
};

var myCat = cat(mySpec);
console.log(myCat.says());

部件：
*/

/*
第六章：数组

数组字面量：
var empty = [];
var numbers = ['zero', 'one'];
var = numbersObject = {
    '0': 'zero',
    '1': 'one'
};
numbers继承自Array.protoype,numbersObject继承自Object.protoype
js数组中的元素可以是不同的类型

长度：
numbers[numbers.length] = 'shi';
附加一个新元素到该数组的尾部
numbers.push('go');
删除：
delete numbers[2];
删除会在数组中留下一个空洞
numbers.splice(2, 1);第一个参数是数组中的一个序号，第二个参数是要删除元素的个数
splice删除元素不会留下空洞，会将后面的所有属性移除并重新插入
枚举：
var i;
for (i = 0; i < myArray.length; i += 1) {
    console.log(myArray[i]);
}
容易混淆的地方：
在属性名是小而连续的整数时使用数组，否则使用对象
js本身对于数组和对象的区别是混乱的，typeof均返回object
Array.isArray()方法判断数组
方法：
Array.prototype.reduce = function(f, value) {
    var i;
    for (i = 0; i < this.length; i++) {
        value = f(this[i], value);
    }
    return value;
};
指定初始值：
二维数组：
var matrix = [
    [0, 1, 2],
    [3, 4, 5]
];
matrix[0][2]
Array.matrix = function(m, n, init) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i++) {
        a = [];
        for (j = 0; j < n; j++) {
            a[j] = init;
        }
        mat[i] = a;
    }
    return mat;
}
*/

/*
第七章： 正则表达式
^表示字符串的开始
(?:....)表示一个非捕获型分组
后缀?表示可选
(...)表示一个捕获型分组，会复制它所匹配的文本，放到result数组里，第一个是result[1]
[...]表示一个字符类,[A-Za-z]表示这个字符类包含26个大写字母和26个小写字母
后缀+表示匹配一次或多次
[^?#]匹配除了?和#之外的所有字符
.匹配除了换行符以外的所有字符
$表示字符串的结束
结构：
优先考虑使用正则表达式字面量
标识：
g 全局的
i 大小写不敏感
m 多行（^和$能匹配行结束符）
使用RegExp构造器：
var myRegexp = new RegExp("\"(?:\\\\.|[^\\\\\\\"])*\"", 'g');
用正则表达式字面量创建RegExp对象共享同一个单例：
function makeAMatcher () {
    return /a/gi;
}
var x = makeAMatcher();
var y = makeAMatcher();
x和y是相同的对象！???有疑问，不是同一个对象
function makeAMatcher () {
    return /a/gi;
}
var x = makeAMatcher();
var y = makeAMatcher();
x.lastIndex = 10;
y.lastIndex = 5;
console.log(y.lastIndex);
console.log(x.lastIndex);
元素：
一个正则表达式分支包含一个或多个正则表达式序列。这些序列被|字符分隔
一个正则表达式序列包含一个或多个正则表达式因子。每个因子能选择是否跟随一个量词，
量词决定这个因子被允许出现的次数，如果没有量词，该因子只匹配一次
正则表达式转义：
\d 等同于[0-9],匹配一个数字，\D表示与其相反的：[^0-9]
\s 表示空白符
\w 等同于[0-9a-z_A-Z] \W 表示与其相反
\b 字边界 它使用\w去寻找字边界，对多语言应用完全无用
\1 指向分组1所捕获到的文本的一个引用
正则表达式分组：
分组共有四种：
捕获型：
非捕获型： (?:) 非捕获型并不会干扰捕获型的编号
向前正向匹配(零宽度正预测先行断言)： (?=exp)
断言自身出现的位置的后面能匹配表达式exp
\b\w(?=ing\b) 匹配以ing结尾的单词的前面部分
零宽度正回顾后发断言：(?<=exp)
断言自身出现的位置的前面能匹配表达式exp
(?<=\bre)\w+\b 匹配以re开头的单词的后半部分
零宽度负预测先行断言：(?!exp)
断言此位置的后面不能匹配表达式exp
\d{3}(?!\d) 匹配三位数字，三位数字后面不能是数字
零宽度负回顾后发断言：(?<!exp)
断言此位置前面不能匹配表达式exp
(?<![a-z])\d{7} 匹配前面不是小写字母的七位数字
正则表达式字符集：
一组由32个ASCII特殊字符组成的集合:
[!-\/:-@\[-`{-~]  (非常丑陋)
正则表达式字符转义：
字符类内部的转义规则和正则表达式因子的不同。[\b]是退格符。下面是在字符类中需要被转义的特殊字符
- / [ \ ] ^
正则表达式量词
/www/ 和 /w{3}/ 一样
{3,6} 会匹配3、4、5、6次
{3,} 会匹配3次或更多次
? 0或1次
* 0次或更多次
+ 1次或更多次
如果只有一个量词，则表示贪婪匹配，如果量词后缀一个?
则表示进行非贪婪匹配，即只匹配必要的次数，
一般情况下最好坚持使用贪婪匹配
*/

/*
第八章：方法



*/
