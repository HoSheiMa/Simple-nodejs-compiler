var callFunctionName = null;
var propsNames = [];
endLine = function () {
    var _callFunctionName = callFunctionName;
    var _propsNames = propsNames;
    callFunctionName = null;
    propsNames = null;

    return {
        processType: "[CALLFUNCTION]",
        name: _callFunctionName,
        props: _propsNames,
    };
}
module.exports = {
    letter: function (name) {
        callFunctionName = name;
        return {
            openC: function propsLoop() {
                return {
                    letter: function (propsName) {
                        propsNames.push(propsName);
                        return {
                            closeC: {
                                endLine: endLine
                            },
                            next: propsLoop,
                        };
                    },
                    String: function (propsName) {
                        propsNames.push(propsName);
                        return {
                            closeC: {
                                endLine: endLine
                            },
                            next: propsLoop,
                        };
                    },
                    closeC: {
                        endLine: endLine
                    },
                }
                    ;
            }
        }
    }
}