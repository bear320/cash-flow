import { hc } from "hono/client";
import type { ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { CreateExpense } from "@server/types";

const client = hc<ApiRoutes>("/");

export const api = client.api;

const getCurrentUser = async () => {
  const res = await api.auth.me.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }
  const data = await res.json();
  return data;
};

export const useQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export const getAllExpenses = async () => {
  const res = await api.expenses.$get();

  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }

  const data = await res.json();
  return data;
};

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export const createExpense = async ({ value }: { value: CreateExpense }) => {
  const res = await api.expenses.$post({ json: value });

  if (!res.ok) {
    throw new Error("Failed to create expense");
  }

  const newExpense = await res.json();

  return newExpense;
};

export const loadingCreateExpenseQueryOptions = queryOptions<{ expense?: CreateExpense }>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

export const deleteExpense = async ({ id }: { id: number }) => {
  const res = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    throw new Error("Failed to delete expense");
  }
};
