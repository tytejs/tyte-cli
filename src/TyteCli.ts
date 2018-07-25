import CommandInterface from './Command/CommandInterface'
import Output from './IO/Output'
import * as commander from 'commander'
import Options from './Command/Option'
import Input from './IO/Input'

class HelpCommand extends CommandInterface {
  readonly name = 'help'
  readonly description = 'Display help for a command'
  _options: Array<Options> = []

  set options(options) {
    this._options = options
  }
  get options(): Array<Options> {
    return this._options
  }
  execute(input: object, output: Output): Promise<any> {
    output.write('help [command]')
    return Promise.resolve(true)
  }
}

/**
 * The TyteCli class is a higer level abstraction on top of commanderjs.
 * 
 */

export default class TyteCli {
  private version: string = '1.0.0'
  /**
   * The commands from which TyteCli will look for a particular command 
   * specified on the command-line. 
   */
  private commands: Array<CommandInterface> = new Array<CommandInterface>()
  private input: Input
  private output: Output

  constructor(output = new Output()) {
    this.input = { args: [], options: {} }
    this.output = output
    commander
      .version(this.version, '-v, --version')
      .description('Tyte framework cli component')
      .usage('[options] [arguments]')
    this.commands.push(new HelpCommand())
  }

  /**
   * registers a command to the list of runnable commands. TyteCli 
   * will pick the command that matches the name specified on 
   * command line
   * 
   * @param command the command 
   */
  public addCommand(command: CommandInterface): void {
    if(this.commands.some(_command => _command.name === command.name)){
      throw new Error(`Tyte-Cli cannot add command: ${command.constructor.name}. A command with the name: ${command.name} already exists`);
    }else{
      this.commands.push(command)
    }
  }

  /**
   * Runs TtyeCli. This will cause tyte-cli to look into the 
   * previously registered commands and run the command that 
   * matches the one provided on the command line
   */
  public run(): void {
    this.commands.forEach(cmd => {
      let _command: commander.Command = commander
        .command(cmd.name)
        .description(cmd.description)

      cmd.options.forEach(flag => {
        _command.option(
          flag.name + (flag.required ? ' <value>' : ' [value]'),
          flag.description || '',
          flag.defaultValue
        )
      })

      let _this = this
      _command.action(function() {
        let args: Array<string> = Array.prototype.slice.call(arguments, 0, -1) //deep copy, ignore  last entry
        _this.input = {
          args: args,
          options: _command
        }
        cmd.execute(_this.input, _this.output).then(res => {
          //done, //TODO cleanup code
        })
      })
    })
    commander.parse(process.argv)
    if (!process.argv.slice(2).length) {
      commander.outputHelp()
    }
  }
}
