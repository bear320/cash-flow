import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { api, getAllExpensesQueryOptions } from "@/lib/api";
import { createExpenseSchema } from "@server/types";

const CreateExpense = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(getAllExpensesQueryOptions);

      const res = await api.expenses.$post({ json: value });

      if (!res.ok) {
        throw new Error("Failed to create expense");
      }

      const newExpense = await res.json();
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
        ...existingExpenses,
        expenses: [newExpense, ...existingExpenses.expenses],
      });

      navigate({ to: "/expenses" });
    },
  });

  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form
        className="max-w-xl m-auto flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
          children={(field) => {
            return (
              <div>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </div>
            );
          }}
        />
        <form.Field
          name="amount"
          validators={{
            onChange: createExpenseSchema.shape.amount,
          }}
          children={(field) => {
            return (
              <div>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </div>
            );
          }}
        />
        <form.Field
          name="date"
          validators={{
            onChange: createExpenseSchema.shape.date,
          }}
          children={(field) => {
            return (
              <div className="self-center">
                <Calendar
                  mode="single"
                  selected={new Date(field.state.value)}
                  onSelect={(date) => field.handleChange((date ?? new Date()).toISOString())}
                  className="rounded-md border"
                />
              </div>
            );
          }}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="mt-4" disabled={!canSubmit}>
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          )}
        />
      </form>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});
