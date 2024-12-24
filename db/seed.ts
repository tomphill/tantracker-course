import { categoriesTable } from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL!);

const categoriesSeedData: (typeof categoriesTable.$inferInsert)[] = [
  {
    name: "Salary",
    type: "income",
  },
  {
    name: "Rental Income",
    type: "income",
  },
  {
    name: "Business Income",
    type: "income",
  },
  {
    name: "Investments",
    type: "income",
  },
  {
    name: "Other",
    type: "income",
  },
  {
    name: "Housing",
    type: "expense",
  },
  {
    name: "Transport",
    type: "expense",
  },
  {
    name: "Food & Groceries",
    type: "expense",
  },
  {
    name: "Health",
    type: "expense",
  },
  {
    name: "Entertainment & Leisure",
    type: "expense",
  },
  {
    name: "Other",
    type: "expense",
  },
];

async function main() {
  await db.insert(categoriesTable).values(categoriesSeedData);
}

main();
