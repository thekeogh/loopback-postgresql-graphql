import strip from "strip-ansi";

import { config } from "@core/config.core";

/**
 * Strips all ANSI for non-development logs and prevents console logs
 * completely for test environments.
 * 
 * @param message - message to output
 * @todo - Change this to use pino
 */
export function log(message: string): void {
  if (config.environment.env === "test") {
    return;
  }
  if (config.environment.env !== "development") {
    message = strip(message).trim();
  }
  return console.log(message);
}