export class Vote{
  private id:number;
  private user_id:number;
  private content_id:number;
  private vote_type:number;

  constructor(id: number, user_id: number, content_id: number, vote_type:number) {
    this.id = id;
    this.user_id = user_id;
    this.content_id = content_id;
    this.vote_type = vote_type
  }
}
