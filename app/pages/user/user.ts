export class User{

  userId : number;
  private lastName : string;
  private firstName: string;
  private email : string;
  private password: string;
  private phoneNr: string;
  private profilePicture: string;

  get userId1(): number {
    return this.userId;
  }

  set userId1(value: number) {
    this.userId = value;
  }
  get lastName1(): string {
    return this.lastName;
  }

  set lastName1(value: string) {
    this.lastName = value;
  }

  get firstname1(): string {
    return this.firstName;
  }

  set firstname1(value: string) {
    this.firstName = value;
  }

  get email1(): string {
    return this.email;
  }

  set email1(value: string) {
    this.email = value;
  }

  get password1(): string {
    return this.password;
  }

  set password1(value: string) {
    this.password = value;
  }

  get phoneNr1(): string {
    return this.phoneNr;
  }

  set phoneNr1(value: string) {
    this.phoneNr = value;
  }

  get profilePicture1(): string {
    return this.profilePicture;
  }

  set profilePicture1(value: string) {
    this.profilePicture = value;
  }

  constructor(userId: number, lastName: string, firstname: string, email: string, password: string, phoneNr: string, profilePicture: string) {
    this.userId = userId;
    this.lastName = lastName;
    this.firstName = firstname;
    this.email = email;
    this.password = password;
    this.phoneNr = phoneNr;
    this.profilePicture = profilePicture;
  }
}
