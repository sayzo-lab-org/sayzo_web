/**
 * Production-safe logger.
 *
 * - In development  : forwards all calls to the real console.
 * - In production   : only `error` and `warn` are forwarded (operational signals).
 *                     `log` / `debug` are silenced — they must never leak PII or
 *                     internal state to the browser console in a live environment.
 *
 * Usage:
 *   import { logger } from "@/lib/logger";
 *   logger.log("debug info", value);   // silent in production
 *   logger.error("Something broke", err); // always surfaced
 */

const isDev = process.env.NODE_ENV === "development";

export const logger = {
  // Debug / informational — dev only
  log:   (...args) => { if (isDev) console.log(...args);   },
  debug: (...args) => { if (isDev) console.debug(...args); },
  info:  (...args) => { if (isDev) console.info(...args);  },

  // Operational signals — always on (feed these into your error monitoring service)
  warn:  (...args) => console.warn(...args),
  error: (...args) => console.error(...args),
};
