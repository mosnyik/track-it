import { Status, Issue } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
