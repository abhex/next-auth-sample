import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { RoleName } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      roles: RoleName[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    roles: RoleName[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    roles: RoleName[];
  }
}
