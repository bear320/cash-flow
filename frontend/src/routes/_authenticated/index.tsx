import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const getTotalSpent = async () => {
  const res = await api.expenses.total.$get();

  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }

  const data = await res.json();
  return data;
};

const Index = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{isPending ? "Loading..." : data?.total ? `$${data.total}` : "$0"}</p>
      </CardContent>
    </Card>
  );
};

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});
