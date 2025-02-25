import { Skeleton, Flex, Card } from "@radix-ui/themes";
import React from "react";

const IssueDetailsLoading = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="3">
        <Skeleton width="3rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose">
        <Skeleton height="20rem" />
      </Card>
    </div>
  );
};

export default IssueDetailsLoading;
