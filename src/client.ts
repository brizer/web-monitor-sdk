import { hub, EventBus } from "./util/hub";
import { logger } from "./util/logger";
import { ClientModel } from "./types/client";

export class Client {
    private isActive = true;
    constructor() {
        this.init()
    }

    private init(): void {
        //listen active status
        hub.on(EventBus.CHANGE_ACTIVE, (activeStatus: boolean) => {
            logger.log(`Client accepted ${EventBus.CHANGE_ACTIVE}: ${activeStatus}`)
            this.isActive = activeStatus
        })

        window.addEventListener('load',()=>{
            if(this.isActive === false){return}
            const clientInfo = this.getClientInfo()
            logger.log(`Client get info: ${JSON.stringify(clientInfo)}`)
            hub.emit(EventBus.GET_CLIENT, clientInfo)
        })
    }
    public getClientInfo():undefined|ClientModel {
        if(!window.navigator) return;
        let clientInfo:ClientModel = {
            ua: window.navigator.userAgent,
            resolution: `${window.screen.width}*${window.screen.height}`,
            screenSize:`${document.documentElement.clientWidth || document.body.clientWidth}*${document.documentElement.clientHeight || document.body.clientHeight}`,
            dpr: window.devicePixelRatio
        }
        return clientInfo
    }
}