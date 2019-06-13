export interface PerformanceModel {
    /**
     * dns time
     */
    dnst: number,
    /**
     * tcp time
     */
    tcpt: number,
    /**
     * white time
     */
    wit: number,
    /**
     * dom ready time
     */
    domreadyt: number,
    /**
     * dom complete load time
     */
    domcompletet: number,
    /**
     * dom complete render time
     */
    domrendert: number
    /**
     * redirect time
     */
    redirectt: number,
    /**
     * response time
     */
    responset: number,
    /**
     * script load time
     */
    scriptt: number,
    /**
     * all time
     */
    allt?: number
}