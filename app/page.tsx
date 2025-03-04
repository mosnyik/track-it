import Pagination from "./components/Pagination";

interface Props {
  searchParams: { page: string };
}

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  console.log(resolvedParams);
  const currentPage = parseInt(resolvedParams.page);
  return (
    <Pagination itemCount={100} pageNumber={10} currentPage={currentPage} />
  );
}
