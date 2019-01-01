// tsc --lib ES6 t1_.ts

function f1() { return 'This is f1() as defined in the "outer block space" (DF1-1)' }
console.log("[A] " + f1());

{   // Block 1
    // Definition DF1-2
    function f1() { return "This is f1() as defined within block 1 (DF1-2)" }
    console.log("[B] " + f1());
    {   // Block 2
        console.log("[C] " + f1());
        // Definition DF1-3
        function f1() { return "This is f1() as defined within block 2 (DF1-3)" }
        // Definition DF2-1
        function f2() { return "This is f2() as defined within block 2 (DF2-1)" }
        console.log("[D] " + f1());
    }
    console.log("[E] " + f1());
}
if (typeof f1 !== 'undefined') { console.log("[F] " + f1()) }
