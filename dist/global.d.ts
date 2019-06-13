interface GlobalOptions {
    sendError: boolean;
    sendUnhandledRejection: boolean;
}
export declare class Global {
    private isActive;
    private oldErrorHandler;
    private options;
    private errordefo;
    constructor(options: GlobalOptions);
    private init;
    private installGlobalErrorHandle;
    private trackWindowOnError;
    /**
     * Track unhandleRejectionError
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
     * @param err
     */
    private trackUnhandledRejectionError;
}
export {};
