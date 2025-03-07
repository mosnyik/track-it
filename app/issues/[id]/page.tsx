import { prisma } from "@/prisma/prismaClient";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetailsData from "./IssueDetailsData";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/providers/AuthOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(parseInt((await params).id));
  // prisma.issue.findUnique({
  //   where: {
  //     id: parseInt((await params).id),
  //   },
  // });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="col-span-4  ">
        <IssueDetailsData issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  // const issue = await prisma.issue.findUnique({
  //   where: {
  //     id: parseInt((await params).id),
  //   },
  // });
  const issue = await fetchIssue(parseInt((await params).id));
  return {
    title: issue?.title,
    description: " Description of issue " + issue?.id,
  };
}

export default IssueDetailsPage;
