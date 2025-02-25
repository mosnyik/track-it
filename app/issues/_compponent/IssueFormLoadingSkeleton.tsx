import { Skeleton, Box } from "@radix-ui/themes";

const IssueFormLoadingSkeleton = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton height="2rem" width="11rem" />
      <Skeleton height="2rem" />
      <Skeleton height="2rem" width="15rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormLoadingSkeleton;
