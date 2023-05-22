export class TagQ{
  private id: number;
  private question_id: number;
  private tag_id: number;

  constructor(id: number, question_id: number, tag_id: number) {
    this.id = id;
    this.question_id = question_id;
    this.tag_id = tag_id;
  }
}
