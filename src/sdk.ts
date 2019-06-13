import { Options } from "./types/options";
import { logger } from "./util/logger";
import { Global } from "./global";
import { hub, EventBus } from "./util/hub";
import { Page } from "./page";

const defaultOption:Options = {
    debug: false,
    actived: true,
    domain: undefined,
    blacklistUrls: [],
    blacklistAjaxUrls: [],
    outtime: 300,
    sendPage: true,
    sendAjax: true,
    sendResource: true,
    sendError: true,
    sendUnhandledRejection: true,
    sendUnloadError:true
}

let globalIns:Global
let pageIns: Page

export const init = (options: Options) => {
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
}
/**
 * Close sdk, set the active status to false
 */
export const close = () =>{
    logger.log('close sdk')
    hub.emit(EventBus.CHANGE_ACTIVE,false)
}