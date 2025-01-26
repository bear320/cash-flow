import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const fetchTotalSpent = async () => {
      const res = await fetch("/api/expenses/total");
      const data = await res.json();
      setTotalSpent(data.totalSpent);
    };
    fetchTotalSpent();
  });

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        <p>${totalSpent}</p>
      </CardContent>
    </Card>
  );
};

export default App;
