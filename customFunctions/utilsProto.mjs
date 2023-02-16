// using functions and prototypes instead of classes


export function utilsProto(){}


utilsProto.prototype.log1 = function(){ console.log("Hello 1")}
utilsProto.prototype.log2 = function(){ console.log("Hello 2")}

// must be instantiated at call site with new keyword
// const util = new utilsProto()
// util.log1() ----> "Hello 1"