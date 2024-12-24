import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AllTransactions } from "./-all-transactions";
import { getTransactionYearsRange } from "@/data/getTransactionYearsRange";
import { getTransactionsByMonth } from "@/data/getTransactionsByMonth";

const today = new Date();

const searchSchema = z.object({
  month: z
    .number()
    .min(1)
    .max(12)
    .catch(today.getMonth() + 1)
    .optional(),
  year: z
    .number()
    .min(today.getFullYear() - 100)
    .max(today.getFullYear())
    .catch(today.getFullYear())
    .optional(),
});

export const Route = createFileRoute(
  "/_authed/dashboard/transactions/_layout/"
)({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => {
    const today = new Date();
    return {
      month: search.month ?? today.getMonth() + 1,
      year: search.year ?? today.getFullYear(),
    };
  },
  loader: async ({ deps }) => {
    const yearsRange = await getTransactionYearsRange();
    const transactions = await getTransactionsByMonth({
      data: {
        month: deps.month,
        year: deps.year,
      },
    });
    return {
      transactions,
      yearsRange,
      month: deps.month,
      year: deps.year,
    };
  },
});

function RouteComponent() {
  const { month, year, yearsRange, transactions } = Route.useLoaderData();
  console.log({ transactions });
  return (
    <AllTransactions
      transactions={transactions}
      month={month}
      year={year}
      yearsRange={yearsRange}
    />
  );
}
