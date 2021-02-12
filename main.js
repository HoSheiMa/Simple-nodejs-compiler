fs = require("fs");
UnderstandCode = require("./UnderstandCode");
read = require("./read");
async function getCode() {
  var code = await new Promise((r, v) => {
    fs.readFile("./code.super", "utf8", function (err, data) {
      if (err) {
        return v(err);
      }
      r(data);
    });
  });
  code = read(code);
  // console.log(code);
  code = UnderstandCode(code);
  // console.log(code);
}

getCode();
