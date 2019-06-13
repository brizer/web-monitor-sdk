import { isRegExp } from "./is";

/**
 * Checks if the value matches a regex or includes the string
 * @param value The string value to be checked against
 * @param pattern Either a regex or a string that must be contained in value
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