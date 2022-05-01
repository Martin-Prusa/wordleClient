import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {WordsService} from "../../../services/words.service";
import {LetterStatus} from "../../../models/letter-status";

@Component({
  selector: 'app-board-line',
  templateUrl: './board-line.component.html',
  styleUrls: ['./board-line.component.scss']
})
export class BoardLineComponent implements OnInit {

  disabled: boolean = false
  badWord: boolean = false

  @Input()
  lettersIndex!: number[]

  @Output()
  win: EventEmitter<any> = new EventEmitter()

  @ViewChildren('inputElement')
  inputElements!: QueryList<ElementRef>

  values = Array<string>(5)
  classes = Array<LetterStatus>(5)

  constructor(private wordsService: WordsService) {
    this.values.fill('')
  }

  ngOnInit(): void {

  }

  next(index: number, $event: KeyboardEvent) {
    if($event.key === 'Backspace') {
      if(index - 1 >= 0) {
        this.inputElements.get(index - 1)!.nativeElement.focus()
        this.values[index - 1] = ''
      }
      return;
    }
    if(index + 1 >= this.inputElements.length) {
      if(!(this.values.includes('') || this.values.includes(' '))) {
        this.wordsService.getWordStatus(this.values.join('')).subscribe(wordStatus => {
          if(!wordStatus.validWord) this.classes.fill(LetterStatus.None)
          else this.classes = wordStatus.letterStatuses
          this.disabled = true
          this.badWord = !wordStatus.validWord
          if(wordStatus.winnerWord) this.win.emit()
        })
      }
      return;
    }
    this.inputElements.get(index + 1)!.nativeElement.focus()
  }
}
