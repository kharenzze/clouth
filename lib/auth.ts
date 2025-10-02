import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "~~/lib/generated/prisma";
import { PrismaD1 } from "@prisma/adapter-d1";
import type { D1Database } from "@cloudflare/workers-types";

export const configureAuth = (db?: D1Database) => {
  const getDatabase = () => {
    if (db) {
      console.log("Using D1 database");
      return prismaAdapter(
        new PrismaClient({
          adapter: new PrismaD1(db),
        }),
        {
          provider: "sqlite",
        }
      );
    }
    return prismaAdapter(new PrismaClient(), {
      provider: "sqlite",
    });
  };

  return betterAuth({
    database: getDatabase(),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
  });
};

export const auth = configureAuth();
