import authOptions from "@/app/api/auth/providers/AuthOptions";
import { IssueStatus } from "@/app/components";
import ChangeIssueStatus from "@/app/components/ChangeIssueStatus";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Markdown from "react-markdown";

const IssueDetailsData = async ({ issue }: { issue: Issue }) => {
  // get the current user id
  const session = await getServerSession(authOptions);
  const assignedUser = session?.user?.id === issue.assignedToUserId;
  // comapare the user id with the current assigned user

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatus status={issue.status} />
        {assignedUser && <ChangeIssueStatus issue={issue} />}
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose max-w-full">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetailsData;
