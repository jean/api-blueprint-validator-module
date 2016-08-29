'use strict';
var assert = require('assert');
var validator = require('../src/blueprint-parser');

describe("Parse String", function () {

    describe("Valid string", function () {
        it("should succeed validation", function (done) {

            var data =
                "FORMAT: 1A\n\n" +
                "# Return all the things \n" +
                "Lists all the things from the API \n\n" +
                "## Things [/api/things]\n\n" +
                "### Retrieve all the things [GET]\n\n" +
                "+ Response 200 (application/json;charset=UTF-8)\n\n" +
                "    + Body\n\n" +
                "            {\"text\":\"Zip2\",\"id\": \"1\"}";

            validator.parseAndValidateString(data, true, function(success, validationResult){
                assert.ok(success);
                assert(validationResult.errors.length === 0);
                assert(validationResult.warnings.length === 0);
                done();
            });
        });
    });

    describe("Invalid string", function () {
        it("should fail validation", function (done) {
            var data =
                "FORMAT: 1A\n\n" +
                "# Return all the things \n" +
                "Lists all the things from the API \n\n" +
                "## Things [/api/things]\n\n" +
                "### Retrieve all the things [GET]\n\n" +
                "+ Response 200 (application/json;charset=UTF-8)\n\n" +
                "    + Body\n\n" +
                "            {\"text:\"Zip2\",\"id\": \"1\"}";

            validator.parseAndValidateString(data, true, function(success, validationResult){
                assert(!success);
                assert(validationResult.errors.length === 1);
                assert(validationResult.errors[0].errorMessage === 'JSON Body validation - SyntaxError: Unexpected token Z in JSON at position 8');
                done();
            });
        });
    });

});