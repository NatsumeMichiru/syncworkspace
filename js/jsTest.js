let p = 120;
var q = 'string';
console.log(p);
console.log(q);

var func = function() {
    var foo = 1;
    var bar = 2;
    var sum = foo + bar;
    return sum;
}
var a = func();
console.log(func);

function func1 () {
    return "func1";
}


var func2 = function () {
    return "func2";
}

var output = func2;
console.log(func1());

var array1 = [1, 2];
console.log(array1[1]);

var memorizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = formula (recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};

var factorial = memorizer([1,1], function (a, n) {
    return n * a (n - 1);
});
var test = factorial(5);
console.log(test);
console.log(factorial);