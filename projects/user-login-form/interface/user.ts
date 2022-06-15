import { Address } from './address';
export interface User {
  firstname: string;
  lastname: string;
  address: Address;
  gender: string;
  email: string;
  password: string;
}
