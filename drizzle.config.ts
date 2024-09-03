import { defineConfig } from "drizzle-kit"
import "dotenv/config"

export default defineConfig({
    dialect: "postgresql",
    out: "./src/drizzle/migrations",
    schema: "./src/drizzle/schema.ts",
    dbCredentials: {
        url: process.env.DATABASE_URL as string
    },
    verbose: true,
    strict: true


})