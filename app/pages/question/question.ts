export class Question{
  private content_id: number;
  private title: string;
  private author_cnp: number;
  private text_content: string;
  private creation_date_time: Date;
  private picture: string;
  private likes: number;
  private dislikes: number;


  constructor(contentId: number, title: string, author_cnp: number, text_content: string, creationDate: Date, picture: string, likes: number, dislikes: number) {
    this.content_id = contentId;
    this.title = title;
    this.author_cnp = author_cnp;
    this.text_content = text_content;
    this.creation_date_time = creationDate;
    this.picture = picture;
    this.likes = likes;
    this.dislikes = dislikes;
  }

  get contentId1(): number {
    return this.content_id;
  }

  set contentId1(value: number) {
    this.content_id = value;
  }

  get title1(): string {
    return this.title;
  }

  set title1(value: string) {
    this.title = value;
  }

  get authorCNP1(): number {
    return this.author_cnp;
  }

  set authorCNP1(value: number) {
    this.author_cnp = value;
  }

  get text_content1(): string {
    return this.text_content;
  }

  set text_content1(value: string) {
    this.text_content = value;
  }

  get creationDate1(): Date {
    return this.creation_date_time;
  }

  set creationDate1(value: Date) {
    this.creation_date_time = value;
  }

  get picture1(): string {
    return this.picture;
  }

  set picture1(value: string) {
    this.picture = value;
  }

  get likes1(): number {
    return this.likes;
  }

  set likes1(value: number) {
    this.likes = value;
  }

  get dislikes1(): number {
    return this.dislikes;
  }

  set dislikes1(value: number) {
    this.dislikes = value;
  }
}
