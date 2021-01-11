import {HttpClient} from '@angular/common/http';


export class EmojiData {

  static allEmojis: Emoji[] = [];
  static favEmojis: Emoji[] = [];
  static delEmojis: Emoji[] = [];

  static http: HttpClient;

  constructor(){}

  static setHTTP(http: HttpClient){
    EmojiData.http = http;
  }

  static getRawEmoji() {
    return EmojiData.http.get("https://api.github.com/emojis");
  }

  static getAllEmojis():Emoji[] {
    return this.allEmojis;
  }
  
  static initAllEmojis():Emoji[] {
    this.getRawEmoji().subscribe( 
      result => {
        let emojiStr = JSON.stringify(result);// Obj to str
        let emojiJSON = JSON.parse(emojiStr);// str to JSON obj
        console.log(emojiJSON)
        for (let key in emojiJSON) {
          let url = emojiJSON[key];
          let currentEmoji = new Emoji(key, url);
          EmojiData.allEmojis.push(currentEmoji);
        }
      },
      error => {
      // error - объект ошибки
      console.log(error);
    } )
    return EmojiData.allEmojis
  }

  static getFavEmojis():Emoji[] {
    return EmojiData.favEmojis;
  }

  static getDelEmojis():Emoji[] {
    return EmojiData.delEmojis;
  }

  static delEmojiFromAll(name:string) {
    for(let i = 0; i < this.allEmojis.length; i++){
      if (this.allEmojis[i].name == name) {
        let deleted = this.allEmojis[i];
        this.allEmojis.splice(i, 1)
        if(deleted != undefined) {
          let inDeleted = false;
          for(let j = 0; j < this.delEmojis.length; j++) {
            if(this.delEmojis[j].name == deleted.name) {
              inDeleted = true;
              break;
            }
          }
          if(!inDeleted) {
            this.delEmojis.push(deleted);
          }
        }
        break;
      }
    }
    for(let i = 0; i < this.favEmojis.length; i++){
      if (this.favEmojis[i].name == name) {
        let deleted = this.favEmojis[i];
        this.favEmojis.splice(i, 1);
      }
    }
  }

  static delEmojiFromFav(name:string) {
    for(let i = 0; i < this.favEmojis.length; i++){
      if (this.favEmojis[i].name == name) {
        let deleted = this.favEmojis[i];
        this.favEmojis.splice(i, 1);

        for(let i = 0; i < this.allEmojis.length; i++){
          if (this.allEmojis[i].name == name) {
            this.allEmojis.splice(i, 1);
          }
          break;
        }

        if(deleted != undefined) {
          this.delEmojis.push(deleted);
        }
        break;
      }
    }
  }

  static delEmojiFromDel(name:string) {
    for(let i = 0; i < this.delEmojis.length; i++){
      if (this.delEmojis[i].name == name) {
        let deleted = this.delEmojis[i];
        this.delEmojis.splice(i, 1)
        console.log(this.allEmojis.length)
        if(deleted != undefined) {
          this.allEmojis.splice(0, 0, deleted)
        }
        console.log(this.allEmojis.length)
        break;
      }
    }
  }

  static addEmojiToFav(name:string) {
    let checker = false;
    for(let i = 0; i < this.favEmojis.length; i++){
      if (this.favEmojis[i].name == name) {
        checker = true;
        break;
      }
    }
    if (!checker) {
      for(let i = 0; i < this.allEmojis.length; i++) {
        if (this.allEmojis[i].name == name) {
          this.favEmojis.push(this.allEmojis[i]);
          break;
        }
      }
      
    }
  }
}

export class Emoji {
  name:string
  link:string

  constructor(name:string, link:string) {
    this.name = name;
    this.link = link;
  }
  toString(){
    return ('"name:"' + this.name + ' "'+this.link+'"')
  }
}