export default interface OutputInterface {
  write(first,...rest: Array<any>): void;
  error(first,...rest: Array<any>): void;
}
