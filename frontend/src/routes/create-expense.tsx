import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CreateExpense = () => {
  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form className="max-w-xl m-auto">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Title" />
        <Label htmlFor="amount">Amount</Label>
        <Input type="number" id="amount" placeholder="Amount" />
        <Button type="submit" className="mt-4">
          Create Expense
        </Button>
      </form>
    </div>
  );
};

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});
