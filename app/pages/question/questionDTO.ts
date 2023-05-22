export class questionDTO{

  id : number;
  title: string;
  text: string;
  image: string;
  tag : string;
  author: string;
  date: string;


  constructor(id : number, title: string, text: string, image: string, tag: string, author: string, date: string) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.image = image;
    this.tag = tag;
    this.author = author;
    this.date = date;
  }
}
