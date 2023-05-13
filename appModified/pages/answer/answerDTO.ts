export class AnswerDTO {

  text: string;
  image: string;
  author: string;
  date: string;


  constructor(text: string, image: string, author: string, date: string) {
    this.text = text;
    this.image = image;
    this.author = author;
    this.date = date;
  }
}
