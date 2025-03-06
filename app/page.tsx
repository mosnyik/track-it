import Pagination from "./components/Pagination";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page);
  return (
    <Pagination
      itemCount={100}
      pageNumber={10}
      currentPage={currentPage || 1}
    />
  );
}
