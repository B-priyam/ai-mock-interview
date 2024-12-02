import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/schema.ts",
  dbCredentials: {
    url: "postgresql://chat-app_owner:fJwRtY7ed9OC@ep-nameless-glade-a59ul00d-pooler.us-east-2.aws.neon.tech/ai-interview?sslmode=require",
  },
});
