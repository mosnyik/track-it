import { prisma } from "@/prisma/prismaClient";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssuesChart from "./IssuesChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Dashboard | Track It - Issue Tracker",
  description:
    "View a summary of your tracked issues, graphical representations, and the latest reported issues in one glance on the Track It dashboard.",
  keywords:
    "issue tracker, bug tracker, project management, software issues, Track It, issue summary, latest issues, dashboard",
  openGraph: {
    title: "Track It Dashboard - Stay on top of your issues",
    description:
      "Track It helps you manage software issues effectively. Get a summary, visualize data, and view the latest issues in one place.",
    url: "https://loacalhost/dashboard",
    type: "website",
    images: [
      {
        url: "https://loacalhost/dashboard-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Track It dashboard preview showing issue summary and charts",
      },
    ],
  },
  // twitter: {
  //   card: "Track-it-dashboard",
  //   title: "Track It Dashboard - Issue Tracker",
  //   description:
  //     "Manage issues effectively with Track It. Get insights into reported issues with summary, charts, and latest updates.",
  //   images: ["https://loacalhost/dashboard-preview.jpg"],
  // },
};
