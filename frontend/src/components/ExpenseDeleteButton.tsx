import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteExpense, getAllExpensesQueryOptions } from "@/lib/api";

const ExpenseDeleteButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast("Error", {
        description: "Failed to delete expense.",
      });
    },
    onSuccess: () => {
      toast("Success", {
        description: "Expense deleted.",
      });

      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, (existingExpenses) => ({
        ...existingExpenses,
        expenses: existingExpenses!.expenses.filter((expense) => expense.id !== id),
      }));
    },
  });

  return (
    <Button variant="outline" size="icon" disabled={mutation.isPending} onClick={() => mutation.mutate({ id })}>
      {mutation.isPending ? "..." : <Trash className="h-4 w-4" />}
    </Button>
  );
};

export default ExpenseDeleteButton;
