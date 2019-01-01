// This example demonstrates the lexical "this".
// This concept applies to arrow functions.
// https://hackernoon.com/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4

// Within a function expression "this" refers to the object that contains the function.
// In the following case, "this" is the global object.

list = [1,2,3];
a = 10;
list.forEach(function (v) {
   console.log(this.list[v-1] + this.a);
});

(function() {
    console.log(this.list[0]);
})();

// In this case, "list1" is not part of the global object "this".

let list1 = [1,2,3];
(function() {
    console.log(list1[0]);
    try { console.log(this.list1[0]); }
    catch (e) { console.log(e.toString()) }
})();
(() => console.log(list1[0]))(); // "this" is not defined here.

if (false) {
    console.log(this); // => {}

    a = [10];
    a.forEach(function (v) {
        console.log(v)
    }); // => 10
    a.forEach(v => console.log(v)); // => 10

    a.forEach(function () {
        // "this" refers to the global object.
        console.log(this.a) // +> [10]
    });

    (function () {
        // "this" refers to the global object.
        console.log(this.a) // +> [10]
    })();

    function test() {
        let a = [10];
        a.forEach(() => {
            console.log(this)
        });
    }

    test();

    obj = {
        a: 10,
        m1: () => {
            console.log(this)
        }, // Arrow functions: this is set by the literal context.
        m2: function () {
            console.log(this)
        },
        m3: function () {
            console.log(this === obj)
        }
    };

    obj.m1(); // => {}
    obj.m2(); // => { a: 10, m1: [Function: m1], m2: [Function: m2], m3: [Function: m3] }
    obj.m3(); // => true
}
