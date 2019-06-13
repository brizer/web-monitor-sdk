interface WebMonitorGlobal {
    __WebMonitor__: {
        logger?: any;
    };
}
/**
 * Judge is it node environment
 *
 * @returns {boolean}
 */
export declare const isNodeEnv: () => boolean;
/**
 * Get global object safely
 *
 * @returns {object}
 */
export declare const getGlobalObject: <T>() => T & WebMonitorGlobal;
export {};
