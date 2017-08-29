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