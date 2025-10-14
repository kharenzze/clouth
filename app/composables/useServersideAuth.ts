export async function useServersideAuth() {
  const event = useRequestEvent();

  const { data } = await useAsyncData("serversideAuth", async () => {
    if (!event?.context?.auth) {
      return undefined;
    }

    try {
      // Get the session from the request
      const session = await event.context.auth.api.getSession(event.node.req);
      return session;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return undefined;
    }
  });
  return data;
}
