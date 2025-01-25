import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    fetch("/api/expenses/total")
      .then((res) => res.json())
      .then((data) => setTotalSpent(data.totalSpent));
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
