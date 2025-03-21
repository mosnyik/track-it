import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60 sec
    retry: 3,
  });

export default useUsers;
