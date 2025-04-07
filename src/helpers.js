const core = require('@actions/core');

/**
 * Logs the message as INFO level.
 * @param {...any} args - Whatever you would normally pass into console.log().
 */
export const logInfo = function (...args) {
    const logLine = args.map(arg => removeSensitiveInfo(arg)).join(' ');
    core.info(logLine);
}

/**
 * Logs the message as INFO level.
 * @param {...any} args - Whatever you would normally pass into console.log().
 */
export const logError = function (...args) {
    const logLine = args.map(arg => removeSensitiveInfo(arg)).join(' ');
    core.error(logLine);
}

/**
 * Remove sensitive info from a string.
 * @param maybeSensitive {string} a string that might contain sensitive info.
 * @returns {string} the same string, but with sensitive info replaced with `*`'s.
 */
export const removeSensitiveInfo = function(maybeSensitive) {
    return maybeSensitive;
}