import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession, User } from "next-auth"
import { MongoClient } from "mongodb"

export interface SessionData extends User {
  lectureStore?: {
    semester?: string
  }
}

export default async function useSessionData() {
  const session = await getServerSession(options)
  if(!session || !session.user) return { user: null, data: null, getData: () => null, update: (param: any) => null}

  const user = session.user as User
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect()
  const db = client.db(process.env.MONGODB_AUTH_DB)
  const collection = db.collection('users')

  // @ts-ignore
  const findType = async <T>(filter: any): Promise<T[]> => await collection.find(filter, { projection: { _id: 0 } }).toArray() as T[]

  const getData = async () => await findType<SessionData>({ ...user }).then(res => res?.at(0))
  const update = async (obj: Omit<SessionData, 'name' | 'email' | 'id' | 'image'>) => {
    return await collection.updateOne({ ...user }, { $set: obj } )
  }

  const data = await getData()

  return { user, data, getData, update }
}