import {LetterStatus} from "./letter-status";

export class WordStatus {
  readonly winnerWord: boolean = false
  readonly validWord: boolean = false
  readonly letterStatuses: LetterStatus[] = []
}
