import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {

  @Column
  username: string | undefined;

  @Column
  email: String | undefined;

  // @Column
  // password: String | undefined;
}