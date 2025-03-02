import { patchIssueSchema } from "@/app/validationShemas";
import { prisma } from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/providers/AuthOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const { success, error } = patchIssueSchema.safeParse(body);

  const { assignedToUserId, title, description, status } = body;

  if (!success)
    return NextResponse.json({ error: error.format() }, { status: 400 });

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!issue) return NextResponse.json({ message: "Invalid Issue" });
  const NewIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedToUserId, status },
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
