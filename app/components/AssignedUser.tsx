import { prisma } from "@/prisma/prismaClient";
import { Avatar } from "@radix-ui/themes";
import React from "react";

const AssignedUser = async ({
  assignedToUserId,
}: {
  assignedToUserId: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: assignedToUserId,
    },
  });

  if (!user) return null;
  return (
    <div>
      <Avatar
        src={user.image ?? "A"}
        fallback="?"
        radius="full"
        className="h-4 w-4"
      />
    </div>
  );
};

export default AssignedUser;
