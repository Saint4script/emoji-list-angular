import { Component, IterableDiffers } from '@angular/core';
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
  me!:AppComponent;

  
  searchName!:string;
  searchLink!:string;
  searchShow!:boolean
  

  allEmojis: Array<Emoji> = Array();

  constructor(private http: HttpClient) {
    new EmojiData();
    EmojiData.setHTTP(this.http);
    this.allEmojis = EmojiData.initAllEmojis();
    this.me = this;
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

  static rawJSONadd(name:string, emojiArray: Emoji[]) {  //закидываем массив в cookie
    let str = JSON.stringify(emojiArray);
    document.cookie = name+"="+str;
  }

}


