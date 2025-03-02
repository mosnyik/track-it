"use client";
import { Issue, Status } from "@prisma/client";
import { Skeleton, Select, Badge } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ChangeIssueStatus = ({ issue }: { issue: Issue }) => {
  //   const { data: users, error, isLoading } = useUsers();

  const [selectedStatus, setSelectedStatus] = useState<Status>(issue.status);

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

  const changeIssue = async (newStatus: Status) => {
    try {
      await axios.patch(`/api/issues/` + issue.id, {
        status: newStatus,
      });
      setSelectedStatus(newStatus);
      toast.success(`Status updated to ${statusMap[newStatus].label}`);
    } catch (error) {
      toast.error("Could not save changes");
    }
  };

  //   if (isLoading) return <Skeleton />;

  //   if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={statusMap[issue.status].label}
        value={selectedStatus}
        onValueChange={(value) => changeIssue(value as Status)}
      >
        <Select.Trigger>
          <Badge color={statusMap[issue.status].color}>
            {statusMap[issue.status].label}
          </Badge>
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {Object.entries(statusMap).map(([key, { label }]) => (
              <Select.Item key={key} value={key}>
                {label}
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
