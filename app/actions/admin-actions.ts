"use server";

import { getSession } from "@/lib/auth-jwt";
import { prisma } from "@/lib/prisma";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateClientProjectAction(data: {
  projectId: string;
  totalAmount: number;
  paidAmount: number;
  driveUrl?: string | null;
  projectBrief: string;
  shootingSuggestions: string[];
  status: ProjectStatus;
}) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized: Admin privileges required." };
  }

  try {
    await prisma.clientProject.update({
      where: { id: data.projectId },
      data: {
        totalAmount: Number(data.totalAmount) || 0,
        paidAmount: Number(data.paidAmount) || 0,
        driveUrl: data.driveUrl?.trim() || null,
        projectBrief: data.projectBrief.trim(),
        shootingSuggestions: JSON.stringify(data.shootingSuggestions),
        status: data.status,
      },
    });

    revalidatePath("/client/admin");
    revalidatePath("/client/portal");

    return { success: true };
  } catch (err) {
    console.error("Admin update project error:", err);
    return { error: "Database error: unable to update client data." };
  }
}

export async function deleteClientAction(userId: string) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized: Admin privileges required." };
  }

  if (!userId || userId === session.id) {
    return { error: "Cannot delete this user." };
  }

  try {
    // Ensure the target exists and is a client (USER), not an ADMIN
    const target = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!target) {
      return { error: "Client not found." };
    }

    if (target.role === "ADMIN") {
      return { error: "Cannot delete an admin account." };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/client/admin");

    return { success: true };
  } catch (err) {
    console.error("Admin delete client error:", err);
    return { error: "Failed to delete client from database." };
  }
}

