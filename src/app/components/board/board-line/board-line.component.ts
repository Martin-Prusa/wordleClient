import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {WordsService} from "../../../services/words.service";
import {LetterStatus} from "../../../models/letter-status";

@Component({
  selector: 'app-board-line',
  templateUrl: './board-line.component.html',
  styleUrls: ['./board-line.component.scss']
})
export class BoardLineComponent implements OnInit {

  @Input()
  lettersIndex!: number[]

  @Input()
  index!: number

  @ViewChildren('inputElement')
  inputElements!: QueryList<ElementRef>

  constructor(private wordsService: WordsService) {}

  ngOnInit(): void {}

  next(index: number, $event: KeyboardEvent) {
    if($event.key === 'Backspace') {
      if(index - 1 >= 0) {
        this.inputElements.get(index - 1)!.nativeElement.focus()
        this.wordsService.lines[this.index].values[index - 1] = ''
      }
      return;
    }
    if(index + 1 >= this.inputElements.length) {
      if(!(this.wordsService.lines[this.index].values.includes('') || this.wordsService.lines[this.index].values.includes(' '))) {
        this.wordsService.wordStatus(this.wordsService.lines[this.index].values.join(''), this.index)
      }
      return;
    }
    this.inputElements.get(index + 1)!.nativeElement.focus()
  }

  get values() {
    return this.wordsService.lines[this.index].values
  }

  get classes() {
    return this.wordsService.lines[this.index].classes
  }

  get badWord() {
    return this.wordsService.lines[this.index].badWord
  }

  get disabled() {
    return this.wordsService.lines[this.index].disabled
  }
}
