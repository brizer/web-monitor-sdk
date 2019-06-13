interface WebMonitorGlobal {
    __WebMonitor__: {
        globalEventProcessors?: any;
        logger?: any;
    };
} 


/**
 * Judge is it node environment
 * 
 * @returns {boolean}
 */
export const isNodeEnv = (): boolean => {
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}

const fallbackGlobalObject = {}

/**
 * Get global object safely
 * 
 * @returns {object}
 */
export const getGlobalObject = <T>(): T & WebMonitorGlobal => {
    return (isNodeEnv()
        ? global
        : typeof window !== 'undefined'
            ? window
            : typeof self !== 'undefined'
                ? self
                : fallbackGlobalObject) as T & WebMonitorGlobal;
}

