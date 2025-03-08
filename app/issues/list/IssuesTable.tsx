import { IssueStatus, Link } from "@/app/components";
import AssignedUser from "@/app/components/AssignedUser";
import { IssueQuery } from "@/app/types";
import { Issue } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssuesTable = async ({ searchParams, issues }: Props) => {
  const resolvedParams = await searchParams;
  return (
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
                {column.value === resolvedParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
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
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNumber = columns.map((column) => column.value);

export default IssuesTable;
