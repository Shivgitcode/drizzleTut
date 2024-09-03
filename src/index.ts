import "dotenv/config"
import { db } from "./drizzle/db"
import { UserTable } from "./drizzle/schema"

async function main() {
    await db.delete(UserTable)
    const user = await db.insert(UserTable).values({
        name: "Kyle",
        age: 29,
        email: "test@test.com"
    }).returning({
        id: UserTable.id,
        name: UserTable.name
    })
    console.log(user)
}
main()
