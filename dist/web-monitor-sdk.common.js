/**
 * Copyright web-monitor-sdk 0.0.2 (eb1a876) | https://github.com/brizer/web-monitor-sdk
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Judge is it node environment
 *
 * @returns {boolean}
 */
var isNodeEnv = function () {
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
};
var fallbackGlobalObject = {};
/**
 * Get global object safely
 *
 * @returns {object}
 */
var getGlobalObject = function () {
    return (isNodeEnv()
        ? global
        : typeof window !== 'undefined'
            ? window
            : typeof self !== 'undefined'
                ? self
                : fallbackGlobalObject);
};

var global$1 = getGlobalObject();
var PREFIX = 'Web Monitor Logger ';
/**
 * Logger
 */
var Logger = /** @class */ (function () {
    function Logger() {
        this.enabled = false;
    }
    Logger.prototype.disable = function () {
        this.enabled = false;
    };
    Logger.prototype.enable = function () {
        this.enabled = true;
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        global$1.console.log(PREFIX + "[Log]: " + args.join(' '));
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        global$1.console.warn(PREFIX + "[Warn]: " + args.join(' '));
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        global$1.console.error(PREFIX + "[Error]: " + args.join(' '));
    };
    return Logger;
}());
// Ensure we only have a single logger instance
global$1.__WebMonitor__ = global$1.__WebMonitor__ || {};
var logger = global$1.__WebMonitor__.logger || (global$1.__WebMonitor__.logger = new Logger());

var hehe = 2;
logger.enable();
logger.error('hehe');

exports.hehe = hehe;
