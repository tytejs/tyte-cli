import CommandInterface from './Command/CommandInterface'
import InputInterface from './IO/InputInterface'
import OutputInterface from './IO/OutputInterface'
import Input from './IO/Input'
import Output from './IO/Output'
import * as commander from 'commander'
import * as process from 'process'
import * as color from 'colors' //use later for coloured output
import CommandOptionInterface from './Command/CommandOptionInterface'

class HelpCommand extends CommandInterface {
  readonly name = 'help'
  readonly description = 'Display help for a command'
  _options: Array<CommandOptionInterface>
  set options(options) {
    this._options = options
  }
  get options(): Array<CommandOptionInterface> {
    return [
      {
        option: 'command',
        description: 'The command'
      }
    ]
  }
  execute(input: InputInterface, output: OutputInterface): void {
    output.write('help [command]')
  }
}
export default class TyteCli {
  private version: string = '1.0.0'
  private commands: Array<CommandInterface> = new Array<CommandInterface>()
  private input: InputInterface
  private output: OutputInterface

  constructor(
    input: InputInterface = new Input(),
    output: OutputInterface = new Output()
  ) {
    this.input = input
    this.output = output
    commander
      .version(this.version, '-v, --version')
      .description('Tyte framework cli component')
      .usage('[options] [arguments]')
    this.commands.push(new HelpCommand())
  }

  addCommand(command: CommandInterface): void {
    this.commands.push(command)
  }

  run(): void {
    this.commands.forEach(cmd => {
      let _command: commander.Command
      _command = commander.command(cmd.name).description(cmd.description)
      cmd.options.forEach(option => {
        _command.option(option.option, option.description)
      })
      let _this = this
      _command.action(function() {
        let args = Array.from(arguments).slice() //deep copy args
        args.pop()
        _this.input.setValues(args)
        cmd.execute(_this.input, _this.output)
      })
    })
    commander.parse(process.argv)
    if (!process.argv.slice(2).length) {
      commander.outputHelp()
    }
  }
}
