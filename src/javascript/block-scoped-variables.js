
a = 10;
let b = 20; // Global let variables are not properties on the global object.

console.log("1 -----------------------");
(function() {
    console.log(this.a); // => 10
    console.log(this.b); // => undefined
    console.log(a);  // => 10
    console.log(b);  // => 20
})();

console.log("2 -----------------------");
let f = function() {
    console.log(this.a); // => 10
    console.log(this.b); // => undefined
    console.log(a);  // => 10
    console.log(b);  // => 20
};

f();

console.log("3 -----------------------");
(function() {
    'use strict';
    try { console.log(this.a) } // => TypeError: Cannot read property 'a' of undefined
    catch (e) { console.log(e.toString()) }
    console.log(a); // => 10
    console.log(b); // => 20
})();

console.log("4 -----------------------");
((function() {
    'use strict';
    try { console.log(this.a) } // => 100
    catch (e) { console.log(e.toString()) }
    console.log(a); // => 10
    console.log(b); // => 20
}).bind({ a: 100 }))();

console.log("5 -----------------------");
(() => {
    console.log(this.a); // => undefined
    console.log(this.b); // => undefined
    console.log(a); // => 10
    console.log(b); // => 20
})();

console.log("6 -----------------------");
((() => {
    console.log(this.a); // => undefined
    console.log(this.b); // => undefined
    console.log(a); // => 10
    console.log(b); // => 20
}).bind({ a: 1000 }))(); // You are not supposed to use "bind" here... however the interpreter let you do that.

// Test "this" when used within an object.
console.log("7 -----------------------");
obj = {
    f1: function() { console.log(this === obj); }, // => true
    f2: () => { console.log(this) } // => {}
};

obj.f1(); // => true
obj.f2(); // => {}

console.log("8 -----------------------");

// Let's try to use an arrow function as an object's method.
// You should not do that... however the JS interpreter let you do it.
// Is there a use case for arrow functions as method ?

// ECMA 5

let Person = function(inName) { // This is the constructor.
    console.log("Executing the constructor Person.");
    if ('undefined' !== typeof inName) {
        this.name = inName;
    }
};

let PersonPrototype = { // This is the prototype.
    name: undefined,
    setName: function(inName) { this.name = inName; },
    getName: function() { return this.name; },
    test: function() { (() => { console.log(this) } )(); console.log(a); console.log(b); },
    get: () => { return "My name is " + this.name } // My name is undefined
};

Person.prototype = PersonPrototype;

let p = new Person("Tom");
console.log(p.get()); // => My name is undefined
p.test(); // => { name: 'Tom' }






for (let i=0; i<4; i++) { // "let" creates a new variable.
    setTimeout(() => { console.log("i=" + i) }, 1000); // => 0, 1, 2, 3
}

for (i=0; i<4; i++) { // "i" is the same variable.
    setTimeout(() => { console.log("j=" + i) }, 1000); // => 4, 4, 4, 4
}