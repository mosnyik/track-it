import { prisma } from "@/prisma/prismaClient";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssuesChart from "./IssuesChart";

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
  {
    /* <LatestIssues />; */
  }

  // return <IssueSummary open={open} inProgress={inProgress} Closed={Closed} />;
  return <IssuesChart open={open} inProgress={inProgress} Closed={Closed} />;
}
