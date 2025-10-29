export async function useBetterSession() {
  const { data } = await useAsyncData("serversideAuth", async () => {
    if (import.meta.server) {
      const event = useRequestEvent();
      if (!event) {
        return undefined;
      }
      try {
        // Get the session from the request
        const session = await event.context.auth.api.getSession(event.node.req);
        return session;
      } catch (error) {
        return undefined;
      }
    } else if (import.meta.client) {
      try {
        const authClient = useAuthClient();
        const { data, error } = await authClient.getSession();
        if (error) {
          return undefined;
        }
        return data;
      } catch (err) {
        return undefined;
      }
    }
  });
  return data;
}
