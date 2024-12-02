import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockSchema = pgTable("mockIntreview", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("jsonMockResponse").notNull(),
  jobPosition: varchar("jobPostion").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});

export const userAnswerSchema = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdReference: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  userAnswer: varchar("userAnswer"),
  correctAnswer: varchar("correctAnswer"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});
