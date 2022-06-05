import { Component, OnInit } from '@angular/core';
import {WordsService} from "../../services/words.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  attempts: number[] = []
  lettersIndex: number[] = []
  isLoading: boolean = true

  constructor(private wordsService: WordsService) { }

  ngOnInit(): void {
    this.isLoading = true

    for (let i = 0; i < 6; i++) {
      this.attempts.push(i)
    }
    this.wordsService.length.subscribe(length => {
      for (let i = 0; i < length.length; i++) {
        this.lettersIndex.push(i)
      }
      this.isLoading = false
    })
  }

  get isWinner() {
    return this.wordsService.win
  }
}
