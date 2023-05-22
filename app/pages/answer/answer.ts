export class Answer{
  private content_id: number;
  private question_id: number;
  private author_cnp: number;
  private text_content: string;
  private creation_date_time: Date;
  private picture: string;
  private likes: number;
  private dislikes: number;


  constructor(contentId: number, question_id: number, authorCNP: number, text_content: string, creationDate: Date, picture: string, likes: number, dislikes: number) {
    this.content_id = contentId;
    this.question_id = question_id;
    this.author_cnp = authorCNP;
    this.text_content = text_content;
    this.creation_date_time = creationDate;
    this.picture = picture;
    this.likes = likes;
    this.dislikes = dislikes;
  }

  get contentId1(): number {
    return this.content_id;
  }

  set contentId2(value: number) {
    this.content_id = value;
  }

  get question_id1(): number {
    return this.question_id;
  }

  set question_id1(value: number) {
    this.question_id = value;
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

  set likes2(value: number) {
    this.likes = value;
  }

  get dislikes1(): number {
    return this.dislikes;
  }

  set dislikes2(value: number) {
    this.dislikes = value;
  }
  public incrementLikes() {
    this.likes++;
  }

}
