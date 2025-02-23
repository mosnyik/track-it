import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";
import { createIssueSchema } from "../../validationShemas";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error, success } = createIssueSchema.safeParse(body);
  if (!success)
    return NextResponse.json({ message: error.errors }, { status: 400 });
  const newIssue = await prisma.issue.create({
    data: data,
  });
  return NextResponse.json(newIssue, { status: 201 });
}
