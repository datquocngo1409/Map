import {IGeoPoint} from './geopoint';

export class IUser {
  id: number;
  username: string;
  password: string;
  role: string;
  name: string;
  birthDay: Date;
  age: number;
  type: string;
  phone: string;
  email: string;
  idNumber: number;
  avatar: string;
  token: string;
  homeAddress: IGeoPoint;
  officeAddress: IGeoPoint;
  driver: boolean;
}
