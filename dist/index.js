"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Detector = exports.Offline = exports.Online = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var inBrowser = typeof navigator !== "undefined";

// these browsers don't fully support navigator.onLine, so we need to use a polling backup
var unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;
var ping = function ping(_ref) {
  var url = _ref.url,
      timeout = _ref.timeout;

  return new Promise(function (resolve) {
    var isOnline = function isOnline() {
      return resolve(true);
    };
    var isOffline = function isOffline() {
      return resolve(false);
    };
    var xhr = new XMLHttpRequest();
    xhr.onerror = isOffline;
    xhr.ontimeout = isOffline;
    xhr.onload = function () {
      var response = xhr.responseText.trim();
      if (!response) {
        isOffline();
      } else {
        isOnline();
      }
    };
    xhr.open("GET", url);
    xhr.timeout = timeout;
    xhr.send();
  });
};

var pingAllUrls = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var urls = _ref2.urls,
        timeout = _ref2.timeout;

    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = urls[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 21;
              break;
            }

            url = _step.value;
            _context.prev = 7;
            _context.next = 10;
            return ping({ url: url, timeout: timeout });

          case 10:
            result = _context.sent;

            if (!(result === true)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", result);

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](7);
            return _context.abrupt("return", false);

          case 18:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(27);

          case 35:
            return _context.abrupt("return", false);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 23, 27, 35], [7, 15], [28,, 30, 34]]);
  }));

  return function pingAllUrls(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var propTypes = {
  children: _propTypes2.default.node,
  onChange: _propTypes2.default.func,
  polling: _propTypes2.default.oneOfType([_propTypes2.default.shape({
    urls: _propTypes2.default.array,
    interval: _propTypes2.default.number,
    timeout: _propTypes2.default.number
  }), _propTypes2.default.bool]),
  wrapperType: _propTypes2.default.string
};

var defaultProps = {
  polling: true,
  wrapperType: "span"
};

var defaultPollingConfig = {
  enabled: inBrowser && unsupportedUserAgentsPattern.test(navigator.userAgent),
  urls: ["https://heartbeat1.indiciummobile.com", "https://heartbeat2.indiciummobile.com", "https://heartbeat3.indiciummobile.com"],
  timeout: 5000,
  interval: 5000
};

// base class that detects offline/online changes

var Base = function (_Component) {
  _inherits(Base, _Component);

  function Base() {
    _classCallCheck(this, Base);

    var _this = _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).call(this));

    _this.state = {
      online: inBrowser && typeof navigator.onLine === "boolean" ? navigator.onLine : true
    };
    // bind event handlers
    _this.goOnline = _this.goOnline.bind(_this);
    _this.goOffline = _this.goOffline.bind(_this);
    return _this;
  }

  _createClass(Base, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("online", this.goOnline);
      window.addEventListener("offline", this.goOffline);

      if (this.getPollingConfig().enabled) {
        this.startPolling();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("online", this.goOnline);
      window.removeEventListener("offline", this.goOffline);

      if (this.pollingId) {
        this.stopPolling();
      }
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _props = this.props,
          children = _props.children,
          wrapperType = _props.wrapperType;

      // usual case: one child that is a react Element

      if ((0, _react.isValidElement)(children)) {
        return children;
      }

      // no children
      if (!children) {
        return null;
      }

      // string children, multiple children, or something else
      return _react.createElement.apply(undefined, [wrapperType, {}].concat(_toConsumableArray(_react.Children.toArray(children))));
    }
  }, {
    key: "getPollingConfig",
    value: function getPollingConfig() {
      switch (this.props.polling) {
        case true:
          return defaultPollingConfig;
        case false:
          return { enabled: false };
        default:
          return Object.assign({}, defaultPollingConfig, this.props.polling);
      }
    }
  }, {
    key: "goOnline",
    value: function goOnline() {
      if (!this.state.online) {
        this.callOnChangeHandler(true);
        this.setState({ online: true });
      }
    }
  }, {
    key: "goOffline",
    value: function goOffline() {
      if (this.state.online) {
        this.callOnChangeHandler(false);
        this.setState({ online: false });
      }
    }
  }, {
    key: "callOnChangeHandler",
    value: function callOnChangeHandler(online) {
      if (this.props.onChange) {
        this.props.onChange(online);
      }
    }
  }, {
    key: "startPolling",
    value: function startPolling() {
      var _this2 = this;

      var _getPollingConfig = this.getPollingConfig(),
          interval = _getPollingConfig.interval;

      this.pollingId = setInterval(function () {
        var _getPollingConfig2 = _this2.getPollingConfig(),
            urls = _getPollingConfig2.urls,
            timeout = _getPollingConfig2.timeout;

        pingAllUrls({ urls: urls, timeout: timeout }).then(function (online) {
          online ? _this2.goOnline() : _this2.goOffline();
        });
      }, interval);
    }
  }, {
    key: "stopPolling",
    value: function stopPolling() {
      clearInterval(this.pollingId);
    }
  }]);

  return Base;
}(_react.Component);

Base.propTypes = propTypes;
Base.defaultProps = defaultProps;

var Online = exports.Online = function (_Base) {
  _inherits(Online, _Base);

  function Online() {
    _classCallCheck(this, Online);

    return _possibleConstructorReturn(this, (Online.__proto__ || Object.getPrototypeOf(Online)).apply(this, arguments));
  }

  _createClass(Online, [{
    key: "render",
    value: function render() {
      return this.state.online ? this.renderChildren() : null;
    }
  }]);

  return Online;
}(Base);

Online.propTypes = propTypes;
Online.defaultProps = defaultProps;

var Offline = exports.Offline = function (_Base2) {
  _inherits(Offline, _Base2);

  function Offline() {
    _classCallCheck(this, Offline);

    return _possibleConstructorReturn(this, (Offline.__proto__ || Object.getPrototypeOf(Offline)).apply(this, arguments));
  }

  _createClass(Offline, [{
    key: "render",
    value: function render() {
      return !this.state.online ? this.renderChildren() : null;
    }
  }]);

  return Offline;
}(Base);

Offline.propTypes = propTypes;
Offline.defaultProps = defaultProps;

var Detector = exports.Detector = function (_Base3) {
  _inherits(Detector, _Base3);

  function Detector() {
    _classCallCheck(this, Detector);

    return _possibleConstructorReturn(this, (Detector.__proto__ || Object.getPrototypeOf(Detector)).apply(this, arguments));
  }

  _createClass(Detector, [{
    key: "render",
    value: function render() {
      return this.props.render({ online: this.state.online });
    }
  }]);

  return Detector;
}(Base);

Detector.propTypes = Object.assign({}, propTypes, {
  render: _propTypes2.default.func.isRequired
});
Detector.defaultProps = defaultProps;
