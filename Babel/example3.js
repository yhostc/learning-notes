var babel = require("babel-core");
var options = {};

var result = babel.transform("code();", options);
console.log(result.code);
console.log(result.map);
console.log(result.ast);
