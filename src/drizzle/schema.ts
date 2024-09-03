
import { pgTable, uuid, varchar, integer, pgEnum, boolean, real, timestamp, primaryKey } from "drizzle-orm/pg-core"

export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC"])

export const UserTable = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique()

})


export const UserPreferencesTable = pgTable("userPreferences", {
    id: uuid("id").primaryKey().defaultRandom(),
    emailUpdates: boolean("emailUpdates").notNull(),
    userId: uuid("userId").references(() => UserTable.id).notNull()
})

export const PostTable = pgTable("post", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    averageRating: real("averageRating").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    authorId: uuid("authorId").references(() => UserTable.id).notNull()

})

export const CategoryTable = pgTable("category", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull()
})
export const PostCategoryTable = pgTable("postCategory", {
    postId: uuid("postId").references(() => PostTable.id),
    categoryId: uuid("categoryId").references(() => CategoryTable.id).notNull()

}, table => {
    return {
        pk: primaryKey({ columns: [table.postId, table.categoryId] })
    }
})