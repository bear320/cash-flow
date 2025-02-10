import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getUser } from "../kinde";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const createExpenseSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 50 },
  { id: 2, title: "Utilities", amount: 100 },
  { id: 3, title: "Rent", amount: 1200 },
  { id: 4, title: "Internet", amount: 60 },
];

export const expensesRoute = new Hono()
  .get("/", getUser, (c) => {
    const user = c.var.user;
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expense);
  })
  .get("/:id{[0-9]+}", getUser, (c) => {
    const id = c.req.param("id");
    const expense = fakeExpenses.find((e) => e.id === Number(id));
    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .get("/total", getUser, (c) => {
    const totalSpent = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    return c.json({ totalSpent });
  })
  .delete("/:id{[0-9]+}", getUser, (c) => {
    const id = c.req.param("id");
    const index = fakeExpenses.findIndex((e) => e.id === Number(id));
    if (index === -1) {
      return c.notFound();
    }
    fakeExpenses.splice(index, 1);
    return c.json({ success: true });
  });
// .put
