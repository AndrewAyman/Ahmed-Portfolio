"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSessionToken, setSessionCookie, removeSessionCookie } from "@/lib/auth-jwt";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return { error: "Invalid email or password." };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return { error: "Invalid email or password." };
    }

    const token = await createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as "ADMIN" | "USER",
    });

    await setSessionCookie(token);

    return {
      success: true,
      role: user.role,
    };
  } catch (err) {
    console.error("Login error:", err);
    return { error: "An unexpected error occurred during login." };
  }
}

export async function registerAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "An account with this email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "USER",
        project: {
          create: {
            totalAmount: 0,
            paidAmount: 0,
            projectBrief: "Welcome! Your project brief and assets will be updated here shortly.",
            shootingSuggestions: JSON.stringify([]),
            status: "PENDING",
          },
        },
      },
    });

    // Auto sign in on registration
    const token = await createSessionToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: "USER",
    });
    await setSessionCookie(token);

    return { success: true };
  } catch (err) {
    console.error("Registration error:", err);
    return { error: "Failed to create account. Please try again." };
  }
}

export async function logoutAction() {
  await removeSessionCookie();
  redirect("/client");
}

