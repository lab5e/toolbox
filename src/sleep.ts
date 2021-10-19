/**
 * Utility sleep for waiting a given amount of milliseconds. Returns a Promise
 *
 * @param ms Number of milliseconds to sleep
 * @returns A promise that is resolved after given number of milliseconds
 */
export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
