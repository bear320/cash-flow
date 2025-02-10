import { createFileRoute } from "@tanstack/react-router";
import { useQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { isPending, error, data } = useQuery(useQueryOptions);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: You're not logged in.</p>;
  }

  return (
    <div className="p-2">
      <p>Hello {data.user.family_name}</p>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});
