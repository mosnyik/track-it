import { prisma } from "@/prisma/prismaClient";
import { Box, Flex, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatus, NewIssueButton, Link } from "@/app/components";
import AssignedUser from "../../components/AssignedUser";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}
const Issues = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;
  const parsedParam = resolvedParams.status;
  const statuses = Object.values(Status);
  const status = statuses.includes(parsedParam) ? parsedParam : undefined;

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  const issues = await prisma.issue.findMany({
    where: { status },
  });

  return (
    <div className="space-y-3">
      <NewIssueButton />
      {issues.length === 0 ? (
        <Flex justify="center" align="center" className="max-w-xl">
          <Box>You have no issues yet</Box>
        </Flex>
      ) : (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <NextLink
                    href={{
                      query: {
                        ...resolvedParams,
                        orderBy: column.value,
                      },
                    }}
                  >
                    {column.label}
                    {column.value === resolvedParams.orderBy && <ArrowUpIcon className="inline" />}
                  </NextLink>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <Link href={`/issues/${issue.id}`}>
                    <div>
                      {issue.title}
                      {issue.assignedToUserId && (
                        <AssignedUser
                          assignedToUserId={issue.assignedToUserId ?? ""}
                        />
                      )}
                    </div>
                  </Link>
                  <div className=" block md:hidden">
                    <IssueStatus status={issue.status} />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatus status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};
export const dynamic = "force-dynamic";

export default Issues;
