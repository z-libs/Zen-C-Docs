/*
 @licstart  The following is the entire license notice for the JavaScript code in this file.

 The MIT License (MIT)

 Copyright (C) 1997-2020 by Dimitri van Heesch

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 and associated documentation files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, merge, publish, distribute,
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or
 substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 @licend  The above is the entire license notice for the JavaScript code in this file
*/
var NAVTREE =
[
  [ "Zen-C", "index.html", [
    [ "Zen C", "index.html#autotoc_md0", [
      [ "Overview", "index.html#autotoc_md2", null ],
      [ "Community", "index.html#autotoc_md3", null ],
      [ "Index", "index.html#autotoc_md5", null ],
      [ "Quick Start", "index.html#autotoc_md7", [
        [ "Installation", "index.html#autotoc_md8", null ],
        [ "Portable Build (APE)", "index.html#autotoc_md9", null ],
        [ "Usage", "index.html#autotoc_md10", null ],
        [ "Environment Variables", "index.html#autotoc_md11", null ]
      ] ],
      [ "Language Reference", "index.html#autotoc_md13", [
        [ "1. Variables and Constants", "index.html#autotoc_md14", [
          [ "Manifest Constants (<tt>def</tt>)", "index.html#autotoc_md15", null ],
          [ "Variables (<tt>let</tt>)", "index.html#autotoc_md16", null ]
        ] ],
        [ "2. Primitive Types", "index.html#autotoc_md17", null ],
        [ "3. Aggregate Types", "index.html#autotoc_md18", [
          [ "Arrays", "index.html#autotoc_md19", null ],
          [ "Tuples", "index.html#autotoc_md20", null ],
          [ "Structs", "index.html#autotoc_md21", null ],
          [ "Enums", "index.html#autotoc_md22", null ],
          [ "Unions", "index.html#autotoc_md23", null ],
          [ "Type Aliases", "index.html#autotoc_md24", null ]
        ] ],
        [ "4. Functions & Lambdas", "index.html#autotoc_md25", [
          [ "Functions", "index.html#autotoc_md26", null ],
          [ "Const Arguments", "index.html#autotoc_md27", null ],
          [ "Default Arguments", "index.html#autotoc_md28", null ],
          [ "Lambdas (Closures)", "index.html#autotoc_md29", null ],
          [ "Raw Function Pointers", "index.html#autotoc_md30", null ],
          [ "Variadic Functions", "index.html#autotoc_md31", null ]
        ] ],
        [ "5. Control Flow", "index.html#autotoc_md32", [
          [ "Conditionals", "index.html#autotoc_md33", null ],
          [ "Pattern Matching", "index.html#autotoc_md34", null ],
          [ "Reference Binding", "index.html#autotoc_md35", null ],
          [ "Loops", "index.html#autotoc_md36", null ],
          [ "Advanced Control", "index.html#autotoc_md37", null ]
        ] ],
        [ "6. Operators", "index.html#autotoc_md38", [
          [ "Overloadable Operators", "index.html#autotoc_md39", null ],
          [ "Syntactic Sugar", "index.html#autotoc_md40", null ]
        ] ],
        [ "7. Printing and String Interpolation", "index.html#autotoc_md41", [
          [ "Keywords", "index.html#autotoc_md42", null ],
          [ "Shorthands", "index.html#autotoc_md43", null ],
          [ "String Interpolation (F-strings)", "index.html#autotoc_md44", null ],
          [ "Input Prompts (<tt>?</tt>)", "index.html#autotoc_md45", null ]
        ] ],
        [ "8. Memory Management", "index.html#autotoc_md46", [
          [ "Defer", "index.html#autotoc_md47", null ],
          [ "Autofree", "index.html#autotoc_md48", null ],
          [ "Resource Semantics (Move by Default)", "index.html#autotoc_md49", null ],
          [ "RAII / Drop Trait", "index.html#autotoc_md50", null ]
        ] ],
        [ "9. Object Oriented Programming", "index.html#autotoc_md51", [
          [ "Methods", "index.html#autotoc_md52", null ],
          [ "Traits", "index.html#autotoc_md53", null ],
          [ "Standard Traits", "index.html#autotoc_md54", null ],
          [ "Composition", "index.html#autotoc_md55", null ]
        ] ],
        [ "10. Generics", "index.html#autotoc_md56", null ],
        [ "11. Concurrency (Async/Await)", "index.html#autotoc_md57", null ],
        [ "12. Metaprogramming", "index.html#autotoc_md58", [
          [ "Comptime", "index.html#autotoc_md59", null ],
          [ "Embed", "index.html#autotoc_md60", null ],
          [ "Plugins", "index.html#autotoc_md61", null ],
          [ "Generic C Macros", "index.html#autotoc_md62", null ]
        ] ],
        [ "13. Attributes", "index.html#autotoc_md63", null ],
        [ "Custom Attributes", "index.html#autotoc_md64", [
          [ "Syntax Mapping", "index.html#autotoc_md65", null ]
        ] ],
        [ "Smart Derives", "index.html#autotoc_md66", null ],
        [ "14. Inline Assembly", "index.html#autotoc_md67", [
          [ "Basic Usage", "index.html#autotoc_md68", null ],
          [ "Volatile", "index.html#autotoc_md69", null ],
          [ "Named Constraints", "index.html#autotoc_md70", null ]
        ] ],
        [ "15. Build Directives", "index.html#autotoc_md71", [
          [ "Examples", "index.html#autotoc_md72", null ]
        ] ]
      ] ],
      [ "Standard Library", "index.html#autotoc_md74", [
        [ "Key Modules", "index.html#autotoc_md75", null ]
      ] ],
      [ "Tooling", "index.html#autotoc_md77", [
        [ "Language Server (LSP)", "index.html#autotoc_md78", null ],
        [ "REPL", "index.html#autotoc_md79", [
          [ "Features", "index.html#autotoc_md80", null ],
          [ "Commands", "index.html#autotoc_md81", null ]
        ] ]
      ] ],
      [ "Compiler Support & Compatibility", "index.html#autotoc_md83", [
        [ "Test Suite Status", "index.html#autotoc_md84", null ],
        [ "Building with Zig", "index.html#autotoc_md85", null ],
        [ "C++ Interop", "index.html#autotoc_md86", [
          [ "Using C++ in Zen C", "index.html#autotoc_md87", null ],
          [ "CUDA Interop", "index.html#autotoc_md88", null ],
          [ "CUDA-Specific Attributes", "index.html#autotoc_md89", null ],
          [ "Kernel Launch Syntax", "index.html#autotoc_md90", null ],
          [ "Writing CUDA Kernels", "index.html#autotoc_md91", null ],
          [ "Standard Library (<tt>std/cuda.zc</tt>)", "index.html#autotoc_md92", null ]
        ] ]
      ] ],
      [ "</blockquote>", "index.html#autotoc_md93", null ],
      [ "Contributing", "index.html#autotoc_md94", [
        [ "How to Contribute", "index.html#autotoc_md95", null ],
        [ "Running Tests", "index.html#autotoc_md96", null ],
        [ "Extending the Compiler", "index.html#autotoc_md97", null ]
      ] ],
      [ "Attributions", "index.html#autotoc_md99", null ]
    ] ],
    [ "Data Structures", "annotated.html", [
      [ "Data Structures", "annotated.html", "annotated_dup" ],
      [ "Data Structure Index", "classes.html", null ],
      [ "Data Fields", "functions.html", [
        [ "All", "functions.html", "functions_dup" ],
        [ "Functions", "functions_func.html", null ],
        [ "Variables", "functions_vars.html", "functions_vars" ]
      ] ]
    ] ],
    [ "Files", "files.html", [
      [ "File List", "files.html", "files_dup" ],
      [ "Globals", "globals.html", [
        [ "All", "globals.html", "globals_dup" ],
        [ "Functions", "globals_func.html", "globals_func" ],
        [ "Variables", "globals_vars.html", null ],
        [ "Typedefs", "globals_type.html", null ],
        [ "Enumerations", "globals_enum.html", null ],
        [ "Enumerator", "globals_eval.html", null ],
        [ "Macros", "globals_defs.html", null ]
      ] ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"annotated.html",
"codegen_8h.html#a4b93522b77d8b2a909089a2add5d215a",
"index.html#autotoc_md28",
"parser_8h.html#aa4e7d1a473d0280792d98ddb184d3006a935e24750e9ae953c5291c5567be873a",
"structASTNode.html#a130599e45bd6bf83ff0b9403c0f94f96",
"structForthWord.html#ac405cfa1f702bd8cc01cc187366526f5",
"structprintbuffer.html#a1a679f8b6fe9b413fb3a87203b0f5bc8"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';