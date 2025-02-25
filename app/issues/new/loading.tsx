import Skeleton from "react-loading-skeleton";

const NewIssueLoading = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </div>
  );
};

export default NewIssueLoading;
