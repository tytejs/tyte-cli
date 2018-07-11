export default interface InputInterface {
  values(): Array<any>;
  setValues(values: Array<any>): void;
}
