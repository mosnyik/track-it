import { prisma } from "@/prisma/prismaClient";
import { Table } from "@radix-ui/themes";
import React from "react";
import IssueStatus from "../components/IssueStatus";
import delay from "delay";
import NewIssueButton from "../components/NewIssueButton";
import Link from "next/link";

const Issues = async () => {
  const issues = await prisma.issue.findMany();
  await delay(3000);
  return (
    <div className="space-y-3">
      <NewIssueButton />
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
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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
    </div>
  );
};

export default Issues;
