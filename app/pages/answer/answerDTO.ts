export class AnswerDTO {

  content_id : number;
  text: string;
  image: string;
  author: string;
  date: string;

  likes : number;

  dislikes : number;


  constructor(id: number,text: string, image: string, author: string, date: string, l: number, d: number) {
    this.content_id = id;
    this.text = text;
    this.image = image;
    this.author = author;
    this.date = date;
    this.likes = l;
    this.dislikes = d;
  }
}
