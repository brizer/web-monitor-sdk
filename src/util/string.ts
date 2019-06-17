import { isRegExp } from "./is";

/**
 * Checks if the value matches a regex or includes the string
 * @param {string} value The string value to be checked against
 * @param {string|RegExp} pattern Either a regex or a string that must be contained in value
 * 
 * @returns is in list
 */
export const isMatchingPattern = (value: string, pattern: RegExp | string): boolean => {
    if (isRegExp(pattern)) {
        return (pattern as RegExp).test(value);
    }
    if (typeof pattern === 'string') {
        return value.includes(pattern);
    }
    return false;
}