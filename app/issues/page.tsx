import { prisma } from "@/prisma/prismaClient";
import { Box, Flex, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatus, NewIssueButton, Link } from "@/app/components";
import AssignedUser from "../components/AssignedUser";

const Issues = async () => {
  const issues = await prisma.issue.findMany();
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
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
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
