import { getGlobalObject } from './env';

const global = getGlobalObject<Window | NodeJS.Global>();

const PREFIX = 'Web Monitor Logger ';
/**
 * Logger
 */
class Logger {
    private enabled: boolean;

    constructor() {
        this.enabled = false;
    }

    public disable(): void {
        this.enabled = false;
    }

    public enable(): void {
        this.enabled = true;
    }

    public log(...args: any[]): void {
        if (!this.enabled) {
            return;
        }
        global.console.log(`${PREFIX}[Log]: ${args.join(' ')}`);

    }

    public warn(...args: any[]): void {
        if (!this.enabled) {
            return;
        }
        global.console.warn(`${PREFIX}[Warn]: ${args.join(' ')}`);
    };

    public error(...args: any[]): void {
        if (!this.enabled) {
            return;
        }
        global.console.error(`${PREFIX}[Error]: ${args.join(' ')}`);
    }
}

// Ensure we only have a single logger instance
global.__WebMonitor__ = global.__WebMonitor__ || {};
const logger = global.__WebMonitor__.logger || (global.__WebMonitor__.logger = new Logger());
export { logger };
