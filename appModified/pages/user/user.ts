export class User{

  private _userId : number;
  private _lastName : string;
  private _firstname: string;
  private _email : string;
  private _password: string;
  private _phoneNr: string;
  private _profilePicture: string;

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }
  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get phoneNr(): string {
    return this._phoneNr;
  }

  set phoneNr(value: string) {
    this._phoneNr = value;
  }

  get profilePicture(): string {
    return this._profilePicture;
  }

  set profilePicture(value: string) {
    this._profilePicture = value;
  }

  constructor(userId: number, lastName: string, firstname: string, email: string, password: string, phoneNr: string, profilePicture: string) {
    this._userId = userId;
    this._lastName = lastName;
    this._firstname = firstname;
    this._email = email;
    this._password = password;
    this._phoneNr = phoneNr;
    this._profilePicture = profilePicture;
  }
}
