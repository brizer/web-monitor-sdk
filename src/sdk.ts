import { Options } from "./types/options";
import { logger } from "./util/logger";
import { Global } from "./global";
import { hub, EventBus } from "./util/hub";
import { Page } from "./page";
import { Reporter } from "./reporter";

const defaultOption:Options = {
    debug: false,
    blacklistUrls: [],
    outtime: 1000,
    sendPage: true,
    sendError: true,
    sendUnhandledRejection: true,
    sendUnloadError:true,
    data:undefined
}

let globalIns:Global
let pageIns: Page
let reporterIns: Reporter

export const init = (options: Options, fn: Function) => {
    //merge default options
    options = Object.assign({},defaultOption,options)
    if(options.debug === true){
        logger.enable()
    }
    logger.log('start logging...')
    if(options.sendError === true){
        globalIns = new Global({
            sendError:options.sendError,
            sendUnhandledRejection:options.sendUnhandledRejection,
            sendUnloadError:options.sendUnloadError
        })
    }
    if(options.sendPage === true){
        pageIns = new Page()
    }
    if(fn){
        reporterIns = new Reporter({
            fn,
            blacklistUrls:options.blacklistUrls,
            outtime:options.outtime,
            data:options.data
        })
    }

}
/**
 * Close sdk, set the active status to false
 */
export const close = () =>{
    logger.log('close sdk')
    hub.emit(EventBus.CHANGE_ACTIVE,false)
}