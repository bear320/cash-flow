import { Hono } from "hono";
import { z } from "zod";

type Expense = {
  id: number;
  title: string;
  amount: number;
};

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 50 },
  { id: 2, title: "Utilities", amount: 100 },
  { id: 3, title: "Rent", amount: 1200 },
  { id: 4, title: "Internet", amount: 60 },
];

const createExpenseSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", async (c) => {
    const data = await c.req.json();
    const expense = createExpenseSchema.parse(data);
    console.log({ expense });
    return c.json(expense);
  });
// .delete
// .put
