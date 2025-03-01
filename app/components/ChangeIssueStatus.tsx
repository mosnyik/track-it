"use client";
import { Issue, Status } from "@prisma/client";
import { Skeleton, Select, Badge } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ChangeIssueStatus = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/` + issue.id, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
    } catch (error) {
      toast.error("Could not save changes");
    }
  };

  const statusMap: Record<
    Status,
    { label: string; color: "red" | "violet" | "green" }
  > = {
    OPEN: {
      label: "Open",
      color: "red",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "violet",
    },
    CLOSED: {
      label: "Closed",
      color: "green",
    },
  };

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={statusMap[issue.status].label}
        onValueChange={() => console.log(issue.status)}
      >
        <Select.Trigger>
          <Badge color={statusMap[issue.status].color}>
            {statusMap[issue.status].label}
          </Badge>
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {Object.entries(statusMap).map((status) => (
              <Select.Item value={status[1].label}>
                {status[1].label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60 sec
    retry: 3,
  });
export default ChangeIssueStatus;
