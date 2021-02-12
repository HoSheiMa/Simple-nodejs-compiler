module.exports = function (code) {
    var finalCode = [];
    var openString = false; // long string
    var openB = false;
    var openBIsideCode = "";
    var openBnumber = 0;
    var id = null;
    Find = (FindId) => {
        obj = null;
        var process = 0;
        for (; process < finalCode.length; process++) {
            obj = finalCode[process];
            if (obj.id == FindId) {
                break;
            }
        }
        return {
            set: function (fn) {
                var changes = fn(obj);
                finalCode[process] = changes;
            },
        };
    };

    const open = true;
    const closed = false;

    for (let l = 0; l < code.length; l++) {
        var letter = code[l];
        // type
        // letter
        // index
        // id
        // state = open or close
        if (/[a-zA-Z0-9]/.test(letter)) {
            // if (openB) {
            //   openBIsideCode += letter;
            //   continue;
            // }
            var fullText = "";
            while (/[a-zA-Z0-9]/.test(letter)) {
                fullText += letter;
                l++;
                letter = code[l];
            }
            id = Math.floor(Math.random() * 342343 * l);
            const LangConsts = ['func'];
            var type = LangConsts.includes(fullText) ? fullText : "letter";

            finalCode.push({
                type: type,
                regax: /[a-zA-Z0-9]/,
                index: l,
                text: fullText,
                id: id,
                state: open,
            });
        }

        // finished checking for letters and numbers

        if (letter == "=") {
            if (openB) {
                openBIsideCode += letter;
                continue;
            }
            finalCode.push({
                type: "eq",
                regax: "=",
                index: l,
                text: letter,
                id: id,
                state: closed,
            });
            continue;
        }
        if (letter == ";") {
            if (openB) {
                openBIsideCode += letter;
                continue;
            }
            finalCode.push({
                type: "endLine",
                regax: ";",
                index: l,
                text: letter,
                id: id,
                state: closed,
            });
            continue;
        }
        if (letter === ":") {
            if (openB) {
                openBIsideCode += letter;
                continue;
            }
            finalCode.push({
                type: "eq2",
                regax: ":",
                index: l,
                text: letter,
                id: id,
                state: closed,
            });
            continue;
        }
        if (letter == "(") {
            if (openB) {
                openBIsideCode += letter;
                continue;
            }
            finalCode.push({
                type: "openC",
                regax: "(",
                index: l,
                text: letter,
                id: id,
                state: open,
            });
            continue;
        }
        if (letter == ")") {
            if (openB) {
                openBIsideCode += letter;
                continue;
            }
            finalCode.push({
                type: "closeC",
                regax: ")",
                index: l,
                text: letter,
                id: id,
                state: closed,
            });
            continue;
        }
        if (letter == "{") {

            finalCode.push({
                type: "openB",
                regax: "{",
                index: l,
                text: letter,
                id: id,
                state: open,
            });
            l++;
            letter = code[l];
            var innerCode = "";
            var OpenBFindInCode = 0;
            while (letter) {
                if (letter == "}" && OpenBFindInCode == 0) {
                    finalCode.push({
                        type: "code",
                        regax: "",
                        index: l,
                        text: innerCode,
                        id: id,
                        state: closed,
                    });
                    finalCode.push({
                        type: "closeB",
                        regax: "}",
                        index: l,
                        text: letter,
                        id: id,
                        state: closed,
                    });
                    break;
                }
                if (letter == "{") OpenBFindInCode++;
                if (letter == "}") OpenBFindInCode--;
                innerCode += letter;


                l++;
                letter = code[l];
            }
            continue;
        }
        if (letter == "[") {
            if (openB) {
                openBIsideCode += letter;
                continue;
            }
            finalCode.push({
                type: "openA",
                regax: "[",
                index: l,
                text: letter,
                id: id,
                state: open,
            });
            continue;
        }
        if (letter == "]") {
            if (openB) {
                openBIsideCode += letter;
                continue;
            }
            finalCode.push({
                type: "closeA",
                regax: "]",
                index: l,
                text: letter,
                id: id,
                state: closed,
            });
            continue;
        }
        if (letter == ",") {
            if (openB) {
                openBIsideCode += letter;
                continue;
            }
            finalCode.push({
                type: "next",
                regax: ",",
                index: l,
                text: letter,
                id: id,
                state: closed,
            });
            continue;
        }
        if (letter == ".") {
            if (openB) {
                openBIsideCode += letter;
                continue;
            }
            finalCode.push({
                type: "endPoint",
                regax: ".",
                index: l,
                text: letter,
                id: id,
                state: closed,
            });
            continue;
        }
        if (letter == '"') {
            var innerString = "";
            l++;
            letter = code[l];
            while (letter) {
                if (letter == '"') break;
                innerString += letter;
                l++;
                letter = code[l];
            }
            finalCode.push({
                type: "String",
                regax: null,
                index: l,
                text: innerString,
                id: id,
                state: closed,
            });
            continue;
        }

        if (letter == " ") {
            var _l = l;
            while (letter == " ") {
                l = _l; // catch the last index we stop in it
                _l++;
                letter = code[_l];
            }
            finalCode.push({
                type: "space",
                regax: " ",
                index: l,
                text: ' ',
                id: id,
                state: closed,
            });
        }

    }
    return (finalCode);
};
