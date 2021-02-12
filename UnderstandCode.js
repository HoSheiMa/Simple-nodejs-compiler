const patterns = require("./patterns");
module.exports = function (code) {
    AllProcess = [];
    AllProcessCode = [];
    AllProcessStringArray = [];
    ProcessCode = "";
    ProcessArray = [];

    // console.log(code);
    var pattersIndex = 0;
    var way = patterns[pattersIndex]; // default index
    var WayString = "";
    var startSteps = 0;
    for (var c = 0; c < code.length; c++) {
        var l = code[c];
        var type = l["type"];
        if (type == "space") {
            way = way;
            ProcessCode += l["text"];
            ProcessArray.push(l);
            continue;
        }
        if (way[type]) {
            // add how mach we run in this line of code
            startSteps++;

            way = typeof way[type] == "function" ? way[type](l["text"]) : way[type]; // ! important
            ProcessCode += l["text"];
            ProcessArray.push(l);

            WayString += "." + type;

        } else {
            WayString += "." + type;
            // not in own syntax
            // console.log('Errror ', ProcessCode, ' - - -', type, 'pI ', pattersIndex, 'startSteps ', startSteps, 'c ', c)
            ProcessArray = [];
            ProcessCode = "";
            WayString = "";
            // try with other syntax pattern
            // here we remove the lastest steps we readed it in the last pattern and start again with the other lang
            // pattern to checking
            c = c - (startSteps + 1);
            startSteps = 0;
            // take the next pattern style
            way = patterns[pattersIndex++];

        }

        if (l["type"] === "endLine") {
            // console.log("#Finished: ", ProcessCode, "Way : " + WayString);
            var Process = way;


            AllProcessStringArray.push(ProcessArray);
            AllProcessCode.push(ProcessCode);

            if (typeof way == "function") {

                Process = way(ProcessCode, WayString, ProcessArray);
            }
            AllProcess.push(Process);
            ProcessArray = [];
            ProcessCode = "";
            startSteps = 0; // reset
            WayString = "";
            pattersIndex = 0; // default index to start from 0 pattern
            way = patterns[pattersIndex]; // default index to start from 0 pattern
        }


    }
    console.log(AllProcess);
    return {
        AllProcess: AllProcess,
        AllProcessStringArray: AllProcessStringArray,
        AllProcessCode: AllProcessCode,
    };

}