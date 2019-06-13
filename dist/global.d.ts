interface GlobalOptions {
    sendError: boolean;
    sendUnhandledRejection: boolean;
    sendUnloadError: boolean;
}
export declare class Global {
    private isActive;
    private oldErrorHandler;
    private options;
    private errordefo;
    constructor(options: GlobalOptions);
    private init;
    private installGlobalErrorHandle;
    /**
     * Catch normal no catched error
     * @param msg
     * @param url
     * @param lineNo
     * @param col
     * @param error
     */
    private trackWindowOnError;
    /**
     * Track unhandleRejectionError
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
     * @param err
     */
    private trackUnhandledRejectionError;
    /**
     * Catch img css unload error
     * @param err
     */
    private trackUnloadError;
}
export {};
