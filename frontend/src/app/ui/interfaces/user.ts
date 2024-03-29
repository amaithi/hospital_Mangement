export interface IUser {
  name: string;
  role: string;
  address: string;
  lastName?: string;
  img?: string | ArrayBuffer;
  gender?: string;
  profileLink?: string;
  _id?: string;
  social?: IUserLink[];
}

export interface IUserLink {
  icon: string;
  link: string;
}
