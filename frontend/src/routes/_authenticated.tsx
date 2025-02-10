import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useQueryOptions } from "@/lib/api";

const Login = () => {
  return (
    <div>
      <p>You have to login.</p>
      <a href="/api/auth/login">Login</a>
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
