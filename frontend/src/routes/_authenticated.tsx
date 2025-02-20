import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useQueryOptions } from "@/lib/api";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <p>You have to login or register.</p>
      <Button asChild>
        <a href="/api/auth/login">Login</a>
      </Button>
      <Button asChild>
        <a href="/api/auth/register">Register</a>
      </Button>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();

  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(useQueryOptions);
      return data;
    } catch {
      return { user: null };
    }
  },
  component: Component,
});
