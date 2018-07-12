import CommandInterface from "./Command/CommandInterface";
import InputInterface from "./IO/InputInterface";
import OutputInterface from "./IO/OutputInterface";
import Input from "./IO/Input";
import Output from "./IO/Output";
import * as commander from "commander";
import * as process from "process";
import CommandOptionInterface from "./Command/CommandOptionInterface";

class HelpCommand extends CommandInterface {
  readonly name = "help";
  readonly description = "Display help for a command";
  options: Array<CommandOptionInterface> = [];

  constructor(){
    super();
    this.options.push({
      option: "command",
      description: "The command"
    });
  }

  execute(input: InputInterface, output: OutputInterface): void {
    output.write("help [command]");
  }
}

export default class TyteCli {
  private _version: string = "1.0.0";
  private _versionCmd: string = "-v, --version";
  private commands: Array<CommandInterface> = new Array<CommandInterface>();
  private input: InputInterface;
  private output: OutputInterface;
  private appCommand: commander.CommanderStatic;
  private _description: string = "Tyte framework cli component";
  private _usage: string = "[options] [arguments]";
  private _helpCmd: CommandInterface = new HelpCommand();

  constructor(
    input: InputInterface = new Input(),
    output: OutputInterface = new Output()
  ) {
    this.input = input;
    this.output = output;
    this.appCommand = commander;
  }

  set version(version: string) {
    this._version = version;
  }

  get version(): string {
    return this._version;
  }
  set versionCmd(versionCmd: string) {
    this._versionCmd = versionCmd;
  }

  get versionCmd(): string {
    return this._versionCmd;
  }

  set description(description: string) {
    this._description = description;
  }

  get description(): string {
    return this._description;
  }

  set usage(usage: string) {
    this._usage = usage;
  }

  get usage(): string {
    return this._usage;
  }

  addCommand(command: CommandInterface): void {
    this.commands.push(command);
  }

  private setUp(): void {
    this.appCommand
      .version(this.version, this._versionCmd)
      .description(this.description)
      .usage(this._usage);
  }

  set helpCommand(command: CommandInterface) {
    this._helpCmd = command;
  }
  
  run(): void {
    //run the app config setup
    this.setUp();

    this.commands.forEach(cmd => {
      let _command: commander.Command;
      _command = commander.command(cmd.name).description(cmd.description);
      cmd.options.forEach(option => {
        _command.option(option.option, option.description);
      });
      let _this = this;
      _command.action(function() {
        let args = Array.from(arguments).slice(); //deep copy args
        args.pop();
        _this.input.setValues(args);
        cmd.execute(_this.input, _this.output);
      });
    });
    commander.parse(process.argv);
    if (!process.argv.slice(2).length) {
      commander.outputHelp();
    }
  }
}
