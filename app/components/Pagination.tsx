import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number;
  pageNumber: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageNumber, currentPage }: Props) => {
  const pageCount = itemCount / pageNumber;
  return (
    <Flex align={"center"} gap={"2"}>
      <Text>
        Page {currentPage} of {pageNumber}
      </Text>
      <Button variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon color="gray" />
      </Button>
      <Button variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === pageCount}>
        <ChevronRightIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon color="gray" />
      </Button>
    </Flex>
  );
};

export default Pagination;
