import { prisma } from "@/prisma/prismaClient";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssuesChart from "./IssuesChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const Closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} Closed={Closed} />
        <IssuesChart open={open} inProgress={inProgress} Closed={Closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
