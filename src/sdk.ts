import { Options } from "./types/options";
import { logger } from "./util/logger";
import { Global } from "./global";
import { hub, EventBus } from "./util/hub";

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
    sendError: true
}

let globalIns:Global

export const init = (options: Options) => {
    //merge default options
    options = Object.assign({},defaultOption,options)
    if(options.debug === true){
        logger.enable()
    }
    logger.log('start logging...')
    if(options.sendError === true){
        globalIns = new Global()
    }
}
/**
 * Close sdk, set the active status to false
 */
export const close = () =>{
    logger.log('close sdk')
    hub.emit(EventBus.CHANGE_ACTIVE,false)
}