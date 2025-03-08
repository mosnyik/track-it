import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  Closed: number;
}
const IssueSummary = ({ open, inProgress, Closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "inProgress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: Closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column">
            <Link href={`issues/list?status=${container.status}`} className="font-medium text-xs">
              {container.label}
            </Link>
            <Text size="5" className="font-bold"> {container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
