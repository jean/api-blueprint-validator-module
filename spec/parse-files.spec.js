'use strict';
var assert = require('assert');
var validator = require('../src/blueprint-parser');

describe("Parse Files", function () {

    describe("Valid file", function () {
        it("should succeed validation", function (done) {
            validator.parseAndValidateFiles("/home/moliveira/projects/api-blueprint-validator-module/spec/md/simple-api-spec.md", true, function(success){
                assert.ok(success);
                done();
            });
        });
    });

    describe("Invalid file", function () {
        it("should fail validation", function (done) {
            validator.parseAndValidateFiles("/home/moliveira/projects/api-blueprint-validator-module/spec/md/invalid-api-spec.md", true, function(success){
                assert(!success);
                done();
            });
        });
    });

});