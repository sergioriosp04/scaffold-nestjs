import { Column, Model, Table } from 'sequelize-typescript'

// @Table({
//   defaultScope: {
//     attributes: { exclude: ['password', 'passRecovery'] },
//   }}
// )
@Table({
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password', 'passRecovery'] },
    },
  },
})
export class User extends Model {
  @Column
  firstName: string

  @Column
  lastName: string

  @Column
  email: string

  @Column
  document: string

  @Column
  password: string

  @Column
  role: string

  @Column
  passRecovery: string
}
