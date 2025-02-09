import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const getCurrentUser = async () => {
  const res = await api.auth.me.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }
  const data = await res.json();
  return data;
};

const Profile = () => {
  const { isPending, error, data } = useQuery({ queryKey: ["get-current-user"], queryFn: getCurrentUser });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: You're not logged in.</p>;
  }

  return (
    <div className="p-2">
      <p>Hello {data.user.family_name}</p>
    </div>
  );
};

export const Route = createFileRoute("/profile")({
  component: Profile,
});
