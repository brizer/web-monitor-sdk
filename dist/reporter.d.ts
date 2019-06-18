interface ReporterOptions {
    fn?: Function;
    blacklistUrls?: Array<string | RegExp>;
    outtime: number;
    data: object;
}
export declare class Reporter {
    private isActive;
    private options;
    private reportData;
    constructor(options: ReporterOptions);
    /**
     * Judge is the url in blacklist
     *
     * @param url
     */
    isBlacklistUrl(url?: string): boolean;
    private init;
    private assembleErrorData;
    private assemblePerformanceData;
    private assembleClientData;
    private reportToServer;
}
export {};
