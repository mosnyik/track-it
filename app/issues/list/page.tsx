import { NewIssueButton } from "@/app/components";
import Pagination from "@/app/components/Pagination";
import { IssueQuery } from "@/app/types";
import { prisma } from "@/prisma/prismaClient";
import { Status } from "@prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import IssuesTable, { columnNumber } from "./IssuesTable";

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
        // <Table.Root variant="surface">
        //   <Table.Header>
        //     <Table.Row>
        //       {columns.map((column) => (
        //         <Table.ColumnHeaderCell
        //           key={column.value}
        //           className={column.className}
        //         >
        //           <NextLink
        //             href={{
        //               query: {
        //                 ...resolvedParams,
        //                 orderBy: column.value,
        //               },
        //             }}
        //           >
        //             {column.label}
        //             {column.value === resolvedParams.orderBy && (
        //               <ArrowUpIcon className="inline" />
        //             )}
        //           </NextLink>
        //         </Table.ColumnHeaderCell>
        //       ))}
        //     </Table.Row>
        //   </Table.Header>

        //   <Table.Body>
        //     {issues.map((issue) => (
        //       <Table.Row key={issue.id}>
        //         <Table.RowHeaderCell>
        //           <Link href={`/issues/${issue.id}`}>
        //             <div>
        //               {issue.title}
        //               {issue.assignedToUserId && (
        //                 <AssignedUser
        //                   assignedToUserId={issue.assignedToUserId ?? ""}
        //                 />
        //               )}
        //             </div>
        //           </Link>
        //           <div className=" block md:hidden">
        //             <IssueStatus status={issue.status} />
        //           </div>
        //         </Table.RowHeaderCell>
        //         <Table.Cell className="hidden md:table-cell">
        //           <IssueStatus status={issue.status} />
        //         </Table.Cell>
        //         <Table.Cell className="hidden md:table-cell">
        //           {issue.createdAt.toDateString()}
        //         </Table.Cell>
        //       </Table.Row>
        //     ))}
        //   </Table.Body>
        // </Table.Root>
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

export default Issues;
