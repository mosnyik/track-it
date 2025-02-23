import { Heading } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const IssueHeading = ({ children }: PropsWithChildren) => {
  return (
    <Heading as="h4" weight="medium" size="6">
      {children}
    </Heading>
  );
};

export default IssueHeading;
