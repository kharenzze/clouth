import { PrismaClient } from "~~/lib/generated/prisma";
import { configureAuth } from "../../lib/auth";
import { PrismaD1 } from "@prisma/adapter-d1";

export default defineNitroPlugin((nitroApp) => {
  let auth: ReturnType<typeof configureAuth> | undefined = undefined;
  nitroApp.hooks.hook("request", async (event) => {
    const db = event.context.cloudflare.env.clouth;
    if (!auth) {
      auth = configureAuth(db);
    }
    event.context.auth = auth;
    event.context.prisma = new PrismaClient({
      adapter: new PrismaD1(db),
    });
  });
});
