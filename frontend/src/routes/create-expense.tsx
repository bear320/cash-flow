import { createFileRoute } from "@tanstack/react-router";

const CreateExpense = () => {
  return <div>Create Expense</div>;
};

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});
