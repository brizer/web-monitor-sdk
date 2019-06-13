import { getGlobalObject } from './env';

const global = getGlobalObject<Window | NodeJS.Global>();

export enum EventBus {
    ERROR= 'ERROR'
}


class Hub {
    private eventLists: string[]
    constructor(){
        this.eventLists = []
    }

    public emit(event:EventBus,data:object|Function):void {
        (this.eventLists[event]||[]).forEach(handle=>handle(data))
    }

    public on(event:EventBus,handler:Function):void{
        if(!this.eventLists[event]){
            this.eventLists[event] = []
        }
        this.eventLists[event].push(handler)
    }

    public off(event:EventBus,handle:Function):void {
        const index = (this.eventLists[event]||[]).findIndex(h=>h===handle)
        if(index>-1){
            this.eventLists[event].splice(index,1)
        }
    }

}

global.__WebMonitor__ = global.__WebMonitor__ || {};
const hub = global.__WebMonitor__.hub || (global.__WebMonitor__.hub = new Hub());
export { hub };

