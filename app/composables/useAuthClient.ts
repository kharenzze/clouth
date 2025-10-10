import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient({
  basePath: "/api/auth",
});

export const useAuthClient = () => {
  return authClient;
};
