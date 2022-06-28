#!/usr/bin/env node
"use strict";

var _yargs = _interopRequireDefault(require("yargs"));

var _helpers = require("yargs/helpers");

var _fromXlsx = require("./fromXlsx");

var _toXlsx = require("./toXlsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _yargs["default"])((0, _helpers.hideBin)(process.argv)).command({
  command: 'fromXlsx',
  aliases: ['fx'],
  describe: 'Convert XLSX to JSON',
  handler: function handler(argv) {
    (0, _fromXlsx.fromXlsx)(argv.source, argv.destination);
  }
}).command({
  command: 'toXlsx',
  aliases: ['tx'],
  describe: 'Convert JSON to XSLX',
  handler: function handler(argv) {
    (0, _toXlsx.toXlsx)(argv.source, argv.destination);
  }
}).demandCommand().option('source', {
  alias: 's',
  describe: 'Path to Source'
}).option('destination', {
  alias: 'd',
  describe: 'Path to Destination'
}).help().argv;