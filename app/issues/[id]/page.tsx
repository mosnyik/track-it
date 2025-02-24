import { IssueStatus } from "@/app/components";
import { prisma } from "@/prisma/prismaClient";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt((await params).id, 10),
    },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "2" }} className="space-y-3">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="3">
          <IssueStatus status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose">
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
