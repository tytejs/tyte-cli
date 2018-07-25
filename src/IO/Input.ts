/**
 * Contains all command-line arguments and flags passed on the command-line
 *
 * <code> eg: tyte-cli command --flag=8 --port 8888 arg1 arg2</code> will produce
 * {args:[arg1,arg2],options:{flag:8,port:8888}}
 */
export default interface Input {
  /**
   * an array of all arguments excluding flags passed on the command-line
   */
  args: Array<string>
  /**
   * a key value pair of flags and thier values
   */
  options: object
}
