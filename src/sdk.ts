import { Options } from "./types/options";
import { logger } from "./util/logger";

const defaultOption:Options = {
    debug: false,
    actived: true,
    domain: undefined,
    blacklistUrls: [],
    blacklistAjaxUrls: [],
    outtime: 300,
    sendPage: true,
    sendAjax: true,
    sendResource: true
}


export const init = (options: Options) => {
    //merge default options
    options = Object.assign({},defaultOption,options)
    if(options.debug === true){
        logger.enable()
    }
    logger.log('start logging...')

}