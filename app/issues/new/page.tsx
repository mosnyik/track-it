"use client";
import dynamic from "next/dynamic";
import IssueFormLoadingSkeleton from "../_compponent/IssueFormLoadingSkeleton";

const Issue = dynamic(() => import("@/app/issues/_compponent/IssuesForm"), {
  ssr: false,
  loading: () => <IssueFormLoadingSkeleton />,
});

const NewIssuesPage = () => {
  return <Issue />;
};

export default NewIssuesPage;
