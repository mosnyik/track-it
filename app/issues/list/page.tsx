import { NewIssueButton } from "@/app/components";
import Pagination from "@/app/components/Pagination";
import { IssueQuery } from "@/app/types";
import { prisma } from "@/prisma/prismaClient";
import { Status } from "@prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import IssuesTable, { columnNumber } from "./IssuesTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}
const Issues = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;
  const parsedParam = resolvedParams.status;

  const statuses = Object.values(Status);
  const status = statuses.includes(parsedParam) ? parsedParam : undefined;

  const page = parseInt(resolvedParams.page) || 1;
  const where = { status };
  const pageSize = 7;

  const orderBy = columnNumber.includes(resolvedParams.orderBy)
    ? { [resolvedParams.orderBy]: "asc" }
    : undefined;
  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <div className="space-y-3">
      <NewIssueButton />
      {issues.length === 0 ? (
        <Flex justify="center" align="center" className="max-w-xl">
          <Box>You have no issues yet</Box>
        </Flex>
      ) : (
        <IssuesTable searchParams={resolvedParams} issues={issues} />
      )}
      <Pagination
        itemCount={issueCount}
        pageNumber={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Issues | Track It - Manage and Track Issues",
  description:
    "View, filter, sort, and add new issues with Track It. Keep your project on track with an organized and efficient issue management system.",
  keywords:
    "issue tracker, bug tracker, project management, task management, software issues, filter issues, sort issues, Track It",
  openGraph: {
    title: "Track It - Issue Management",
    description:
      "Manage software issues efficiently with Track It. Filter, sort, and create new issues to streamline your workflow.",
    url: "https://loacalhost/issues/list",
    type: "website",
    images: [
      {
        url: "https://loacalhost/issues/list-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Track It issues page showing filters and issue list",
      },
    ],
  },
  // twitter: {
  //   card: "Track-it-issue-list-page",
  //   title: "Track It - Issue Management",
  //   description:
  //     "Easily track, filter, and organize your project issues with Track It. A powerful issue tracker built for efficiency.",
  //   images: ["https://loacalhost/issues/list-preview.jpg"],
  // },
};

export default Issues;
