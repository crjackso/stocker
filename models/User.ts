class User {
  constructor({ id, firstName, lastName, email }: { id: number, firstName: string; lastName: string, email: string }) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }

  id: number
  firstName: string
  lastName: string
  email: string
}

export default User