# api-blueprint-validator-module

[![npm version](https://badge.fury.io/js/api-blueprint-validator-module.svg)](http://badge.fury.io/js/api-blueprint-validator-module) [![Build Status](https://travis-ci.org/Aconex/api-blueprint-validator-module.svg)](https://travis-ci.org/Aconex/api-blueprint-validator-module)

> Module that validates Blueprint files.

## Installation

`npm install api-blueprint-validator-module`

## Usage

Creating the validator

`var blueprintValidator = require('api-blueprint-validator-module')`

### Blueprint Parse Warnings

The API Blueprint Validator can be configured to ignore warning or to fail on them. 
 
### Validation Callback

The validation expects a callback function such as:

`function (success, validationResults)`

*success* indicates whether the validation has succeed 

*validationResults* is an object containing the used data, errors and warnings:

```
    { 
        data: '',
        errors: [],
        warnings: [] 
    }
```

 
### File validation

`blueprintValidator.parseAndValidateFiles(<<glob expression>>, failOnWarnings, function(success, validationResult))`

### String validation

`blueprintValidator.parseAndValidateFiles(blueprintData, failOnWarnings, function(success, validationResult))`

#### NOTE

This module uses Drafter.js, which is pre-release from version 1.1.0.
 
If you want don't want to use Drafter.js you can use version 1.0.x, which uses Protagonist instead.
