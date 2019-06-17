export interface Options {
    /**
     * Enable debug funtionality in the SDK.
     * Defaults to false.
     */
    debug?: boolean;
    /**
     * A pattern for URLs which should not be report.
     * By default, all urls will be sent.
     */
    blacklistUrls?: Array<string | RegExp>;
    /**
     * Delay time to report, ensure the loading of asynchronous data.
     * The unit is milliseconds
     * Defaults to 1000.
     */
    outtime?: number;
    /**
     * Whether to report page performance data.
     * Defaults to true.
     */
    sendPage?: boolean;
    /**
     * Whether to report error .
     * Defaults to true.
     */
    sendError?: boolean;
    /**
     * Whether to report unhandledrejection error in promise in Chrome 49+.
     * Defaults to true.
     */
    sendUnhandledRejection?: boolean;
    /**
     * Whether to report unload error.
     * Defaults to true.
     */
    sendUnloadError?: boolean;
    /**
     * Additional data, to send to server together
     *
     * Default is undefined
     */
    data?: object;
}
