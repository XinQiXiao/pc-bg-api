
var express = require('express')
var use = require('./config/use')

var app = express();

use(app)

module.exports = app
