"use client";
import { Issue, Status } from "@prisma/client";
import { Badge, Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ChangeIssueStatus = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

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
      router.refresh();
      toast.success(`Status updated to ${statusMap[newStatus].label}`);
    } catch (error) {
      console.log("an error occured", error);
      toast.error("Could not save changes");
    }
  };

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

export default ChangeIssueStatus;
