import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination itemCount={100} pageNumber={10} currentPage={2} />;
}
