'use strict';
var assert = require('assert');
var validator = require('../src/blueprint-parser');

describe("Parse Files", function () {

    describe("Valid file", function () {
        it("should succeed validation", function (done) {
            validator.parseAndValidateFiles("./spec/md/simple-api-spec.md", true, function(success){
                assert.ok(success);
                done();
            });
        });
    });

    describe("Invalid file", function () {
        it("should fail validation", function (done) {
            validator.parseAndValidateFiles("./spec/md/invalid-api-spec.md", true, function(success){
                assert(!success);
                done();
            });
        });
    });

    describe("failOnWarnings", function () {
        it("should fail validation", function (done) {
            validator.parseAndValidateFiles("./spec/md/simple-api-warning-spec.md", true, function(success){
                assert(!success);
                done();
            });
        });

        it("should not fail validation", function (done) {
            validator.parseAndValidateFiles("./spec/md/simple-api-warning-spec.md", false, function(success){
                assert.ok(success);
                done();
            });
        });
    });

});