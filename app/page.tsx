import { prisma } from "@/prisma/prismaClient";
import LatestIssues from "./LatestIssues";

export default function Home() {


  return <LatestIssues />;
}
