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



    describe("failOnWarnings", function () {
        var dataWithWarining =
            "FORMAT: 1A\n\n" +
            "# Return all the things \n" +
            "Lists all the things from the API \n\n" +
            "## Things [/api/things]\n\n" +
            "### Retrieve all the things [GET]\n\n" +
            "+ Response 200 (application/json;charset=UTF-8)\n\n" +
            "    + Body\n\n" +
            "       {\"text\":\"Zip2\",\"id\": \"1\"}";

        function assertValidationResult(validationResult) {
            assert(validationResult.errors.length === 0);
            assert(validationResult.warnings.length === 1);
            assert(validationResult.warnings[0].errorMessage === 'message-body asset is expected to be a pre-formatted code block, every of its line indented by exactly 12 spaces or 3 tabs on line 14');
        }

        it("should fail validation", function (done) {
            validator.parseAndValidateString(dataWithWarining, true, function(success, validationResult){
                assert(!success);
                assertValidationResult(validationResult);
                done();
            });
        });

        it("should not fail validation", function (done) {
            validator.parseAndValidateString(dataWithWarining, false, function(success, validationResult){
                assert.ok(success);
                assertValidationResult(validationResult);
                done();
            });
        });
    });

});