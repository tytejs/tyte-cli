import InputInterface from "./InputInterface";

export default class Input implements InputInterface {
  private _values: Array<any>;

  setValues(values: Array<any>): void {
    this._values = values;
  }

  values(): Array<any> {
    return this._values;
  }
}
