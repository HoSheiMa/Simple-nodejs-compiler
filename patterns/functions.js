read = require("../read");
var argsNames = [];
var FunctionName = null;
var CodeLines = [];
// here we using the function in function because the understantcode.js
// call first one in if way checker and sec for endline chcker
EndLine = () => function (ProcessCode, WayString, ProcessArray) {
    // console.log(
    //     "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n",
    //     ProcessCode,
    // "way : " + WayString,
    // "Array System: ",
    // ProcessArray
    // );
    //
    // console.log(ProcessArray[7]['text'], read(ProcessArray[7]['text']), '----!')
    // const code = ProcessArray[7]["text"];
    // const v = read(code);
    // console.log(
    //   ":1",
    //   ProcessCode,
    //   "\n",
    //   ":2",
    //   code,
    //   "\n",
    //   ":3",
    //   v,
    //   "\n"
    // );


    var _FunctionName = FunctionName;
    var _CodeLines = CodeLines;
    var _argsNames = argsNames;
    argsNames = [];
    FunctionName = null;
    CodeLines = [];
    return {
        processType: "[FUNCTION]",
        name: _FunctionName,
        args: _argsNames,
        codes: _CodeLines
    };
}

module.exports = {
    func: {
        letter: function (name) {
            FunctionName = name;
            return {
                openC: function ArgsLoop() {
                    return {
                        letter: function (arg) {
                            argsNames.push(arg);
                            return {
                                next: ArgsLoop,
                                closeC: {
                                    openB: {
                                        code: {
                                            closeB: {
                                                endLine: EndLine, // function style
                                            },
                                        },
                                    },
                                },

                            }
                        },
                        closeC: {
                            openB: {
                                code: {
                                    closeB: {
                                        endLine: EndLine, // function style
                                    },
                                },
                            },
                        },
                    }
                }
            }
        },
    }
}
