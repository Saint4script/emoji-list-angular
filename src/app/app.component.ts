import { Component } from '@angular/core';
import { EmojiData, Emoji } from "src/app/services/requestSender.service";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ALL';
  input!:string;

  
  searchName!:string;
  searchLink!:string;
  searchShow!:boolean
  

  allEmojis: Emoji[] = [];

  constructor(private http: HttpClient) {
    EmojiData.setHTTP(this.http);
    this.allEmojis = EmojiData.initAllEmojis();
  }

  // меняет поле title, которое используется для заполнения заголовка
  setURL(addr:string) {
    switch(addr) {
      case 'all': {
        this.title = 'ALL';
        break;
      }
      case 'fav': {
        this.title = 'FAVOURITE';
        break;
      }
      case 'del': {
        this.title = 'DELETED';
        break;
      }
    }
  }

  search(event:any) {
    let searcher = document.getElementById("searcher");
    let elem = event.target.value;
    for(let i = 0; i < this.allEmojis.length; i++) {
      if(this.allEmojis[i].name == elem) {
        this.searchName = this.allEmojis[i].name;
        this.searchLink = this.allEmojis[i].link;
        this.searchShow = true;
        break;
      } else {
        this.searchShow = false;
      }
    }
    if(elem == '') {
      this.searchShow = false;
    }
  }

  addEmojiToFav(emojiName:string) {
    EmojiData.addEmojiToFav(emojiName);
  }

  delEmojiFromAll(emojiName:string) {
    EmojiData.delEmojiFromAll(emojiName);
  }

}


