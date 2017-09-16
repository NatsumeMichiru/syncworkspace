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