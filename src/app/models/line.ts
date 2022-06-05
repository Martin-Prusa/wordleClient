import {LetterStatus} from "./letter-status";

export class Line {
  disabled: boolean = false
  badWord: boolean = false
  values = Array<string>(5)
  classes = Array<LetterStatus>(5)


  constructor() {
    this.values.fill('')
  }
}
