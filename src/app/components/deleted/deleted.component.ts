import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmojiData, Emoji } from "src/app/services/requestSender.service";
import {Injectable} from '@angular/core';
import { AppComponent } from "src/app/app.component";

@Injectable()
@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['../components.styles/commonStyles.css']
})
export class DeletedComponent implements OnInit {

  delEmojis: Emoji[] = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.delEmojis = EmojiData.getDelEmojis();
  }

  delEmojiFromDel(emojiName:string) {
    EmojiData.delEmojiFromDel(emojiName);
    var that = this;
    setTimeout(() => {
      AppComponent.rawJSONadd("del",EmojiData.delEmojis);
    }, 1000);
  }

}
