export class Question{
  private _contentId: number;
  private _title: string;
  private _authorCNP: number;
  private _text_content: string;
  private _creationDate: string;
  private _picture: string;
  private _likes: number;
  private _dislikes: number;


  constructor(contentId: number, title: string, authorCNP: number, text_content: string, creationDate: string, picture: string, likes: number, dislikes: number) {
    this._contentId = contentId;
    this._title = title;
    this._authorCNP = authorCNP;
    this._text_content = text_content;
    this._creationDate = creationDate;
    this._picture = picture;
    this._likes = likes;
    this._dislikes = dislikes;
  }

  get contentId(): number {
    return this._contentId;
  }

  set contentId(value: number) {
    this._contentId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get authorCNP(): number {
    return this._authorCNP;
  }

  set authorCNP(value: number) {
    this._authorCNP = value;
  }

  get text_content(): string {
    return this._text_content;
  }

  set text_content(value: string) {
    this._text_content = value;
  }

  get creationDate(): string {
    return this._creationDate;
  }

  set creationDate(value: string) {
    this._creationDate = value;
  }

  get picture(): string {
    return this._picture;
  }

  set picture(value: string) {
    this._picture = value;
  }

  get likes(): number {
    return this._likes;
  }

  set likes(value: number) {
    this._likes = value;
  }

  get dislikes(): number {
    return this._dislikes;
  }

  set dislikes(value: number) {
    this._dislikes = value;
  }
}
