import OutputInterface from "./OutputInterface";
import * as Console from "console";

export default class Output implements OutputInterface {
  write(first, ...rest: Array<any>): void {
    Console.log(first, ...rest);
  }
  error(first, ...rest: Array<any>): void {
    Console.error(first, ...rest);
  }
}
