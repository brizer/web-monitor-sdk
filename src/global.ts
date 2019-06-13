import { hub, EventBus } from "./util/hub";
import { logger } from "./util/logger";

interface ErrorDefo {
    t: number;
    n: string;
    msg: string;
    data: any
}

interface GlobalOptions {
    sendError: boolean;
    sendUnhandledRejection: boolean;
    sendUnloadError: boolean;
}


export class Global {
    private isActive = true;
    private oldErrorHandler: any;
    private options: GlobalOptions;
    private errordefo: ErrorDefo = {
        t: 0,
        n: 'js',
        msg: '',
        data: {}
    }
    constructor(options: GlobalOptions) {
        this.options = {
            ...options
        }
        this.init()
    }

    private init(): void {
        //listen active status
        hub.on(EventBus.CHANGE_ACTIVE, (activeStatus: boolean) => {
            logger.log(`Global accepted ${EventBus.CHANGE_ACTIVE}: ${activeStatus}`)
            this.isActive = activeStatus
        })
        this.installGlobalErrorHandle()
    }

    private installGlobalErrorHandle(): void {
        this.oldErrorHandler = window.onerror;
        if (this.options.sendError === true) {
            window.onerror = this.trackWindowOnError.bind(this)
        }
        if (this.options.sendUnhandledRejection === true) {
            window.addEventListener('unhandledrejection', this.trackUnhandledRejectionError.bind(this))
        }
        if(this.options.sendUnloadError == true){
            window.addEventListener('error', this.trackUnloadError.bind(this), true)
        }
    }

    /**
     * Catch normal no catched error
     * @param msg 
     * @param url 
     * @param lineNo 
     * @param col 
     * @param error 
     */
    private trackWindowOnError(msg: any, url: any, lineNo: any, col: any, error: any) {
        if (this.isActive === false) {
            logger.log(`Global get error, but do nothing`)
            return;
        }
        logger.log(`Global get error`)

        let defaults = Object.assign({}, this.errordefo);
        setTimeout(function () {
            col = col || window.event || 0;
            defaults.msg = error && error.stack ? error.stack.toString() : msg
            defaults.data = {
                resourceUrl: url,
                line: lineNo,
                col: col
            };
            defaults.t = new Date().getTime();
            logger.log(`Global track error info: ${JSON.stringify(defaults)}`)
            hub.emit(EventBus.CATCH_ERROR, defaults)
        }, 0);
        //do not overwrite the original exception
        if (this.oldErrorHandler) {
            return this.oldErrorHandler.apply(this, arguments)
        }
    }
    /**
     * Track unhandleRejectionError
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
     * @param err 
     */
    private trackUnhandledRejectionError(err: PromiseRejectionEvent) {
        if (this.isActive === false) {
            logger.log(`Global get error, but do nothing`)
            return;
        }
        logger.log(`Global get error`)

        const error = err && err.reason
        const message = error.message || '';
        const stack = error.stack || '';
        // Processing error
        let resourceUrl: string;
        stack.replace(/.?(\S+\.[js|html]+)/g, ($1, $2) => { resourceUrl = $2; return ''; })
        let defaults = Object.assign({}, this.errordefo);
        defaults.msg = message;
        defaults.t = new Date().getTime();
        defaults.data = {
            resourceUrl: resourceUrl,
            stack: stack
        };
        logger.log(`Global track error info: ${JSON.stringify(defaults)}`)

        hub.emit(EventBus.CATCH_ERROR, defaults)
    }

    /**
     * Catch img css unload error
     * @param err 
     */
    private trackUnloadError(err: any) {
        if (this.isActive === false) {
            logger.log(`Global get error, but do nothing`)
            return;
        }
        logger.log(`Global get error`)
        
        let defaults = Object.assign({}, this.errordefo);
        defaults.n = 'resource'
        defaults.t = new Date().getTime();
        defaults.msg = err.target.localName + ' is load error';
        defaults.data = {
            target: err.target.localName,
            type: err.type,
            resourceUrl: err.target.href || err.target.currentSrc,
        };
        if (err.target !== window) {
            logger.log(`Global track error info: ${JSON.stringify(defaults)}`)
            hub.emit(EventBus.CATCH_ERROR, defaults)
        }
    }

}