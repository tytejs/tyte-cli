import Output from '../IO/Output'
import Options from './Option'
import Input from '../IO/Input'

/**
 * This represents a unit of command that's executable
 * by TyteCli.
 */
export default abstract class CommandInterface {
  /**
   * The name of the command. It's important to note that command names
   * are case-sensitive so 'build' is not the same as Build or BUId.
   *
   * When tyteCli runs, it searches the command line and runs the command
   * whose name matches the one specified on the command line
   */
  abstract name: string

  /**
   * description of the command
   */
  description: string = ''
  /**
   * This represents all options this flag can handle. A command cannot
   * process a flag it hasn's specified here.
   */
  options: Array<Options> = []

  /**
   * This is where all command logic must be declared.
   * The command will be handed two important objects.
   *
   * @param input represent the input data, look at the {@link Input}
   * interface for more information
   *
   * @param output the ouput, the command will interact with the user
   * throght the output interface. see here {@link Output}
   * 
   * @returns promise that resolves when this command completes
   */
  abstract execute(input: Input, output: Output): Promise<any>
}
