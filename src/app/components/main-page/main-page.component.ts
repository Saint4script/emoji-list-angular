import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmojiData, Emoji } from "src/app/services/requestSender.service";
import { Injectable } from '@angular/core';

@Injectable()
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['../components.styles/commonStyles.css']
})
export class MainPageComponent implements OnInit {

  allEmojis: Emoji[] = [
    
  ];
  favEmojis: Emoji[] = [];

  constructor(private http: HttpClient) {
    this.favEmojis = EmojiData.getFavEmojis();
  }

  ngOnInit(): void {
    this.allEmojis = EmojiData.getAllEmojis();
  }

  addEmojiToFav(emojiName:string) {
    EmojiData.addEmojiToFav(emojiName);
  }

  delEmojiFromAll(emojiName:string) {
    EmojiData.delEmojiFromAll(emojiName);
  }

}
