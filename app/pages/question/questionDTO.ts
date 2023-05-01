export class questionDTO{
  title: string;
  text: string;
  image: string;
  tag : string;
  author: string;
  date: string;


  constructor(title: string, text: string, image: string, tag: string, author: string, date: string) {
    this.title = title;
    this.text = text;
    this.image = image;
    this.tag = tag;
    this.author = author;
    this.date = date;
  }
}
