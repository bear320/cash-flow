import { createFileRoute } from "@tanstack/react-router";
import { useQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center gap-2">
        <Avatar>
          {data.user.picture && <AvatarImage src={data.user.picture} alt={data.user.given_name} />}
          <AvatarFallback>{data.user.given_name}</AvatarFallback>
        </Avatar>
        <p>Hello {data.user.family_name}</p>
      </div>
      <Button className="my-4" asChild>
        <a href="/api/auth/logout">Logout</a>
      </Button>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});
