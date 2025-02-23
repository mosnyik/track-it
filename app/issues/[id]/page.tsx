import IssueStatus from "@/app/components/IssueStatus";
import { prisma } from "@/prisma/prismaClient";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params?.id),
    },
  });

  if (!issue) notFound();
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatus status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
