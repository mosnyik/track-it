import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";
import { issueSchema } from "../../validationShemas";
import { getServerSession } from "next-auth";
import authOptions from "../auth/providers/AuthOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const { data, error, success } = issueSchema.safeParse(body);
  if (!success)
    return NextResponse.json({ message: error.errors }, { status: 400 });
  const newIssue = await prisma.issue.create({
    data: data,
  });
  return NextResponse.json(newIssue, { status: 201 });
}
