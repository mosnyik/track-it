import { prisma } from "@/prisma/prismaClient";
import EditIssue from "../../_compponent/IssuesForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuesPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt((await params).id),
    },
  });
  if (!issue) notFound();
  return <EditIssue issue={issue} />;
};

export default EditIssuesPage;
