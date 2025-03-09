import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(users);
}
