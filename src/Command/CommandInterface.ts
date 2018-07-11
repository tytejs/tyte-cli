import OutputInterface from "../IO/OutputInterface";
import InputInterface from "../IO/InputInterface";
import CommandOptionInterface from "./CommandOptionInterface";
import Command from "./Command";

export default interface CommandInterface {
  options: Array<CommandOptionInterface>;
  cmd: Command;
  configure(): void;
  execute(input: InputInterface, output: OutputInterface): void;
}
