"use server";

import { signUpSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { RoleName } from "@prisma/client";

export async function handleSignUp({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const parsedCredentials = signUpSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!parsedCredentials.success) {
      return { success: false, message: "Invalid data." };
    }

    // check if the email is already taken
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists. Login to continue.",
      };
    }

    console.log("PRISMAA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(prisma.user);
    console.log(prisma.role);

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let userRole = await prisma.role.findFirst({
      where: {
        role: "USER",
      },
    });

    if (!userRole) {
      userRole = await prisma.role.create({
        data: { role: RoleName.USER },
      });
    }

    // Make database query to save this information
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roles: {
          create: [
            {
              role: {
                connect: {
                  id: userRole.id,
                },
              },
            },
          ],
        },
      },
      include: { roles: { include: { role: true } } },
    });

    return { success: true, message: "Account created successfully." };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

/**
 * Handles credentials signin
 * @param {
 *   email,
 *   password,
 * }
 * @returns
 */
export async function handleCredentialsSignin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    return await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut();
}
