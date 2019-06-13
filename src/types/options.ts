export interface Options {
    /**
     * Enable debug funtionality in the SDK.
     * Defaults to false.
     */
    debug?: boolean;

    /**
     * Specifies whether this SDK should activate.
     * Defaults to true.
     */
    actived?: boolean;

    /**
     * Which API interface, used to report.
     * If ommited, the SDK will not send any data.
     */
    domain?: string;

    /**
     * A pattern for URLs which should not be report.
     * By default, all urls will be sent.
     */
    blacklistUrls?: Array<string | RegExp>


    /**
     * A pattern for Ajax URLs which should not be report.
     * By default, all Ajax will be sent.
     */
    blacklistAjaxUrls?: Array<string | RegExp>

    /**
     * Delay time to report, ensure the loading of asynchronous data.
     * The unit is milliseconds
     * Defaults to 300.
     */
    outtime?: number,

    /**
     * Whether to report page performance data.
     * Defaults to true.
     */
    sendPage?: boolean;

    /**
     * Whether to report resource loading performance data.
     * Defaults to true.
     */
    sendResource?: boolean;

    /**
     * Whether to report error .
     * Defaults to true.
     */
    sendError?: boolean;
    /**
     * Whether to report unhandledrejection error in promise in Chrome 49+.
     * Defaults to true.
     */
    sendUnhandledRejection?:boolean;
    
    /**
     * Whether to report unload error.
     * Defaults to true.
     */
    sendUnloadError?:boolean;

    /**
     * Whether to report ajax performance data.
     * Defaults to true.
     */
    sendAjax?: boolean;
}
