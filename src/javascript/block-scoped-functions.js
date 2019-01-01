// This m1 demonstrates the "Block-scoped function definitions".
// At the present moment, this feature requires the use of the "use strict" directive.
// NOTE:
//      Strict mode is declared by adding "use strict"; to the beginning of a script or a function.
//      Source: https://www.w3schools.com/js/js_strict.asp
//      See: https://stackoverflow.com/questions/41804038/why-functions-are-described-as-block-scoped

// This function is not interpreted in strict mode. The result will be:
//
// [A] This is f1() as defined in the "outer block space" (DF1-1)
// [B] This is f1() as defined within block 1 (DF1-2)
// [C] This is f1() as defined within block 2 (DF1-3)
// [D] This is f1() as defined within block 2 (DF1-3)
// [E] This is f1() as defined within block 1 (DF1-2)
// [F] This is f1() as defined within block 1 (DF1-2)
// [G] This is f2() as defined within block 2 (DF2-1)

let test1 = function() {
    // The "outer block space"
    function f1() { return 'This is f1() as defined in the "outer block space" (DF1-1)' }
    console.log("[A] " + f1());

    {   // Block 1
        function f1() { return "This is f1() as defined within block 1 (DF1-2)" }
        console.log("[B] " + f1());
        {   // Block 2
            console.log("[C] " + f1());
            function f1() { return "This is f1() as defined within block 2 (DF1-3)" }
            function f2() { return "This is f2() as defined within block 2 (DF2-1)" }
            console.log("[D] " + f1());
        }
        console.log("[E] " + f1());
    }
    if (typeof f1 !== 'undefined') { console.log("[F] " + f1()) }
    if (typeof f2 !== 'undefined') { console.log("[G] " + f2()) }
    else { console.log('[G] f2 is not defined in the outer block space!') }
};

// This function is interpreted in strict mode. The result will be:
//
// [A] This is f1() as defined in the "outer block space" (DF1-1)
// [B] This is f1() as defined within block 1 (DF1-2)
// [C] This is f1() as defined within block 2 (DF1-3)
// [D] This is f1() as defined within block 2 (DF1-3)
// [E] This is f1() as defined within block 1 (DF1-2)
// [F] This is f1() as defined in the "outer block space" (DF1-1)
// [G] f2 is not defined in the outer block space!

let test2 = function() {
    'use strict';
    // The "outer block space"
    function f1() { return 'This is f1() as defined in the "outer block space" (DF1-1)' }
    console.log("[A] " + f1());

    {   // Block 1
        function f1() { return "This is f1() as defined within block 1 (DF1-2)" }
        console.log("[B] " + f1());
        {   // Block 2
            console.log("[C] " + f1());
            function f1() { return "This is f1() as defined within block 2 (DF1-3)" }
            function f2() { return "This is f2() as defined within block 2 (DF2-1)" }
            console.log("[D] " + f1());
        }
        console.log("[E] " + f1());
    }
    if (typeof f1 !== 'undefined') { console.log("[F] " + f1()) }
    if (typeof f2 !== 'undefined') { console.log("[G] " + f2()) }
    else { console.log('[G] f2 is not defined in the outer block space!') }
};

console.log("Run test1()");
test1();
console.log("Run test2()");
test2();
