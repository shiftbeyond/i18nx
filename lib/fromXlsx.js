"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromXlsx = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _xlsx = _interopRequireDefault(require("xlsx"));

var _excluded = ["term"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

      var xlsxLibrary = _xlsx["default"].utils.sheet_to_json(worksheet);

      var jsonLibrary = {};
      xlsxLibrary.forEach(function (_ref) {
        var term = _ref.term,
            translations = _objectWithoutProperties(_ref, _excluded);

        jsonLibrary[term] = translations;
      });

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