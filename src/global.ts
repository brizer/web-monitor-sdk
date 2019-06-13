import { hub, EventBus } from "./util/hub";
import { logger } from "./util/logger";

interface ErrorDefo {
    t: number;
    n: string;
    msg: string;
    data: any
}


export class Global {
    private isActive = true;
    private oldErrorHandler: any;
    private errordefo: ErrorDefo = {
        t: 0,
        n: 'js',
        msg: '',
        data: {}
    }
    constructor() {
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

        // window.onerror =this.trackWindowOnError.bind(this)
        window.onerror = this.trackWindowOnError.bind(this)
    }

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

}