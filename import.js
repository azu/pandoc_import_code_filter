#!/usr/bin/env node

var traverse = require("traverse");
var es = require("event-stream");
var fs = require("fs");
var path = require("path");
const importRegExp = /^\$import\((.*?)\)/;
function is$import(string) {
    return importRegExp.test(string);
}
function get$importFile(string) {
    return string.match(importRegExp)[1];
}
function inline$importFile(filePath) {
    return fs.readFileSync(path.resolve(process.cwd(), filePath), "utf-8");
}
function main(data) {
    return traverse(data).map(function (obj) {
        if (obj["t"] === "CodeBlock") {
            var codeBlock = obj["c"];
            if (!codeBlock) {
                return obj;
            }
            var body = codeBlock[codeBlock.length - 1];
            if (is$import(body)) {
                var filePath = get$importFile(body);
                codeBlock[codeBlock.length - 1] = inline$importFile(filePath);
            }
        }
    });
}
// input -> main -> ouput
process.stdin
    .pipe(es.parse())
    .pipe(es.map(function (data, callback) {
        callback(null, main(data));
    }))
    .pipe(es.stringify())
    .pipe(process.stdout);
