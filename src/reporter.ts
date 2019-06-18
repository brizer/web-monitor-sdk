import { hub, EventBus } from "./util/hub";
import { logger } from "./util/logger";
import { ErrorDefo } from "./types/error";
import { PerformanceModel } from "./types/performance";
import { isMatchingPattern } from "./util/string";
import { ClientModel } from "./types/client";

interface ReporterOptions {
    fn?: Function;
    blacklistUrls?: Array<string | RegExp>;
    outtime: number;
    data: object;
}

interface reportModel {
    errorList: Array<ErrorDefo>,
    performance: PerformanceModel | {},
    clientInfo: ClientModel | {},
    url: string,
    time: number
}

export class Reporter {
    private isActive = true;
    private options: ReporterOptions;
    private reportData : reportModel;
    constructor(options: ReporterOptions) {
        logger.log('init Reporter')
        this.options = {
            ...options
        }
        this.reportData = {
            url:location.href,
            time:new Date().getTime(),
            errorList : [],
            performance : {},
            clientInfo: {}
        }
        this.init()
    }

    /**
     * Judge is the url in blacklist
     * 
     * @param url 
     */
    public isBlacklistUrl(url: string = location.href): boolean {
        if (!this.options.blacklistUrls || !this.options.blacklistUrls.length) {
            return false;
        }
        return this.options.blacklistUrls.some(pattern => isMatchingPattern(url, pattern))
    }

    private init(): void {
        hub.on(EventBus.CHANGE_ACTIVE, (activeStatus: boolean) => {
            logger.log(`Page accepted ${EventBus.CHANGE_ACTIVE}: ${activeStatus}`)
            this.isActive = activeStatus
        })
        hub.on(EventBus.CATCH_ERROR, this.assembleErrorData.bind(this))
        hub.on(EventBus.GET_PERFORMANCE, this.assemblePerformanceData.bind(this))
        hub.on(EventBus.GET_CLIENT, this.assembleClientData.bind(this))

        setTimeout(this.reportToServer.bind(this), this.options.outtime)
    }

    private assembleErrorData(errorData: ErrorDefo): void {
        this.reportData.errorList.push(errorData)
    }
    private assemblePerformanceData(performanceData: PerformanceModel): void {
        this.reportData.performance = performanceData;
    }

    private assembleClientData(clientData: ClientModel):void {
        this.reportData.clientInfo = clientData;
    }

    private reportToServer(): void {
        if (!this.isActive) { return }
        if (this.isBlacklistUrl()) {
            logger.log('Report now url is in blacklist')
            return
        }

        if (!this.options.fn) {
            return;
        }
        let response = Object.assign({}, this.reportData, this.options.data)
        logger.log(`Report info is ${JSON.stringify(response)}`)
        this.options.fn(response)
    }

}