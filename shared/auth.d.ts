import { ObjectId } from 'mongoose'

declare module '#auth-utils' {
  interface User {
    id: ObjectId
    name: string
  }
}
export {}
