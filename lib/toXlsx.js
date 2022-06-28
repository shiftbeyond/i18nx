"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toXlsx = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _xlsx = _interopRequireDefault(require("xlsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var convert = function convert(source, destination) {
  console.log('Starting conversion, press CTRL-C to exit.');
  var target = destination !== null && destination !== void 0 ? destination : source.replace('.json', '.xlsx');

  _fs["default"].readFile(source, {
    encoding: 'utf8'
  }, function (err, data) {
    if (err) return console.warn("Ignoring ".concat(source, ", not found."));

    try {
      var jsonLibrary = JSON.parse(data);
      var xlsxLibrary = Object.entries(jsonLibrary).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            translations = _ref2[1];

        var mapped = {
          term: key
        };
        Object.entries(translations).map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              lang = _ref4[0],
              value = _ref4[1];

          mapped[lang] = value;
        });
        return mapped;
      });

      var worksheet = _xlsx["default"].utils.json_to_sheet(xlsxLibrary);

      var workbook = _xlsx["default"].utils.book_new();

      workbook.SheetNames.push('i18n');
      workbook.Sheets['i18n'] = worksheet;

      _xlsx["default"].writeFile(workbook, target);

      console.log("Created ".concat(target, " from JSON."));
    } catch (error) {
      console.error(error);
    }
  });
};

var toXlsx = function toXlsx(source, destination) {
  convert(source, destination);

  _fs["default"].watchFile(source, function () {
    convert(source, destination);
  });
};

exports.toXlsx = toXlsx;