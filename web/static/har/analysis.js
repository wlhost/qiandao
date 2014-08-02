// Generated by CoffeeScript 1.7.1
(function() {
  define(function(require, exports, module) {
    var checked, first_request, sort;
    first_request = function(har) {
      var current_page, entry, _i, _len, _ref;
      current_page = null;
      _ref = har.log.entries;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        if (entry.pageref !== current_page) {
          entry.first_request = true;
          current_page = entry.pageref;
        }
      }
      return har;
    };
    checked = function(har) {
      var entry, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;
      _ref = har.log.entries;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        if ((_ref1 = entry.response.status) === 0 || _ref1 === 304) {
          entry.checked = false;
        } else if (((_ref2 = entry.response.content) != null ? _ref2.mimeType.indexOf('image') : void 0) === 0) {
          entry.checked = false;
        } else if ((_ref3 = (_ref4 = entry.response.content) != null ? _ref4.mimeType : void 0) === 'text/css') {
          entry.checked = false;
        } else {
          entry.checked = true;
        }
      }
      return har;
    };
    sort = function(har) {
      har.log.entries = har.log.entries.sort(function(a, b) {
        if (a.pageref > b.pageref) {
          return 1;
        } else if (a.pageref < b.pageref) {
          return -1;
        } else if (a.startedDateTime > b.startedDateTime) {
          return 1;
        } else if (a.startedDateTime < b.startedDateTime) {
          return -1;
        } else {
          return 0;
        }
      });
      return har;
    };
    exports.analyze = function(har) {
      return checked(first_request(sort(har)));
    };
    return exports;
  });

}).call(this);
