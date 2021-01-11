import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmojiData, Emoji } from "src/app/services/requestSender.service";
import { Injectable } from '@angular/core';
import { AppComponent } from "src/app/app.component";

@Injectable()
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css',
              '../components.styles/commonStyles.css']
})
export class FavouriteComponent implements OnInit {

  favEmojis: Emoji[] = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.favEmojis = EmojiData.getFavEmojis();
  }

  delEmojiFromFav(emojiName:string) {
    EmojiData.delEmojiFromFav(emojiName);
    var that = this;
    setTimeout(() => {
      AppComponent.rawJSONadd("fav",EmojiData.favEmojis);
    }, 1000);
  }

}
