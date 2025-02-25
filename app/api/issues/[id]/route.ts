import { issueSchema } from "@/app/validationShemas";
import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
