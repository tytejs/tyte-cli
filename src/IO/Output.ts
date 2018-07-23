import * as Console from 'console'

/**
 * Output is our abstraction of how commands
 * will interact with the user. Commands can use output
 * to write a message to the screen, draw an image, start a dialog
 * flow, and many more.
 */
export default class Output {
  /**
   * Writes a message on to the screen
   *
   * @param message the message to be written on the screen
   */
  write(...messages: Array<any>): void {
    Console.log(...messages)
  }

  /**
   * Writes an error message on to the screen
   *
   * @param error the error message, can be more than one
   */
  error(...error: Array<any>): void {
    Console.error(...error)
  }
}
