
/**
 * Checks whether given value's type is an regexp
 * {@link isRegExp}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
export const isRegExp = (wat: any): boolean => {
    return Object.prototype.toString.call(wat) === '[object RegExp]';
}
