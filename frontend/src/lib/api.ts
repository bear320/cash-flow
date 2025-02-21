import { hc } from "hono/client";
import type { ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";

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
