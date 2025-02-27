import { issueSchema } from "@/app/validationShemas";
import { prisma } from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/providers/AuthOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();

  const { success, error } = issueSchema.safeParse(body);
  if (!success)
    return NextResponse.json({ error: error.format() }, { status: 400 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!issue) return NextResponse.json({ message: "Invalid Issue" });
  const NewIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(NewIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt((await params).id) },
  });
  return NextResponse.json({ message: `${deletedIssue.title} deleted` });
}
