var async = require('async');
var glob = require('glob');
var fs = require('fs');
var drafter = require('drafter.js');
var validator = require('./validator');
var resultHandler = require('./result-handler');

var PARSER_OPTIONS = {type: 'ast'};

var lineNumberFromCharacterIndex = function(string, index) {
    return string.substring(0, index).split("\n").length;
};

var getExamples = function(ast, callback) {
    ast.resourceGroups.forEach(function(resourceGroup) {
        resourceGroup.resources.forEach(function(resource) {
            resource.actions.forEach(function(action) {
                action.examples.forEach(function(example) {
                    callback(example, action, resource, resourceGroup);
                });
            });
        });
    });
};

var createParseResultHandler = function(validatorResult, cb) {
    return function (error, result, blueprintData) {
        if (error) {
            var lineNumber = lineNumberFromCharacterIndex(blueprintData, error.location[0].index);
            validatorResult.errors.push({errorMessage: 'Error: ' + error.message + ' on line ' + lineNumber});
        } else {
            if (result.warnings.length) {
                validatorResult.warnings = result.warnings.map(function (warning) {
                    var lineNumber = lineNumberFromCharacterIndex(blueprintData, warning.location[0].index);
                    return {errorMessage: warning.message + ' on line ' + lineNumber};
                });
            }

            getExamples(result.ast, function (example, action, resource, resourceGroup) {
                example.requests.forEach(validator.validateJsonSpec(validatorResult, example, action, resource, resourceGroup));
                example.responses.forEach(validator.validateJsonSpec(validatorResult, example, action, resource, resourceGroup));
            });
        }

        cb(null, validatorResult);
    };
};

function parseBlueprintData(data, cb) {
    drafter.parse(data, PARSER_OPTIONS, function (error, result) {
        if (error) {
            return cb(error, null, data);
        }
        cb(false, result, data);
    });
}

function readFileAndParseBlueprint(file, cb) {
    var data = fs.readFileSync(file, {encoding: 'utf8'});
    parseBlueprintData(data, cb);
}

function parseFile(file, cb) {
    var validatorResult = {file: file, errors: [], warnings: []};
    readFileAndParseBlueprint(file, createParseResultHandler(validatorResult, cb));
}

function getParser(file) {
    return function(asyncCb) {
        parseFile(file, asyncCb);
    };
}

exports.parseAndValidateFiles = function(filesPath, failOnWarnings, cb) {
    var parallelTasks;

    glob(filesPath, {}, function(err, files) {
        parallelTasks = files.map(function(file) {
            return getParser(file);
        });

        async.parallel(parallelTasks, resultHandler(failOnWarnings, cb));
    });

};

exports.parseAndValidateString = function(data, cb) {
    var validatorResult = {data: data,errors: [],warnings: []};

    parseBlueprintData(data, createParseResultHandler(validatorResult, cb));
};
