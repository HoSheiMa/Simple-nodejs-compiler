var VariablesNames = [];
var VariablesValues = [];

module.exports = {
    letter: function (title) {
        VariablesNames.push(title);
        return {
            next: function virableLoop() {
                return {
                    letter: function (title) {
                        VariablesNames.push(title);
                        return {
                            next: () => virableLoop(),
                            eq: function ValueLoop() {
                                return {
                                    letter: (value) => {
                                        VariablesValues.push(value);
                                        return {
                                            next: () => ValueLoop(),
                                            endLine: function () {
                                                _LVirablesNames = VariablesNames;
                                                _LVirablesValues = VariablesValues;
                                                VariablesNames = [];
                                                VariablesValues = [];
                                                return {
                                                    processType: "[VARIABLE]",
                                                    names: _LVirablesNames,
                                                    values: _LVirablesValues,
                                                };
                                            }, // virable
                                        };
                                    },
                                    String: (value) => {
                                        VariablesValues.push(value);
                                        return {
                                            next: () => ValueLoop(),
                                            endLine: function () {
                                                _LVirablesNames = VariablesNames;
                                                _LVirablesValues = VariablesValues;
                                                VariablesNames = [];
                                                VariablesValues = [];
                                                return {
                                                    processType: "[VARIABLE]",
                                                    names: _LVirablesNames,
                                                    values: _LVirablesValues,
                                                };
                                            }, // virable
                                        };
                                    },
                                };
                            },
                        };
                    },
                };
            },
            eq: {
                letter: function (value) {
                    VariablesValues.push(value);
                    return {
                        endLine: function () {
                            _LVariablesNames = VariablesNames;
                            _LVariablesValues = VariablesValues;
                            VariablesNames = [];
                            VariablesValues = [];
                            // we will return a element as component orders

                            return {
                                processType: "[VARIABLE]",
                                names: _LVariablesNames,
                                values: _LVariablesValues,
                            };
                        }, // virable
                    };
                },
                String: function (value) {
                    VariablesValues.push(value);
                    return {
                        endLine: function () {
                            _LVariablesNames = VariablesNames;
                            _LVariablesValues = VariablesValues;
                            VariablesNames = [];
                            VariablesValues = [];
                            return {
                                processType: "[VARIABLE]",
                                names: _LVariablesNames,
                                values: _LVariablesValues,
                            };
                        }, // virable
                    };
                },
            },

        };
    }
    ,

}