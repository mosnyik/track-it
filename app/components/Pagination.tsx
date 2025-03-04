"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageNumber: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageNumber, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageNumber);

  if (pageCount <= 1) return null;

  const router = useRouter();
  const searchPararms = useSearchParams();

  const onChange = (page: number) => {
    const params = new URLSearchParams(searchPararms);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align={"center"} gap={"2"}>
      <Text>
        Page {currentPage} of {pageNumber}
      </Text>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onChange(1)}
      >
        <DoubleArrowLeftIcon color="gray" />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => onChange(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => onChange(pageCount)}
      >
        <DoubleArrowRightIcon color="gray" />
      </Button>
    </Flex>
  );
};

export default Pagination;
