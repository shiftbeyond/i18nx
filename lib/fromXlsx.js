"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromXlsx = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _xlsx = _interopRequireDefault(require("xlsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var convert = function convert(source, destination) {
  console.log('Starting conversion, press CTRL-C to exit.');
  var target = destination !== null && destination !== void 0 ? destination : source.replace('.xlsx', '.json');

  _fs["default"].readFile(source, function (err, data) {
    if (err) return console.warn("Ignoring ".concat(source, ", not found."));

    try {
      var workbook = _xlsx["default"].read(data, {
        type: 'buffer'
      });

      var firstSheet = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[firstSheet];

      var jsonLibrary = _xlsx["default"].utils.sheet_to_json(worksheet);

      _fs["default"].writeFile(target, JSON.stringify(jsonLibrary, null, 2), {
        encoding: 'utf8'
      }, function (err) {
        if (err) console.error(err);
        console.log("Created ".concat(target, " from XLSX."));
      });
    } catch (error) {
      console.error(error);
    }
  });
};

var fromXlsx = function fromXlsx(source, destination) {
  convert(source, destination);

  _fs["default"].watchFile(source, function () {
    convert(source, destination);
  });
};

exports.fromXlsx = fromXlsx;