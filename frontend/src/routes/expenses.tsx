import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const getAllExpenses = async () => {
  const res = await api.expenses.$get();

  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }

  const data = await res.json();
  return data;
};

const Expenses = () => {
  const { isPending, error, data } = useQuery({ queryKey: ["get-all-expenses"], queryFn: getAllExpenses });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return <div className="p-2">{isPending ? "Loading..." : JSON.stringify(data)}</div>;
};

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});
