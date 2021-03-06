/**
 * Copyright web-monitor-sdk 1.1.0 (7ec2221) | https://github.com/brizer/web-monitor-sdk
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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var global$2 = getGlobalObject();
var EventBus;
(function (EventBus) {
    EventBus["ERROR"] = "ERROR";
    EventBus["CHANGE_ACTIVE"] = "CHANGE_ACTIVE";
    EventBus["CATCH_ERROR"] = "CATEH_ERROR";
    EventBus["GET_PERFORMANCE"] = "GET_PERFORMANCE";
    EventBus["GET_CLIENT"] = "GET_CLIENT";
})(EventBus || (EventBus = {}));
var Hub = /** @class */ (function () {
    function Hub() {
        this.eventLists = [];
    }
    Hub.prototype.emit = function (event, data) {
        (this.eventLists[event] || []).forEach(function (handle) { return handle(data); });
    };
    Hub.prototype.on = function (event, handler) {
        if (!this.eventLists[event]) {
            this.eventLists[event] = [];
        }
        this.eventLists[event].push(handler);
    };
    Hub.prototype.off = function (event, handle) {
        var index = (this.eventLists[event] || []).findIndex(function (h) { return h === handle; });
        if (index > -1) {
            this.eventLists[event].splice(index, 1);
        }
    };
    return Hub;
}());
global$2.__WebMonitor__ = global$2.__WebMonitor__ || {};
var hub = global$2.__WebMonitor__.hub || (global$2.__WebMonitor__.hub = new Hub());

var Global = /** @class */ (function () {
    function Global(options) {
        this.isActive = true;
        this.errordefo = {
            t: 0,
            n: 'js',
            msg: '',
            data: {}
        };
        this.options = __assign({}, options);
        this.init();
    }
    Global.prototype.init = function () {
        var _this = this;
        //listen active status
        hub.on(EventBus.CHANGE_ACTIVE, function (activeStatus) {
            logger.log("Global accepted " + EventBus.CHANGE_ACTIVE + ": " + activeStatus);
            _this.isActive = activeStatus;
        });
        this.installGlobalErrorHandle();
    };
    Global.prototype.installGlobalErrorHandle = function () {
        this.oldErrorHandler = window.onerror;
        if (this.options.sendError === true) {
            window.onerror = this.trackWindowOnError.bind(this);
        }
        if (this.options.sendUnhandledRejection === true) {
            window.addEventListener('unhandledrejection', this.trackUnhandledRejectionError.bind(this));
        }
        if (this.options.sendUnloadError == true) {
            window.addEventListener('error', this.trackUnloadError.bind(this), true);
        }
    };
    /**
     * Catch normal no catched error
     * @param msg
     * @param url
     * @param lineNo
     * @param col
     * @param error
     */
    Global.prototype.trackWindowOnError = function (msg, url, lineNo, col, error) {
        if (this.isActive === false) {
            logger.log("Global get error, but do nothing");
            return;
        }
        logger.log("Global get error");
        var defaults = Object.assign({}, this.errordefo);
        setTimeout(function () {
            col = col || window.event || 0;
            defaults.msg = error && error.stack ? error.stack.toString() : msg;
            defaults.data = {
                resourceUrl: url,
                line: lineNo,
                col: col
            };
            defaults.t = new Date().getTime();
            logger.log("Global track error info: " + JSON.stringify(defaults));
            hub.emit(EventBus.CATCH_ERROR, defaults);
        }, 0);
        //do not overwrite the original exception
        if (this.oldErrorHandler) {
            return this.oldErrorHandler.apply(this, arguments);
        }
    };
    /**
     * Track unhandleRejectionError
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
     * @param err
     */
    Global.prototype.trackUnhandledRejectionError = function (err) {
        if (this.isActive === false) {
            logger.log("Global get error, but do nothing");
            return;
        }
        logger.log("Global get error");
        var error = err && err.reason;
        var message = error.message || '';
        var stack = error.stack || '';
        // Processing error
        var resourceUrl;
        stack.replace(/.?(\S+\.[js|html]+)/g, function ($1, $2) { resourceUrl = $2; return ''; });
        var defaults = Object.assign({}, this.errordefo);
        defaults.msg = message;
        defaults.t = new Date().getTime();
        defaults.data = {
            resourceUrl: resourceUrl,
            stack: stack
        };
        logger.log("Global track error info: " + JSON.stringify(defaults));
        hub.emit(EventBus.CATCH_ERROR, defaults);
    };
    /**
     * Catch img css unload error
     * @param err
     */
    Global.prototype.trackUnloadError = function (err) {
        if (this.isActive === false) {
            logger.log("Global get error, but do nothing");
            return;
        }
        logger.log("Global get error");
        var defaults = Object.assign({}, this.errordefo);
        defaults.n = 'resource';
        defaults.t = new Date().getTime();
        defaults.msg = err.target.localName + ' is load error';
        defaults.data = {
            target: err.target.localName,
            type: err.type,
            resourceUrl: err.target.href || err.target.currentSrc,
        };
        if (err.target !== window) {
            logger.log("Global track error info: " + JSON.stringify(defaults));
            hub.emit(EventBus.CATCH_ERROR, defaults);
        }
    };
    return Global;
}());

var Page = /** @class */ (function () {
    function Page() {
        this.isActive = true;
        this.init();
    }
    Page.prototype.init = function () {
        var _this = this;
        //listen active status
        hub.on(EventBus.CHANGE_ACTIVE, function (activeStatus) {
            logger.log("Page accepted " + EventBus.CHANGE_ACTIVE + ": " + activeStatus);
            _this.isActive = activeStatus;
        });
        window.addEventListener('load', function () {
            if (_this.isActive === false) {
                return;
            }
            var performance = _this.getPagePerformance();
            logger.log("Page get performance: " + JSON.stringify(performance));
            hub.emit(EventBus.GET_PERFORMANCE, performance);
        });
    };
    Page.prototype.getPagePerformance = function () {
        if (!window.performance)
            return;
        if (!window.performance.timing)
            return;
        var timing = window.performance.timing;
        var performance = {
            redirectt: (timing.redirectEnd - timing.redirectStart) / 1000,
            dnst: (timing.domainLookupEnd - timing.domainLookupStart) / 1000,
            tcpt: (timing.connectEnd - timing.connectStart) / 1000,
            wit: (timing.domLoading - timing.fetchStart) / 1000,
            responset: (timing.responseEnd - timing.requestStart) / 1000,
            domreadyt: (timing.responseEnd - timing.navigationStart) / 1000,
            domcompletet: (timing.domComplete - timing.domLoading) / 1000,
            domrendert: (timing.domInteractive - timing.domLoading) / 1000,
            scriptt: (timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart) / 1000
        };
        performance.allt = (performance.redirectt + performance.dnst + performance.tcpt + performance.responset + performance.domcompletet + performance.domrendert).toFixed(3) - 0;
        return performance;
    };
    return Page;
}());

/**
 * Checks whether given value's type is an regexp
 * {@link isRegExp}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
var isRegExp = function (wat) {
    return Object.prototype.toString.call(wat) === '[object RegExp]';
};

/**
 * Checks if the value matches a regex or includes the string
 * @param {string} value The string value to be checked against
 * @param {string|RegExp} pattern Either a regex or a string that must be contained in value
 *
 * @returns is in list
 */
var isMatchingPattern = function (value, pattern) {
    if (isRegExp(pattern)) {
        return pattern.test(value);
    }
    if (typeof pattern === 'string') {
        return value.includes(pattern);
    }
    return false;
};

var Reporter = /** @class */ (function () {
    function Reporter(options) {
        this.isActive = true;
        logger.log('init Reporter');
        this.options = __assign({}, options);
        this.reportData = {
            url: location.href,
            time: new Date().getTime(),
            errorList: [],
            performance: {},
            clientInfo: {}
        };
        this.init();
    }
    /**
     * Judge is the url in blacklist
     *
     * @param url
     */
    Reporter.prototype.isBlacklistUrl = function (url) {
        if (url === void 0) { url = location.href; }
        if (!this.options.blacklistUrls || !this.options.blacklistUrls.length) {
            return false;
        }
        return this.options.blacklistUrls.some(function (pattern) { return isMatchingPattern(url, pattern); });
    };
    Reporter.prototype.init = function () {
        var _this = this;
        hub.on(EventBus.CHANGE_ACTIVE, function (activeStatus) {
            logger.log("Page accepted " + EventBus.CHANGE_ACTIVE + ": " + activeStatus);
            _this.isActive = activeStatus;
        });
        hub.on(EventBus.CATCH_ERROR, this.assembleErrorData.bind(this));
        hub.on(EventBus.GET_PERFORMANCE, this.assemblePerformanceData.bind(this));
        hub.on(EventBus.GET_CLIENT, this.assembleClientData.bind(this));
        setTimeout(this.reportToServer.bind(this), this.options.outtime);
    };
    Reporter.prototype.assembleErrorData = function (errorData) {
        this.reportData.errorList.push(errorData);
    };
    Reporter.prototype.assemblePerformanceData = function (performanceData) {
        this.reportData.performance = performanceData;
    };
    Reporter.prototype.assembleClientData = function (clientData) {
        this.reportData.clientInfo = clientData;
    };
    Reporter.prototype.reportToServer = function () {
        if (!this.isActive) {
            return;
        }
        if (this.isBlacklistUrl()) {
            logger.log('Report now url is in blacklist');
            return;
        }
        if (!this.options.fn) {
            return;
        }
        var response = Object.assign({}, this.reportData, this.options.data);
        logger.log("Report info is " + JSON.stringify(response));
        this.options.fn(response);
    };
    return Reporter;
}());

var Client = /** @class */ (function () {
    function Client() {
        this.isActive = true;
        this.init();
    }
    Client.prototype.init = function () {
        var _this = this;
        //listen active status
        hub.on(EventBus.CHANGE_ACTIVE, function (activeStatus) {
            logger.log("Client accepted " + EventBus.CHANGE_ACTIVE + ": " + activeStatus);
            _this.isActive = activeStatus;
        });
        window.addEventListener('load', function () {
            if (_this.isActive === false) {
                return;
            }
            var clientInfo = _this.getClientInfo();
            logger.log("Client get info: " + JSON.stringify(clientInfo));
            hub.emit(EventBus.GET_CLIENT, clientInfo);
        });
    };
    Client.prototype.getClientInfo = function () {
        if (!window.navigator)
            return;
        var clientInfo = {
            ua: window.navigator.userAgent,
            resolution: window.screen.width + "*" + window.screen.height,
            screenSize: (document.documentElement.clientWidth || document.body.clientWidth) + "*" + (document.documentElement.clientHeight || document.body.clientHeight),
            dpr: window.devicePixelRatio
        };
        return clientInfo;
    };
    return Client;
}());

var defaultOption = {
    debug: false,
    blacklistUrls: [],
    outtime: 1000,
    sendPage: true,
    sendError: true,
    sendUnhandledRejection: true,
    sendUnloadError: true,
    sendClientInfo: true,
    data: undefined
};
var globalIns;
var pageIns;
var reporterIns;
var init = function (options, fn) {
    //merge default options
    options = Object.assign({}, defaultOption, options);
    if (options.debug === true) {
        logger.enable();
    }
    logger.log('start logging...');
    if (options.sendError === true) {
        globalIns = new Global({
            sendError: options.sendError,
            sendUnhandledRejection: options.sendUnhandledRejection,
            sendUnloadError: options.sendUnloadError
        });
    }
    if (options.sendPage === true) {
        pageIns = new Page();
    }
    if (options.sendClientInfo === true) {
        new Client();
    }
    if (fn) {
        reporterIns = new Reporter({
            fn: fn,
            blacklistUrls: options.blacklistUrls,
            outtime: options.outtime,
            data: options.data
        });
    }
};
/**
 * Close sdk, set the active status to false
 */
var close = function () {
    logger.log('close sdk');
    hub.emit(EventBus.CHANGE_ACTIVE, false);
};

exports.close = close;
exports.hub = hub;
exports.init = init;
